import React from 'react';

const Counseling = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Counseling & Prayer Requests</h1>
      <div className="space-y-4">
        <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-blue-800 font-bold mb-1 text-sm italic">"Request for family blessing and guidance."</p>
          <p className="text-xs text-blue-600">- Submitted 2 hours ago by Member #402</p>
        </div>
        <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm">
          <p className="text-gray-700 font-medium mb-1 text-sm italic">"Request for prayer regarding health recovery."</p>
          <p className="text-xs text-gray-400">- Submitted Yesterday</p>
        </div>
      </div>
    </div>
  );
};

export default Counseling;