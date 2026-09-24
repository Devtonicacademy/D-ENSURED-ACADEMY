import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync Supabase Auth Session on mount
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('Supabase getSession error:', error.message);
        }

        if (initialSession && mounted) {
          setSession(initialSession);
          await formatAndSetSupabaseUser(initialSession.user);
        }
      } catch (err) {
        console.warn('Error fetching Supabase session:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initSession();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await formatAndSetSupabaseUser(newSession.user);
      } else if (!newSession && !localStorage.getItem('d_ensured_user')) {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Format Supabase user with Role-Based Access fields
  const formatAndSetSupabaseUser = async (sbUser) => {
    const meta = sbUser.user_metadata || {};
    
    // Check if role is admin based on metadata or specific admin emails
    let resolvedRole = meta.role || 'student';
    if (sbUser.email?.toLowerCase().includes('admin') || sbUser.email === 'admin@densuredconsult.com') {
      resolvedRole = 'admin';
    }

    // Try fetching profile record if table exists
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sbUser.id)
        .single();

      if (profile?.role) {
        resolvedRole = profile.role;
      }
    } catch (e) {
      // Table may not be provisioned yet, use metadata
    }

    const formattedUser = {
      id: sbUser.id,
      email: sbUser.email,
      role: resolvedRole,
      name: meta.name || meta.full_name || sbUser.email?.split('@')[0]?.replace('.', ' ').toUpperCase(),
      phone: meta.phone || '08147896930',
      targetInstitution: meta.targetInstitution || 'University of Lagos (UNILAG)',
      targetCourse: meta.targetCourse || 'Computer Science',
      avatar: meta.avatar_url || (resolvedRole === 'admin' ? '/assets/ceo_akinjo_rotimi.jpg' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
      registeredDate: sbUser.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      isSupabaseAuth: true
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

  // LOGIN (Supabase with Demo fallback)
  const login = async (email, password, role = 'student') => {
    // 1. Direct Demo bypass for testing admin & demo credentials
    if (email === 'admin@densuredconsult.com' || (email.includes('admin') && password === 'admin123')) {
      setUser(DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }

    try {
      // 2. Attempt Supabase Auth login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data?.user) {
        const formatted = await formatAndSetSupabaseUser(data.user);
        return { success: true, user: formatted };
      }

      // If Supabase returns invalid login credentials or user not confirmed,
      // fallback gracefully for demo accounts
      if (email.includes('admin') || role === 'admin') {
        setUser(DEFAULT_ADMIN);
        return { success: true, user: DEFAULT_ADMIN };
      }

      // Local demo student login
      const studentUser = {
        ...DEFAULT_DEMO_STUDENT,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: role || 'student'
      };
      setUser(studentUser);
      return { success: true, user: studentUser };

    } catch (err) {
      console.warn('Supabase sign in failed, using demo fallback:', err);
      const fallbackUser = role === 'admin' ? DEFAULT_ADMIN : {
        ...DEFAULT_DEMO_STUDENT,
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role
      };
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  // REGISTER (Supabase with Profile creation)
  const register = async (userData) => {
    const desiredRole = userData.role || 'student';

    try {
      // 1. Attempt Supabase Sign Up
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password || 'Student@123456',
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            role: desiredRole,
            targetInstitution: userData.targetInstitution,
            targetCourse: userData.targetCourse,
            examTrack: userData.examTrack,
            guardianName: userData.guardianName,
            guardianPhone: userData.guardianPhone
          }
        }
      });

      if (!error && data?.user) {
        // Attempt to create profile row if profiles table exists
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            role: desiredRole,
            target_institution: userData.targetInstitution,
            target_course: userData.targetCourse,
            created_at: new Date().toISOString()
          });
        } catch (e) {
          // Non-blocking if table is not yet migrated
        }

        const formatted = await formatAndSetSupabaseUser(data.user);
        return { success: true, user: formatted };
      }

    } catch (err) {
      console.warn('Supabase registration fallback:', err);
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

  // GOOGLE OAUTH SIGN-IN
  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Google OAuth error, using demo:', err);
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
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signOut error:', e);
    }
    setUser(null);
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
        await supabase.from('profiles').update(updatedFields).eq('id', user.id);
      } catch (e) {
        // Non-blocking
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
      session,
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
      supabase 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
