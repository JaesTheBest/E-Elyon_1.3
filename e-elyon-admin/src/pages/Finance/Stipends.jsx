import React from 'react';

const Stipends = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Stipend Management</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 mb-4 italic">No pending stipend requests for the current period.</p>
        <div className="flex gap-4">
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm">Release Payments</button>
          <button className="border border-green-800 text-green-800 px-4 py-2 rounded-lg text-sm">View History</button>
        </div>
      </div>
    </div>
  );
};

export default Stipends;