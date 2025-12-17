import React from 'react';

const AuditTrail = () => {
  const logs = [
    { id: 101, user: 'Admin', action: 'Login', time: '2 mins ago', ip: '192.168.1.1' },
    { id: 102, user: 'Admin', action: 'Modified User Role: Jane Smith', time: '1 hour ago', ip: '192.168.1.1' },
    { id: 103, user: 'Staff_A', action: 'Failed Login Attempt', time: '3 hours ago', ip: '202.14.5.1' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Security & Audit Logs</h1>
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="p-4 bg-white border border-gray-100 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <p className="text-sm font-bold text-gray-800">{log.action}</p>
              <p className="text-xs text-gray-500">{log.user} • {log.ip}</p>
            </div>
            <span className="text-xs text-gray-400 font-mono">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTrail;