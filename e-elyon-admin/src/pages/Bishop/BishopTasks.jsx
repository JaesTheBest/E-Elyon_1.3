import React from 'react';

const BishopTasks = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Task & Role Control</h1>
      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-green-200 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
           <span className="text-2xl">📋</span>
        </div>
        <h2 className="text-xl font-bold text-green-900 mb-2">No Active Assignments</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create and assign specific spiritual or operational tasks to your staff members.</p>
        <button className="bg-[#1b5e20] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-900/20">Create Task</button>
      </div>
    </div>
  );
};

export default BishopTasks;