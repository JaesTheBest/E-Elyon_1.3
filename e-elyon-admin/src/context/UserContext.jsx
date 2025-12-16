import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);     // Overall loading
  const [roleLoading, setRoleLoading] = useState(true); // Role-specific loading

  // Fetch user role from Supabase
  const fetchUserRole = async (authUserId) => {
    setRoleLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('auth_user_id', authUserId)
        .single();

      if (error || !data) {
        console.error('Error fetching role:', error);
        setUserRole(null);
      } else {
        setUserRole(data.role);
      }
    } catch (err) {
      console.error('Unexpected error fetching role:', err);
      setUserRole(null);
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    // Initialize session & role
    const initAuth = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getSession();
      setSession(data.session || null);

      if (data.session) {
        await fetchUserRole(data.session.user.id);
      } else {
        setRoleLoading(false);
      }

      setLoading(false);
    };

    initAuth();

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);

        if (newSession) {
          await fetchUserRole(newSession.user.id);
        } else {
          setUserRole(null);
          setRoleLoading(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        session,
        userRole,
        setUserRole, // Expose setter
        loading,
        roleLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
