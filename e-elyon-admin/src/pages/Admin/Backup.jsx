import React from 'react';

const Backup = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Database Maintenance</h1>
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 text-yellow-800">
        <strong>Last Backup:</strong> October 24, 2023 - 04:00 AM
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-bold mb-2">Manual Backup</h2>
          <p className="text-gray-500 mb-4 text-sm">Download a full copy of the current database.</p>
          <button className="bg-[#1b5e20] text-white px-6 py-2 rounded-lg">Start Backup</button>
        </div>
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-bold mb-2 text-red-700">Restore System</h2>
          <p className="text-gray-500 mb-4 text-sm">Upload a .sql file to restore system state.</p>
          <button className="bg-red-700 text-white px-6 py-2 rounded-lg">Restore Data</button>
        </div>
      </div>
    </div>
  );
};

export default Backup;