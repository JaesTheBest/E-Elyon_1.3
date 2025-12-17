import React from 'react';
import { Bell, Search } from 'lucide-react';

const FinanceDashboard = () => {
    return (
        /* MAIN WRAPPER: Pure white background with padding and margin from sidebar */
        <div className="flex-1 bg-white min-h-screen p-10 overflow-y-auto">
            
            {/* Top Header Bar */}
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Finance Dashboard</h1>
                <div className="flex items-center gap-4">
                    <button className="p-2 bg-[#f1f8f3] rounded-lg text-green-800 hover:bg-green-100 transition-colors">
                        <Bell size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-100 shadow-sm">
                        {/* Placeholder Avatar */}
                        <img src="https://via.placeholder.com/40" alt="profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                {/* Quick Stats Section */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Quick Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Total Tithes & Offerings", value: "₱120,000" },
                            { title: "Pending Proposals/Requests", value: "15" },
                            { title: "Payroll Updates", value: "3" },
                            { title: "Reports Generated", value: "20" },
                        ].map((card, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex flex-col justify-between h-36">
                                <h3 className="text-gray-500 text-xs font-bold leading-tight uppercase pr-4">{card.title}</h3>
                                <p className="text-3xl font-extrabold text-gray-800 mt-2">{card.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Overview Section (Charts Area) */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Financial Overview</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        {/* Bar Chart Placeholder (Tithes & Offerings) */}
                        <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm h-96 flex flex-col">
                            <h4 className="font-bold text-gray-700 mb-1">Tithes & Offerings</h4>
                            <p className="text-2xl font-black text-gray-800 mb-2">₱120,000</p>
                            <p className="text-xs text-green-600 font-bold mb-8">This Year <span className="ml-1">+10%</span></p>
                            
                            {/* Mock Bar Chart Graphics */}
                            <div className="flex-1 flex items-end justify-between gap-2 px-2">
                                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                    <div key={i} className="w-full flex flex-col items-center gap-2">
                                        <div className="w-full bg-[#e8f5e9] rounded-t-md transition-all hover:bg-green-200" style={{ height: `${h}%` }}></div>
                                        <span className="text-[10px] text-gray-400 font-bold">{['Jan','Feb','Mar','Apr','May','Jun','Jul'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Line Chart Placeholder (Available Funds) */}
                        <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm h-96 flex flex-col">
                            <h4 className="font-bold text-gray-700 mb-1">Available Funds</h4>
                            <p className="text-2xl font-black text-gray-800 mb-2">₱50,000</p>
                            <p className="text-xs text-red-500 font-bold mb-8">This Year <span className="ml-1">-5%</span></p>
                            
                            {/* Mock Line Chart Graphic */}
                            <div className="flex-1 relative mt-4">
                                <svg className="w-full h-full" viewBox="0 0 400 150">
                                    <path 
                                        d="M0,100 Q50,20 100,80 T200,50 T300,120 T400,60" 
                                        fill="none" 
                                        stroke="#2e7d32" 
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="flex justify-between mt-4">
                                    {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map(m => (
                                        <span key={m} className="text-[10px] text-gray-400 font-bold">{m}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Quick Actions Footer */}
                <div>
                    <h3 className="text-gray-800 font-bold mb-4 text-sm uppercase tracking-widest opacity-70">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#1b5e20] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-900 transition-all shadow-md active:scale-95">
                            Add Record
                        </button>
                        <button className="bg-[#e8f5e9] text-green-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-200 transition-all">
                            Generate Payroll
                        </button>
                        <button className="bg-[#e8f5e9] text-green-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-200 transition-all">
                            New Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceDashboard;