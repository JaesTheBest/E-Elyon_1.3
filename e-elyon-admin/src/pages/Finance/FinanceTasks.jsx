import React from 'react';

const FinanceTasks = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Financial Tasks</h1>
      <ul className="space-y-3">
        {['Weekly Audit Check', 'Tithe Collection Sync', 'Tax Preparation'].map((task, i) => (
          <li key={i} className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:border-green-500 transition-colors">
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#1b5e20] focus:ring-[#1b5e20]" />
            <span className="font-medium text-gray-700">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceTasks;