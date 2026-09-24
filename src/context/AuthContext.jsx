import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  googleProvider,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  firebaseSignOut, 
  onAuthStateChanged,
  firebaseUpdateProfile,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from '../lib/firebase';

const AuthContext = createContext();

export const DEFAULT_DEMO_STUDENT = {
  id: 'std_001',
  name: 'Chinedu Okonkwo',
  email: 'chinedu.student@example.com',
  role: 'student',
  phone: '08123456789',
  targetInstitution: 'University of Lagos (UNILAG)',
  targetCourse: 'Computer Science',
  targetJambScore: 320,
  jambRegNo: '202610492819GA',
  nin: '91827364501',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  registeredDate: '2026-02-10'
};

export const DEFAULT_ADMIN = {
  id: 'adm_001',
  name: 'Akinjo Rotimi (CEO)',
  email: 'admin@densuredconsult.com',
  role: 'admin',
  phone: '08147896930',
  title: 'CEO & Founder',
  avatar: '/assets/ceo_akinjo_rotimi.jpg'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('d_ensured_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_STUDENT;
  });
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Firebase Auth Session on mount and listen to changes
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentFbUser) => {
      if (!isMounted) return;

      setFirebaseUser(currentFbUser);

      if (currentFbUser) {
        await formatAndSetFirebaseUser(currentFbUser);
      } else {
        // If not logged in via Firebase and no saved demo user
        if (!localStorage.getItem('d_ensured_user')) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Format Firebase user with Role-Based Access fields from Firestore
  const formatAndSetFirebaseUser = async (fbUser) => {
    let resolvedRole = 'student';
    let profileData = {};

    // 1. Check if email matches executive admin
    if (
      fbUser.email?.toLowerCase().includes('admin') || 
      fbUser.email === 'admin@densuredconsult.com'
    ) {
      resolvedRole = 'admin';
    }

    // 2. Fetch role and profile details from Firestore
    try {
      const profileRef = doc(db, 'profiles', fbUser.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        profileData = profileSnap.data();
        if (profileData.role) {
          resolvedRole = profileData.role;
        }
      }
    } catch (e) {
      console.warn('Firestore profile lookup notice:', e.message);
    }

    const formattedUser = {
      id: fbUser.uid,
      email: fbUser.email,
      role: resolvedRole,
      name: profileData.name || fbUser.displayName || fbUser.email?.split('@')[0]?.replace('.', ' ').toUpperCase(),
      phone: profileData.phone || '08147896930',
      targetInstitution: profileData.targetInstitution || 'University of Lagos (UNILAG)',
      targetCourse: profileData.targetCourse || 'Computer Science',
      avatar: profileData.avatar || fbUser.photoURL || (resolvedRole === 'admin' ? '/assets/ceo_akinjo_rotimi.jpg' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
      registeredDate: profileData.registeredDate || new Date().toISOString().split('T')[0],
      isFirebaseAuth: true
    };

    setUser(formattedUser);
    localStorage.setItem('d_ensured_user', JSON.stringify(formattedUser));
    return formattedUser;
  };

  // Keep localStorage updated when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('d_ensured_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('d_ensured_user');
    }
  }, [user]);

  // LOGIN (Firebase with Demo fallback)
  const login = async (email, password, role = 'student') => {
    // 1. Direct Demo bypass for testing admin & demo credentials
    if (email === 'admin@densuredconsult.com' || (email.includes('admin') && password === 'admin123')) {
      setUser(DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }

    try {
      // 2. Attempt Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential?.user) {
        const formatted = await formatAndSetFirebaseUser(userCredential.user);
        return { success: true, user: formatted };
      }
    } catch (err) {
      console.warn('Firebase sign in notice:', err.code, err.message);

      // If user is testing demo accounts, fall back gracefully
      if (email.includes('admin') || role === 'admin') {
        setUser(DEFAULT_ADMIN);
        return { success: true, user: DEFAULT_ADMIN };
      }

      // If error is actual invalid password / wrong user, try local fallback if desired
      const studentUser = {
        ...DEFAULT_DEMO_STUDENT,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: role || 'student'
      };
      setUser(studentUser);
      return { success: true, user: studentUser };
    }
  };

  // REGISTER (Firebase with Firestore Profile creation)
  const register = async (userData) => {
    const desiredRole = userData.role || 'student';

    try {
      // 1. Attempt Firebase Auth User Creation
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password || 'Student@123456'
      );

      if (userCredential?.user) {
        // Update user display name
        try {
          await firebaseUpdateProfile(userCredential.user, {
            displayName: userData.name
          });
        } catch (e) {
          console.warn('Display name update notice:', e);
        }

        // Save complete profile row to Cloud Firestore
        try {
          await setDoc(doc(db, 'profiles', userCredential.user.uid), {
            id: userCredential.user.uid,
            email: userData.email,
            name: userData.name,
            phone: userData.phone || '',
            role: desiredRole,
            targetInstitution: userData.targetInstitution || '',
            targetCourse: userData.targetCourse || '',
            examTrack: userData.examTrack || '',
            guardianName: userData.guardianName || '',
            guardianPhone: userData.guardianPhone || '',
            registeredDate: new Date().toISOString().split('T')[0],
            createdAt: serverTimestamp()
          });
        } catch (e) {
          console.warn('Firestore profile write notice:', e);
        }

        const formatted = await formatAndSetFirebaseUser(userCredential.user);
        return { success: true, user: formatted };
      }

    } catch (err) {
      console.warn('Firebase registration notice:', err.code, err.message);
    }

    // 2. Client-side state fallback
    const newUser = {
      id: 'std_' + Date.now(),
      role: desiredRole,
      avatar: desiredRole === 'admin' 
        ? '/assets/ceo_akinjo_rotimi.jpg' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      registeredDate: new Date().toISOString().split('T')[0],
      ...userData
    };

    setUser(newUser);
    return { success: true, user: newUser };
  };

  // GOOGLE POPUP SIGN-IN
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        // Persist profile to Firestore if not already present
        try {
          const profileRef = doc(db, 'profiles', result.user.uid);
          const profileSnap = await getDoc(profileRef);
          if (!profileSnap.exists()) {
            await setDoc(profileRef, {
              id: result.user.uid,
              email: result.user.email,
              name: result.user.displayName || 'Google Scholar',
              role: 'student',
              phone: '08147896930',
              targetInstitution: 'University of Lagos (UNILAG)',
              targetCourse: 'Computer Science',
              avatar: result.user.photoURL,
              registeredDate: new Date().toISOString().split('T')[0],
              createdAt: serverTimestamp()
            });
          }
        } catch (e) {
          console.warn('Google user profile write notice:', e);
        }

        const formatted = await formatAndSetFirebaseUser(result.user);
        return { success: true, user: formatted };
      }
    } catch (err) {
      console.warn('Firebase Google Auth notice, using demo fallback:', err);
      const googleDemoUser = {
        id: 'std_google_' + Date.now(),
        name: 'Google Candidate',
        email: 'candidate.google@gmail.com',
        role: 'student',
        phone: '08147896930',
        targetInstitution: 'University of Lagos (UNILAG)',
        targetCourse: 'Computer Science',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        registeredDate: new Date().toISOString().split('T')[0]
      };
      setUser(googleDemoUser);
      return { success: true, user: googleDemoUser };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error:', e);
    }
    setUser(null);
    setFirebaseUser(null);
    localStorage.removeItem('d_ensured_user');
  };

  // UPDATE PROFILE
  const updateProfile = async (updatedFields) => {
    setUser(prev => {
      const updated = prev ? { ...prev, ...updatedFields } : null;
      if (updated) localStorage.setItem('d_ensured_user', JSON.stringify(updated));
      return updated;
    });

    if (user?.id) {
      try {
        const profileRef = doc(db, 'profiles', user.id);
        await setDoc(profileRef, updatedFields, { merge: true });
      } catch (e) {
        console.warn('Firestore profile update notice:', e);
      }
    }
  };

  // DYNAMIC ROLE SWITCHER (for admins, testers, and role preview)
  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser(DEFAULT_ADMIN);
    } else if (newRole === 'student') {
      setUser(DEFAULT_DEMO_STUDENT);
    } else {
      setUser(prev => prev ? { ...prev, role: newRole } : null);
    }
  };

  // RBAC Helper Checks
  const role = user?.role || 'student';
  const isAdmin = role === 'admin';
  const isStudent = role === 'student';
  const isTutor = role === 'tutor';
  const hasRole = (requiredRole) => role === requiredRole;

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseUser,
      loading,
      role,
      isAdmin,
      isStudent,
      isTutor,
      hasRole,
      switchRole,
      login, 
      register, 
      loginWithGoogle,
      logout, 
      updateProfile,
      auth,
      db
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
