import React from 'react';
import { Mail, Briefcase, Users } from 'lucide-react';

const StaffDashboard = () => {
    // This component will only render if the user has the 'staff' role
    return (
        <div className="flex gap-8">
            {/* Middle Column: Stats & Table */}
            <div className="flex-1 flex flex-col gap-8">
                
                {/* Section Title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Staff Dashboard</h2>
                    <p className="text-gray-400 text-sm mt-1">Your quick view of assigned tasks and recent interactions</p>
                </div>

                {/* Staff-Specific Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { title: "Pending Tasks", value: 5, icon: <Briefcase size={24} /> },
                        { title: "Unread Messages", value: 12, icon: <Mail size={24} /> },
                        { title: "Clients Managed", value: 75, icon: <Users size={24} /> },
                        { title: "Shift Status", value: "On-Duty", icon: <></> },
                    ].map((card, idx) => (
                        <div key={idx} className="bg-[#e8f5e9] p-5 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center h-32 hover:shadow-md transition-shadow">
                            <h3 className="text-gray-600 text-sm font-semibold flex items-center gap-2">{card.icon} {card.title}</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Staff To-Do List / Schedule */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
                    <div className="bg-[#e8f5e9] rounded-xl p-6 shadow-sm min-h-[200px]">
                        <p className="text-gray-500">Your specific staff content, forms, and tools go here.</p>
                        <ul className="mt-4 space-y-2">
                            <li className="p-3 bg-white rounded-lg shadow-sm">10:00 AM - Client Meeting (Room A)</li>
                            <li className="p-3 bg-white rounded-lg shadow-sm">1:00 PM - Process documents for ID: #4592</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Column: Quick Actions & Calendar */}
             <div className="w-80 hidden xl:block space-y-8">
                {/* ... (Add Staff-specific Quick Actions here) ... */}
                <div className="bg-[#d0e8d4] p-6 rounded-2xl text-center">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">Staff Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full bg-[#1b5e20] text-white py-3 rounded-lg font-semibold hover:bg-green-900 shadow-md transition-colors">
                            Submit Time Off
                        </button>
                        <button className="w-full bg-[#1b5e20] text-white py-3 rounded-lg font-semibold hover:bg-green-900 shadow-md transition-colors">
                            View Handbook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;