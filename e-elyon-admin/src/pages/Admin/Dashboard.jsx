import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { ChevronLeft, ChevronRight, Loader2, Search, Bell } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: 0,
    inactive: 0,
    uptime: '99.9%',
    lastBackup: '2023-11-20',
  });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [activeRes, inactiveRes, logsRes] = await Promise.all([
          supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', false),
          supabase.from('audit_logs').select('*').order('time', { ascending: false }).limit(5)
        ]);

        setStats({ 
            active: activeRes.count || 0, 
            inactive: inactiveRes.count || 0, 
            uptime: '99.9%', 
            lastBackup: '2023-11-20' 
        });
        setLogs(logsRes.data || []);
      } catch (error) {
        console.error('Error loading dashboard:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-green-800 flex items-center justify-center h-full gap-2 bg-[#f1f8f3]">
        <Loader2 className="animate-spin"/> Loading Dashboard...
      </div>
    );
  }

  return (
    /* MAIN WRAPPER: Added 'p-10' and 'ml-4' to create the margin from the sidebar */
    <div className="flex-1 bg-[#f1f8f3] min-h-screen p-10 ml-2 overflow-y-auto">
      
      {/* Top Welcome Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin Adrian!</h1>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg border border-green-200 text-green-700 shadow-sm cursor-pointer">
            <Bell size={20} />
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Middle Column: Stats & Table */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Header Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-400 text-sm mt-1">Overview of system status and recent activities</p>
          </div>

          {/* System Overview Section */}
          <div>
            <h3 className="text-gray-800 font-bold mb-4 text-sm uppercase tracking-wider">System Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Active Accounts", value: stats.active.toLocaleString() },
                { title: "Total Inactive Accounts", value: stats.inactive.toLocaleString() },
                { title: "System Uptime", value: stats.uptime },
                { title: "Last Backup", value: stats.lastBackup },
              ].map((card, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-green-100 flex flex-col justify-between h-36 hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 text-sm font-bold leading-tight pr-4">{card.title}</h3>
                  <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities Table */}
          <div className="flex-1 mt-4">
            <div className="flex flex-col gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
              <div className="bg-[#e2ede5] px-4 py-3 rounded-xl text-gray-400 text-sm flex items-center w-full shadow-inner">
                <Search size={18} className="mr-3 text-green-700 opacity-60" />
                <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none w-full placeholder-gray-400 text-gray-700" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-green-50">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#d2e2d5] text-gray-700 font-bold border-b border-green-100">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Action</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Module</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {logs.length === 0 ? (
                    /* Dynamic Placeholders as seen in screenshot */
                    [1, 2, 3, 4].map((_, i) => (
                      <tr key={i} className="text-gray-300">
                        <td className="p-4 text-lg">---</td>
                        <td className="p-4 text-lg">---</td>
                        <td className="p-4 text-lg">---</td>
                        <td className="p-4 text-lg">---</td>
                      </tr>
                    ))
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-green-50 transition-colors text-gray-700">
                        <td className="p-4 font-medium">{log.user_name || 'Admin'}</td>
                        <td className="p-4">{log.action}</td>
                        <td className="p-4 text-gray-500">{new Date(log.time).toLocaleString()}</td>
                        <td className="p-4 text-gray-400">{log.module || 'System'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Calendar */}
        <div className="w-80 hidden xl:flex flex-col gap-8">
          
          {/* Quick Actions */}
          <div className="bg-[#e4f2e7] p-8 rounded-[2rem] text-center border border-green-50 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-[#1b5e20] text-white py-3.5 rounded-xl font-bold hover:bg-green-900 transition-all shadow-md active:scale-95">
                Manage Accounts
              </button>
              <button className="w-full bg-[#1b5e20] text-white py-3.5 rounded-xl font-bold hover:bg-green-900 transition-all shadow-md active:scale-95">
                View Logs
              </button>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-transparent px-2">
            <div className="flex justify-between items-center mb-6">
              <button className="p-2 bg-[#d2e2d5] rounded-full text-gray-600 hover:bg-green-200 transition-colors"><ChevronLeft size={16}/></button>
              <h3 className="font-bold text-gray-800">June 2021</h3>
              <button className="p-2 bg-[#d2e2d5] rounded-full text-gray-600 hover:bg-green-200 transition-colors"><ChevronRight size={16}/></button>
            </div>
            <div className="grid grid-cols-7 text-center text-[11px] text-gray-400 font-black mb-4 tracking-tighter">
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-3 font-medium">
              {[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => (
                <span key={i} className={`p-1 flex items-center justify-center h-8 w-8 mx-auto
                  ${d === 10 ? 'bg-[#1e88e5] text-white rounded-full font-bold shadow-lg ring-2 ring-white' : 
                    (i < 2 || (i > 30) ? 'text-gray-300' : 
                    (i % 7 === 0 ? 'text-red-500 font-bold' : 'text-gray-700'))}`}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-gray-800">Upcoming Events</h3>
            
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <p className="text-[10px] text-green-700 font-bold">This Sunday at 10 AM</p>
                <h4 className="font-extrabold text-sm text-gray-800">Sunday Service</h4>
                <p className="text-[11px] text-gray-400 mt-1 leading-tight">Join us for our weekly worship service...</p>
                <button className="mt-4 text-xs bg-gray-200 px-6 py-1.5 rounded-lg font-bold text-gray-700 hover:bg-gray-300 transition-colors">View</button>
              </div>
              <div className="w-20 h-28 bg-gray-300 rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full h-full bg-[#e8ede9] flex items-center justify-center text-[10px] text-green-800 font-bold">EVENT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;