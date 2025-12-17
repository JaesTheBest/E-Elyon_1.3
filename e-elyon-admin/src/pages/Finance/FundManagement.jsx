import React from 'react';

const FundManagement = () => {
  const funds = [
    { id: 1, name: 'Building Fund', balance: '₱200,000.00', status: 'Active' },
    { id: 2, name: 'Missionary Support', balance: '₱50,000.00', status: 'Active' },
    { id: 3, name: 'Emergency Reserve', balance: '₱150,000.00', status: 'Restricted' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-900">Church Fund Management</h1>
        <button className="bg-[#1b5e20] text-white px-4 py-2 rounded-lg">+ New Fund</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-bold">Fund Name</th>
              <th className="px-6 py-4 text-sm font-bold">Current Balance</th>
              <th className="px-6 py-4 text-sm font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {funds.map(f => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{f.name}</td>
                <td className="px-6 py-4 font-mono font-bold">{f.balance}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${f.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundManagement;