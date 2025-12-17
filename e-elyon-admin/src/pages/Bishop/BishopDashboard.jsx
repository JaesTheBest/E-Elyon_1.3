import React from 'react';
import { Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const BishopDashboard = () => {
  return (
    <div className="flex gap-8 p-10 bg-white min-h-screen overflow-y-auto">
      {/* Left Column: Main Dashboard Content */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Bishop Moya</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-[#f1f8f3] rounded-lg text-green-800"><Bell size={20} /></button>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm">
              <img src="https://via.placeholder.com/40" alt="profile" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#e2ede5] px-4 py-3 rounded-xl text-gray-400 text-sm flex items-center w-full shadow-inner">
          <Search size={18} className="mr-3 text-green-700 opacity-60" />
          <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none w-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Members", value: "5,000" },
            { title: "Volunteers", value: "500" },
            { title: "Workers", value: "100" },
          ].map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 h-32 flex flex-col justify-center">
              <h3 className="text-gray-500 text-xs font-bold uppercase">{card.title}</h3>
              <p className="text-3xl font-extrabold text-gray-800 mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Financial Overview Card */}
        <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm">
          <h3 className="text-gray-500 text-xs font-bold uppercase mb-2">Financial Overview</h3>
          <p className="text-4xl font-black text-gray-800">1,234,567</p>
          <p className="text-sm text-green-600 font-bold mb-6">This Year <span className="ml-1">+12%</span></p>
          
          {/* Mock Line Chart Placeholder */}
          <div className="h-48 w-full border-b border-l border-gray-100 relative mt-4">
            <svg className="w-full h-full" viewBox="0 0 400 100">
              <path d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,30" fill="none" stroke="#2e7d32" strokeWidth="3" />
              <path d="M0,90 Q50,40 100,80 T200,60 T300,90 T400,50" fill="none" stroke="#2e7d32" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Satellite Bar Chart */}
        <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm">
          <h3 className="text-gray-500 text-xs font-bold uppercase mb-6">Number of Members per Satellite</h3>
          <div className="flex items-end justify-around h-48 gap-4 px-4">
            {[
              { label: 'Main', val: 60, color: 'bg-green-700' },
              { label: 'Baliuag', val: 90, color: 'bg-green-100' },
              { label: 'Bustos', val: 75, color: 'bg-green-700' },
              { label: 'Talacsan', val: 85, color: 'bg-green-100' },
              { label: 'San Roque', val: 50, color: 'bg-green-700' }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className={`w-8 ${bar.color} rounded-t-md transition-all`} style={{ height: `${bar.val}%` }}></div>
                <span className="text-[10px] text-gray-400 font-bold mt-2 uppercase">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Calendar & Events */}
      <div className="w-80 space-y-8">
        {/* Calendar widget logic same as Admin Home */}
        <div className="bg-white p-4 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <button className="p-1 bg-gray-100 rounded-full"><ChevronLeft size={16}/></button>
            <h3 className="font-bold text-gray-800 text-sm">June 2021</h3>
            <button className="p-1 bg-gray-100 rounded-full"><ChevronRight size={16}/></button>
          </div>
          {/* ... Calendar grid ... */}
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-xl text-gray-800">Upcoming Events</h3>
          {/* Use the event mapping logic you already have in Dashboard.jsx */}
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-green-700 font-bold">This Sunday at 10 AM</p>
              <h4 className="font-extrabold text-sm text-gray-800">Sunday Service</h4>
              <button className="mt-3 text-xs bg-gray-100 px-4 py-1 rounded-lg font-bold">View</button>
            </div>
            <div className="w-20 h-28 bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
               <img src="https://via.placeholder.com/80x110" alt="event" className="object-cover h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BishopDashboard;