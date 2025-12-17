import React from 'react';

const FinanceReports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Financial Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
          [ Monthly Income Chart Placeholder ]
        </div>
        <div className="h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
          [ Expense Categories Chart Placeholder ]
        </div>
      </div>
      <div className="mt-8">
         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Generate PDF Summary</button>
      </div>
    </div>
  );
};

export default FinanceReports;