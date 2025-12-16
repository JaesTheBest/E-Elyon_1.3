import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Connection to DB
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    active: 0,
    inactive: 0,
    uptime: '99.9%', // Placeholder for now
    lastBackup: '2025-10-26', // Placeholder for now
  });
  const [logs, setLogs] = useState([]);

  // Fetch Real Data on Load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 1. Get Active Users Count
        const { count: activeCount, error: activeError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true }) // 'head: true' means don't download data, just count
          .eq('is_active', true);
        
        if (activeError) throw activeError;

        // 2. Get Inactive Users Count
        const { count: inactiveCount, error: inactiveError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', false);

        if (inactiveError) throw inactiveError;

        // 3. Get Recent Audit Logs (Limit 5)
        const { data: recentLogs, error: logsError } = await supabase
          .from('audit_logs')
          .select('*')
          .order('time', { ascending: false })
          .limit(5);

        if (logsError) throw logsError; // It's okay if this is empty for now

        setStats({ 
            active: activeCount || 0, 
            inactive: inactiveCount || 0, 
            uptime: '99.9%', 
            lastBackup: '2025-10-26' 
        });
        setLogs(recentLogs || []);

      } catch (error) {
        console.error('Error loading dashboard:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
      return <div className="p-10 text-green-800 flex items-center gap-2"><Loader2 className="animate-spin"/> Loading Dashboard...</div>
  }

  return (
    <div className="flex gap-8">
        {/* Middle Column: Stats & Table */}
        <div className="flex-1 flex flex-col gap-8">
            
            {/* Section Title */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-gray-400 text-sm mt-1">Overview of system status and recent activities</p>
            </div>

            {/* Stats Cards (Dynamic Data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { title: "Total Active Accounts", value: stats.active },
                    { title: "Total Inactive Accounts", value: stats.inactive },
                    { title: "System Uptime", value: stats.uptime },
                    { title: "Last Backup", value: stats.lastBackup },
                ].map((card, idx) => (
                    <div key={idx} className="bg-[#e8f5e9] p-5 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center h-32 hover:shadow-md transition-shadow">
                        <h3 className="text-gray-600 text-sm font-semibold">{card.title}</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activities Table */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
                    <div className="bg-[#e8f5e9] px-4 py-2 rounded-lg text-gray-500 text-sm flex items-center w-64">
                        <span>🔍 Search logs...</span>
                    </div>
                </div>
                
                <div className="bg-[#e8f5e9] rounded-xl overflow-hidden shadow-sm min-h-[200px]">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#d0e8d4] text-gray-700 font-bold border-b border-green-200">
                            <tr>
                                <th className="p-4">Action</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Date & Time</th>
                                <th className="p-4">User</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-green-100">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">
                                        No recent activities found in Audit Log.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.Log_ID} className="hover:bg-green-100 transition-colors text-gray-700">
                                        <td className="p-4 font-medium text-green-800">{log.action}</td>
                                        <td className="p-4">{log.description}</td>
                                        <td className="p-4 text-gray-500">{new Date(log.time).toLocaleString()}</td>
                                        <td className="p-4 text-gray-500">{log.user_email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Right Column: Quick Actions & Calendar */}
        <div className="w-80 hidden xl:block space-y-8">
            <div className="bg-[#d0e8d4] p-6 rounded-2xl text-center">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Quick Actions</h3>
                <div className="space-y-3">
                    <button className="w-full bg-[#1b5e20] text-white py-3 rounded-lg font-semibold hover:bg-green-900 shadow-md transition-colors">
                        Manage Accounts
                    </button>
                    <button className="w-full bg-[#1b5e20] text-white py-3 rounded-lg font-semibold hover:bg-green-900 shadow-md transition-colors">
                        View Logs
                    </button>
                </div>
            </div>

            {/* Calendar Mockup */}
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <button className="p-1 bg-gray-100 rounded-full"><ChevronLeft size={16}/></button>
                    <h3 className="font-bold text-gray-800">June 2021</h3>
                    <button className="p-1 bg-gray-100 rounded-full"><ChevronRight size={16}/></button>
                 </div>
                 <div className="grid grid-cols-7 text-center text-xs text-gray-400 gap-y-4">
                    {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <span key={d}>{d}</span>)}
                    {[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => (
                         <span key={i} className={`p-1 ${d===10 ? 'bg-blue-500 text-white rounded-full' : (d===20||d===21||d===22 ? 'text-red-500 font-bold' : 'text-gray-700')}`}>
                             {d}
                         </span>
                    ))}
                 </div>
            </div>

            {/* Upcoming Events */}
            <div>
                <h3 className="font-bold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="flex gap-4 items-start mb-4">
                    <div className="flex-1">
                        <p className="text-xs text-green-600 font-bold">This Sunday at 10 AM</p>
                        <h4 className="font-bold text-sm text-gray-800">Sunday Service</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">Join us for our weekly worship service...</p>
                        <button className="mt-2 text-xs bg-gray-100 px-3 py-1 rounded font-bold">View</button>
                    </div>
                    <div className="w-16 h-24 bg-orange-100 rounded-lg overflow-hidden">
                         <div className="w-full h-full bg-gray-300"></div> {/* Placeholder Image */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;