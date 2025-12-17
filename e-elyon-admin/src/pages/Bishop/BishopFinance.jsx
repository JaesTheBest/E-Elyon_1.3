import React from 'react';

const BishopFinance = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Finance Oversight</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#1b5e20] text-white rounded-2xl shadow-lg">
          <h3 className="opacity-80 text-sm">Total Church Treasury</h3>
          <p className="text-4xl font-bold mt-2">₱1,250,000.00</p>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-sm">
            <span>Monthly Growth</span>
            <span className="font-bold">+8.2%</span>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <h3 className="text-gray-500 text-sm font-bold mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span>Outreach</span><span className="font-bold text-green-800">₱45,000</span></div>
            <div className="flex justify-between text-sm"><span>Maintenance</span><span className="font-bold text-green-800">₱12,000</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BishopFinance;