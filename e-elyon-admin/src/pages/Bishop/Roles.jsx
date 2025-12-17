import React from 'react';

const BishopRoles = () => {
  const staff = [
    { id: 1, name: 'Pastor David', role: 'Staff', status: 'Active' },
    { id: 2, name: 'Sister Sarah', role: 'Finance', status: 'Active' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-900">User and Role Management</h1>
        <button className="bg-[#1b5e20] text-white px-4 py-2 rounded-lg font-bold">Assign New Role</button>
      </div>
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-bold">Personnel</th>
              <th className="px-6 py-4 text-sm font-bold">Current Role</th>
              <th className="px-6 py-4 text-sm font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {staff.map(s => (
              <tr key={s.id} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{s.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{s.role}</td>
                <td className="px-6 py-4"><span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BishopRoles;