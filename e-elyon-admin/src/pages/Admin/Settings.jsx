import React from 'react';

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">System Configuration</h1>
      <div className="max-w-2xl bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Maintenance Mode</h3>
            <p className="text-xs text-gray-500">Disable login for all users except admins.</p>
          </div>
          <div className="w-12 h-6 bg-gray-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div></div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Church Name</label>
          <input type="text" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" defaultValue="E-Elyon Main" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Notification Email</label>
          <input type="email" className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg" defaultValue="admin@elyon.com" />
        </div>
        <button className="w-full bg-[#1b5e20] text-white py-3 rounded-xl font-bold">Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;