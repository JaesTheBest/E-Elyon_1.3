import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-sm rounded-xl mb-6 mx-4 mt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin Adrian!</h1>
        <p className="text-gray-500 text-sm">Overview of system status and recent activities</p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-green-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 border border-transparent focus:border-green-600 transition-all"
          />
        </div>

        {/* Icons */}
        <button className="p-2 relative hover:bg-green-50 rounded-full transition-colors">
            <Bell size={24} className="text-green-800" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-colors">
            <UserCircle size={32} className="text-green-800" />
            <div className="text-sm text-right hidden md:block">
                <p className="font-semibold text-gray-800">Admin Account</p>
                <p className="text-xs text-gray-500">Administrator</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;