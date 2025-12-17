import React from 'react';
import { supabase } from '../supabaseClient';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Database, FileText, Settings, Menu, 
  ChevronLeft, LogOut, UserCog, DollarSign, Briefcase, 
  ClipboardList, PieChart 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const LOGO_URL = "https://wbvmnybkjtzvtotxqzza.supabase.co/storage/v1/object/public/assets/logos/logo_1765823120776.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { userRole } = useUser();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during sign out:", err);
    } finally {
      window.location.replace('/');
    }
  };

  // UPDATED: menuConfig with the exact choices from your images
  const menuConfig = {
    'admin': [
      { path: '/admin/dashboard', name: 'Home', icon: <Home size={20} /> },
      { path: '/admin/users', name: 'User and Role Management', icon: <Users size={20} /> },
      { path: '/admin/backup', name: 'Database Backup and Restore', icon: <Database size={20} /> },
      { path: '/admin/audit', name: 'Audit Trail', icon: <FileText size={20} /> },
      { path: '/admin/settings', name: 'System Configuration', icon: <Settings size={20} /> },
    ],
    'bishop': [
      { path: '/admin/dashboard', name: 'Home', icon: <Home size={20} /> },
      { path: '/admin/users', name: 'User Management', icon: <Users size={20} /> },
      { path: '/admin/audit', name: 'Audit Trail', icon: <FileText size={20} /> },
    ],
    'finance': [
      { path: '/finance/dashboard', name: 'Home', icon: <Home size={20} /> },
      { path: '/finance/funds', name: 'Church Fund Management', icon: <Database size={20} /> },
      { path: '/finance/stipends', name: 'Church Stipends', icon: <DollarSign size={20} /> },
      { path: '/finance/tasks', name: 'Task & Role Assignment Control', icon: <ClipboardList size={20} /> },
      { path: '/finance/reports', name: 'Reports and Analytics', icon: <PieChart size={20} /> },
    ],
    'staff': [
      { path: '/staff/dashboard', name: 'Home', icon: <Home size={20} /> },
      { path: '/staff/tasks', name: 'My Tasks', icon: <FileText size={20} /> },
    ]
  };

  const menuItems = menuConfig[userRole?.toLowerCase()] || [];

  return (
    <div 
      className={`${isOpen ? 'w-72' : 'w-20'} bg-[#e8f5e9] h-screen duration-300 relative border-r border-green-200 flex flex-col transition-all ease-in-out shadow-xl z-50`}
    >
      <button 
        className="absolute cursor-pointer -right-3 top-10 w-7 h-7 bg-white border border-green-800 rounded-full flex items-center justify-center text-green-800 shadow-sm z-50 hover:bg-green-50"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft size={15}/> : <Menu size={15}/>}
      </button>

      {/* Logo Section */}
      <div className="flex flex-col items-center pt-8 pb-4 transition-all duration-300">
        <div className={`${isOpen ? 'w-24 h-24 mb-3' : 'w-10 h-10 mb-2'} flex items-center justify-center transition-all duration-300 ease-in-out relative`}>
             {LOGO_URL ? (
               <img 
                 src={LOGO_URL} 
                 alt="Church Logo" 
                 className="w-full h-full object-contain transition-all duration-300"
               />
             ) : (
               <div className={`w-full h-full bg-green-800 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${isOpen ? 'text-4xl' : 'text-xl'}`}>+</div>
             )}
        </div>
        
        <div className={`text-center overflow-hidden transition-all duration-300 ${!isOpen ? "h-0 opacity-0" : "h-auto opacity-100"}`}>
            <h1 className="text-green-900 font-bold text-xl px-4 pb-2 border-b-2 border-green-800 inline-block mb-1 whitespace-nowrap">
            {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)}` : 'Loading...'}
            </h1>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) => `flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group
            ${isActive
                ? "bg-[#1b5e20] text-white shadow-md" 
                : "text-green-900 hover:bg-green-200"
            } ${!isOpen ? "justify-center" : "gap-x-4"}`} 
          >
            <div className="min-w-[20px]">{menu.icon}</div>
            <span className={`${!isOpen && "hidden"} origin-left duration-200 font-medium text-sm whitespace-nowrap`}>
              {menu.name}
            </span>
            {!isOpen && (
                <div className="absolute left-16 bg-green-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {menu.name}
                </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-green-200 space-y-2 mb-2">
        <div className={`flex items-center p-3 rounded-lg cursor-pointer text-green-900 hover:bg-green-200 transition-colors ${!isOpen ? "justify-center" : "gap-x-4"}`}>
            <UserCog size={20} />
            <span className={`${!isOpen && "hidden"} font-medium text-sm`}>Account Settings</span>
        </div>
        
        <div 
            onClick={handleLogout}
            className={`flex items-center p-3 rounded-lg cursor-pointer text-red-700 hover:bg-red-50 transition-colors ${!isOpen ? "justify-center" : "gap-x-4"}`}
        >
            <LogOut size={20} />
            <span className={`${!isOpen && "hidden"} font-medium text-sm`}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;