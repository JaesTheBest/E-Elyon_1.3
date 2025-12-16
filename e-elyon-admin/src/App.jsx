import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import Login from './components/Login'; // Import Login
import { Loader2 } from 'lucide-react';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');

  // 1. Check for existing session on startup
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Show Loader while checking
  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#e8f5e9] text-green-800"><Loader2 className="animate-spin mr-2"/> Loading E-Elyon...</div>;
  }

  // 3. SHOW LOGIN PAGE if no session
  if (!session) {
    return <Login onLoginSuccess={setSession} />;
  }

  // 4. SHOW ADMIN PANEL if logged in
  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header (Pass the session to show email/logout) */}
        <div className="px-8 pt-6">
           <Header user={session.user} />
        </div>

        {/* Dynamic Pages */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
            
            {activePage === 'dashboard' && <Dashboard />}

            {activePage === 'users' && <UserManagement />}

            {/* Placeholders */}
            {activePage === 'backup' && (
                <div className="flex h-full items-center justify-center text-gray-400 flex-col">
                    <p className="text-xl font-semibold">Database Backup</p>
                    <p>Coming soon...</p>
                </div>
            )}
            
            {activePage === 'audit' && (
                 <div className="flex h-full items-center justify-center text-gray-400 flex-col">
                    <p className="text-xl font-semibold">Audit Trail</p>
                    <p>Coming soon...</p>
                </div>
            )}

             {activePage === 'settings' && (
                 <div className="flex h-full items-center justify-center text-gray-400 flex-col">
                    <p className="text-xl font-semibold">System Configuration</p>
                    <p>Coming soon...</p>
                </div>
            )}
            
        </div>
      </div>
    </div>
  );
}

export default App;