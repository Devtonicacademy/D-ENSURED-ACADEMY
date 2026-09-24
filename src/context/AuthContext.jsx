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
  gender: 'Male',
  dob: '2005-04-14',
  stateOfOrigin: 'Lagos',
  examTrack: 'JAMB UTME 2026',
  targetInstitution: 'University of Lagos (UNILAG)',
  targetCourse: 'Computer Science',
  targetJambScore: 320,
  jambRegNo: '202610492819GA',
  nin: '91827364501',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  registeredDate: '2026-02-10',
  profileComplete: true
};

export const DEFAULT_TUTOR = {
  id: 'tut_001',
  name: 'Engr. Daniel Bakare',
  email: 'tutor@densuredconsult.com',
  role: 'tutor',
  phone: '08099887766',
  title: 'Lead Physics & Mathematics Instructor',
  subjects: ['Physics', 'Mathematics', 'CBT Mock Proctoring'],
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  registeredDate: '2026-01-15',
  profileComplete: true
};

export const DEFAULT_ADMIN = {
  id: 'adm_001',
  name: 'Akinjo Rotimi (CEO)',
  email: 'admin@densuredconsult.com',
  role: 'admin',
  phone: '08147896930',
  title: 'CEO & Founder',
  avatar: '/assets/ceo_akinjo_rotimi.jpg',
  profileComplete: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('d_ensured_user');
    return saved ? JSON.parse(saved) : null;
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
        try {
          const profileRef = doc(db, 'profiles', currentFbUser.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists() && profileSnap.data()?.profileComplete === true) {
            await formatAndSetFirebaseUser(currentFbUser, profileSnap.data());
          } else {
            // Profile incomplete or user has not finished multi-step registration!
            // Do NOT automatically log them into app user state.
            const saved = localStorage.getItem('d_ensured_user');
            if (saved) {
              try {
                const parsed = JSON.parse(saved);
                if (parsed.id === currentFbUser.uid && !parsed.profileComplete) {
                  localStorage.removeItem('d_ensured_user');
                  setUser(null);
                }
              } catch (_) {}
            }
          }
        } catch (e) {
          console.warn('Auth state verification error:', e);
        }
      } else {
        // If not logged in via Firebase and no saved demo user in localStorage
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
  const formatAndSetFirebaseUser = async (fbUser, existingProfileData = null) => {
    let resolvedRole = 'student';
    let profileData = existingProfileData || {};

    // 1. Automatic role inference by verified institutional emails
    const lowerEmail = fbUser.email?.toLowerCase() || '';
    if (lowerEmail.includes('admin') || lowerEmail === 'admin@densuredconsult.com') {
      resolvedRole = 'admin';
    } else if (lowerEmail.includes('tutor') || lowerEmail === 'tutor@densuredconsult.com') {
      resolvedRole = 'tutor';
    }

    // 2. Fetch role and profile details from Firestore if not provided
    if (!existingProfileData && fbUser.uid) {
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
    } else if (profileData.role) {
      resolvedRole = profileData.role;
    }

    const formattedUser = {
      id: fbUser.uid,
      email: fbUser.email,
      role: resolvedRole,
      name: profileData.name || fbUser.displayName || fbUser.email?.split('@')[0]?.replace('.', ' ').toUpperCase(),
      phone: profileData.phone || '08147896930',
      gender: profileData.gender || 'Male',
      dob: profileData.dob || '',
      stateOfOrigin: profileData.stateOfOrigin || 'Lagos',
      examTrack: profileData.examTrack || 'JAMB UTME 2026',
      targetInstitution: profileData.targetInstitution || 'University of Lagos (UNILAG)',
      targetCourse: profileData.targetCourse || 'Computer Science',
      selectedSubjects: profileData.selectedSubjects || ['eng', 'math', 'phy', 'chem'],
      guardianName: profileData.guardianName || '',
      guardianPhone: profileData.guardianPhone || '',
      avatar: profileData.avatar || fbUser.photoURL || (
        resolvedRole === 'admin' 
          ? '/assets/ceo_akinjo_rotimi.jpg' 
          : resolvedRole === 'tutor'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      ),
      registeredDate: profileData.registeredDate || new Date().toISOString().split('T')[0],
      isFirebaseAuth: true,
      profileComplete: true
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

  // LOGIN (Firebase with Demo fallback & redirection if not registered)
  const login = async (email, password, role = 'student') => {
    // 1. Direct Demo bypass for testing admin, tutor, and student roles
    if (email === 'admin@densuredconsult.com' || (email.includes('admin') && password === 'admin123')) {
      setUser(DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }

    if (email === 'tutor@densuredconsult.com' || (email.includes('tutor') && password === 'tutor123')) {
      setUser(DEFAULT_TUTOR);
      return { success: true, user: DEFAULT_TUTOR };
    }

    if (email === 'chinedu.student@example.com' || (email.includes('student') && password === 'student123')) {
      setUser(DEFAULT_DEMO_STUDENT);
      return { success: true, user: DEFAULT_DEMO_STUDENT };
    }

    try {
      // 2. Attempt Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential?.user) {
        // Check if user has an existing complete profile stored on Firestore
        const profileRef = doc(db, 'profiles', userCredential.user.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists() || !profileSnap.data()?.profileComplete) {
          // Incomplete profile on Firebase! Redirect to complete multi-step registration
          return {
            success: false,
            notFound: true,
            incompleteProfile: true,
            firebaseUid: userCredential.user.uid,
            email: userCredential.user.email,
            error: 'No complete academy profile found on Firebase. Redirecting to complete registration...'
          };
        }

        const formatted = await formatAndSetFirebaseUser(userCredential.user, profileSnap.data());
        return { success: true, user: formatted };
      }
    } catch (err) {
      console.warn('Firebase sign in notice:', err.code, err.message);

      // Account doesn't exist on Firebase -> redirect to multi-step registration
      if (
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/invalid-credential' || 
        err.code === 'auth/invalid-login-credentials'
      ) {
        return {
          success: false,
          notFound: true,
          email: email,
          error: 'No account found on Firebase for this email. Redirecting you to complete registration...'
        };
      }

      return {
        success: false,
        error: err.message || 'Login failed. Please check your credentials.'
      };
    }
  };

  // REGISTER (Firebase with Firestore Profile creation)
  const register = async (userData) => {
    const desiredRole = userData.role || 'student';

    try {
      let registeredUser = null;
      let targetUid = userData.firebaseUid;

      if (targetUid) {
        // User already authenticated via Google OAuth
        registeredUser = auth.currentUser;
      } else {
        // Create new account with email & password in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          userData.email, 
          userData.password || 'Student@123456'
        );
        registeredUser = userCredential.user;
        targetUid = userCredential.user.uid;
      }

      if (registeredUser || targetUid) {
        // Update user display name
        if (registeredUser) {
          try {
            await firebaseUpdateProfile(registeredUser, {
              displayName: userData.name
            });
          } catch (e) {
            console.warn('Display name update notice:', e);
          }
        }

        // Save complete profile row to Cloud Firestore with profileComplete: true
        const fullProfileData = {
          id: targetUid,
          email: userData.email,
          name: userData.name,
          dob: userData.dob || '',
          gender: userData.gender || 'Male',
          stateOfOrigin: userData.stateOfOrigin || 'Lagos',
          phone: userData.phone || '',
          guardianName: userData.guardianName || '',
          guardianPhone: userData.guardianPhone || '',
          role: desiredRole,
          targetInstitution: userData.targetInstitution || 'University of Lagos (UNILAG)',
          targetCourse: userData.targetCourse || 'Computer Science',
          examTrack: userData.examTrack || 'JAMB UTME 2026',
          selectedSubjects: userData.selectedSubjects || ['eng', 'math', 'phy', 'chem'],
          avatar: userData.avatar || (registeredUser ? registeredUser.photoURL : ''),
          profileComplete: true,
          registeredDate: new Date().toISOString().split('T')[0],
          createdAt: serverTimestamp()
        };

        try {
          await setDoc(doc(db, 'profiles', targetUid), fullProfileData, { merge: true });
        } catch (e) {
          console.warn('Firestore profile write notice:', e);
        }

        const formatted = await formatAndSetFirebaseUser(
          registeredUser || { uid: targetUid, email: userData.email, photoURL: userData.avatar },
          fullProfileData
        );
        return { success: true, user: formatted };
      }

    } catch (err) {
      console.warn('Firebase registration notice:', err.code, err.message);
      let friendlyError = err.message;
      if (err.code === 'auth/email-already-in-use') {
        friendlyError = 'This email is already registered. Please sign in or use another email.';
      }
      return { success: false, error: friendlyError, code: err.code };
    }

    // Client-side fallback if offline
    const newUser = {
      id: (desiredRole === 'admin' ? 'adm_' : desiredRole === 'tutor' ? 'tut_' : 'std_') + Date.now(),
      role: desiredRole,
      avatar: desiredRole === 'admin' 
        ? '/assets/ceo_akinjo_rotimi.jpg' 
        : desiredRole === 'tutor'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      registeredDate: new Date().toISOString().split('T')[0],
      profileComplete: true,
      ...userData
    };

    setUser(newUser);
    localStorage.setItem('d_ensured_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  // GOOGLE POPUP SIGN-IN
  // Enforces that new users or incomplete accounts MUST complete the multi-step registration flow
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        const profileRef = doc(db, 'profiles', result.user.uid);
        const profileSnap = await getDoc(profileRef);

        // Check if candidate has an existing complete document in Firestore
        if (profileSnap.exists() && profileSnap.data()?.profileComplete === true) {
          // Existing registered user with complete academic profile!
          const formatted = await formatAndSetFirebaseUser(result.user, profileSnap.data());
          return { success: true, isNewUser: false, user: formatted };
        } else {
          // NEW USER OR INCOMPLETE PROFILE:
          // Do NOT treat like an already existing user!
          // Return isNewUser: true with Google details for multi-step onboarding
          return {
            success: true,
            isNewUser: true,
            googleData: {
              firebaseUid: result.user.uid,
              name: result.user.displayName || '',
              email: result.user.email || '',
              avatar: result.user.photoURL || '',
              phone: result.user.phoneNumber || ''
            }
          };
        }
      }
    } catch (err) {
      console.warn('Firebase Google Auth error:', err);
      return { success: false, error: err.message || 'Google authentication was cancelled or failed.' };
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

  // DYNAMIC ROLE SWITCHER (for live testing, admin previews, and role switching)
  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setUser(DEFAULT_ADMIN);
    } else if (newRole === 'tutor') {
      setUser(DEFAULT_TUTOR);
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
  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

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
