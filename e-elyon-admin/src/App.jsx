import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CompleteProfile from './components/CompleteProfile';
import { Loader2 } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      // 1. Get Session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        console.log("🔍 Checking profile for:", session.user.email);

        try {
          let hasBranch = false;

          // STRATEGY A: Standard Lookup (Auth UUID -> Users Table -> User Details)
          const { data: userLink } = await supabase
            .from('users')
            .select('user_id')
            .eq('auth_user_id', session.user.id)
            .maybeSingle();

          if (userLink && userLink.user_id) {
             const { data: details } = await supabase
              .from('user_details')
              .select('branch_id')
              .eq('user_id', userLink.user_id)
              .maybeSingle();
             
             // Check for both lowercase and uppercase to be safe
             if (details && (details.branch_id || details.Branch_ID)) {
               hasBranch = true;
             }
          }

          // STRATEGY B: Fallback Lookup (Check by Email directly)
          // This fixes issues if the 'users' table link is missing for the Admin
          if (!hasBranch) {
             console.log("⚠️ Standard lookup failed. Trying fallback via Email...");
             const { data: detailsByEmail } = await supabase
               .from('user_details')
               .select('branch_id')
               .eq('email', session.user.email)
               .maybeSingle();

             if (detailsByEmail && (detailsByEmail.branch_id || detailsByEmail.Branch_ID)) {
               hasBranch = true;
               console.log("✅ Found user via Email Fallback!");
             }
          }

          // FINAL DECISION
          if (hasBranch) {
            console.log("✅ Access Granted: Dashboard");
            setIsProfileComplete(true);
          } else {
            console.warn("❌ Access Denied: Profile Incomplete (No Branch ID)");
            setIsProfileComplete(false);
          }

        } catch (error) {
          console.error("Critical Check Error:", error);
          setIsProfileComplete(false);
        }
      }
      setLoading(false);
    };

    checkSessionAndProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) setIsProfileComplete(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#e8f5e9] text-green-800"><Loader2 className="animate-spin mr-2"/> Loading E-Elyon...</div>;
  }

  // 1. Not Logged In -> Show Login
  if (!session) {
    return <Login onLoginSuccess={(sess) => {
      setSession(sess);
      window.location.reload(); // Force refresh to ensure checks run clean
    }} />;
  }

  // 2. Logged In (New User) -> Show Profile Form
  if (!isProfileComplete) {
      return <CompleteProfile session={session} />;
  }

  // 3. Logged In (Existing Admin) -> Show Dashboard
  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="px-8 pt-6">
           <Header user={session.user} />
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            {activePage === 'dashboard' && <Dashboard />}
            {activePage === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
}

export default App;