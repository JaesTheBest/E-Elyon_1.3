import React from 'react';

const Membership = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Attendance & Membership</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Recent Growth</h2>
          <span className="text-green-600 text-sm font-bold">+5% this month</span>
        </div>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed">
          [ Membership Growth Chart Placeholder ]
        </div>
      </div>
    </div>
  );
};

export default Membership;