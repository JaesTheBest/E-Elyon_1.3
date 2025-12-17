import React from 'react';

const BishopAnalytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Church Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-80 bg-gray-50 rounded-2xl border flex items-center justify-center text-gray-400">
          [ Year-over-Year Growth Chart Placeholder ]
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-white border rounded-xl text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">New Converts</p>
            <p className="text-3xl font-bold text-green-800">24</p>
          </div>
          <div className="p-6 bg-white border rounded-xl text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Baptisms Scheduled</p>
            <p className="text-3xl font-bold text-blue-800">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BishopAnalytics;