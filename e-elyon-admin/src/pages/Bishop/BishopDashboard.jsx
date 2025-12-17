import React from 'react';
import { Bell, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const BishopDashboard = () => {
  return (
    <div className="flex-1 bg-[#f1f8f3] min-h-screen p-10 overflow-y-auto">
      {/* Top Welcome Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, Bishop Moya</h1>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg border border-green-200 text-green-700 shadow-sm cursor-pointer">
            <Bell size={20} />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Left Column: Stats and Charts */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Search Bar */}
          <div className="bg-[#e2ede5] px-4 py-3 rounded-xl text-gray-400 text-sm flex items-center w-full shadow-inner">
            <Search size={18} className="mr-3 text-green-700 opacity-60" />
            <input type="text" placeholder="Search" className="bg-transparent border-none focus:outline-none w-full placeholder-gray-400 text-gray-700" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Total Members", value: "5,000" },
              { title: "Volunteers", value: "500" },
              { title: "Workers", value: "100" },
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-green-50 flex flex-col justify-center h-32">
                <h3 className="text-gray-500 text-sm font-bold uppercase">{card.title}</h3>
                <p className="text-3xl font-extrabold text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Financial Overview Card */}
          <div className="bg-white p-8 rounded-2xl border border-green-50 shadow-sm">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Financial Overview</h3>
            <p className="text-4xl font-black text-gray-800">1,234,567</p>
            <p className="text-sm text-green-600 font-bold mb-6">This Year <span className="ml-1">+12%</span></p>
            
            <div className="h-48 w-full border-b border-l border-gray-100 relative mt-4">
              <div className="absolute top-0 left-0 text-[10px] text-gray-300 flex flex-col h-full justify-between -ml-8">
                <span>30K</span><span>20K</span><span>10K</span><span>0</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 400 100">
                <path d="M0,80 Q50,20 100,60 T200,40 T300,70 T400,30" fill="none" stroke="#2e7d32" strokeWidth="2" />
                <path d="M0,90 Q50,40 100,80 T200,60 T300,90 T400,50" fill="none" stroke="#2e7d32" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
              </svg>
              <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold px-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
              </div>
            </div>
          </div>

          {/* Satellite Bar Chart */}
          <div className="bg-white p-8 rounded-2xl border border-green-50 shadow-sm">
            <h3 className="text-gray-800 font-bold mb-8 text-sm uppercase">Number of Members per Satellite</h3>
            <div className="flex items-end justify-around h-48 gap-4 px-4">
              {[
                { label: 'Main', val: 60, color: 'bg-green-700' },
                { label: 'Baliuag', val: 90, color: 'bg-green-100' },
                { label: 'Bustos', val: 75, color: 'bg-green-700' },
                { label: 'Talacsan', val: 85, color: 'bg-green-100' },
                { label: 'San Roque', val: 50, color: 'bg-green-700' }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className={`w-10 ${bar.color} rounded-t-lg transition-all`} style={{ height: `${bar.val}%` }}></div>
                  <span className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-tighter">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calendar and Events */}
        <div className="w-80 flex flex-col gap-8">
          
          {/* Calendar Widget */}
          <div className="bg-white p-6 rounded-2xl border border-green-50 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <button className="p-1 bg-gray-100 rounded-full text-gray-400"><ChevronLeft size={16}/></button>
              <h3 className="font-bold text-gray-800">June 2021</h3>
              <button className="p-1 bg-gray-100 rounded-full text-gray-400"><ChevronRight size={16}/></button>
            </div>
            <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 font-bold mb-4">
              {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-y-3">
              {[30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((d, i) => (
                <span key={i} className={`h-8 w-8 flex items-center justify-center mx-auto rounded-full cursor-pointer
                  ${d === 10 ? 'bg-[#1e88e5] text-white font-bold' : 
                    (i < 2 ? 'text-gray-300' : 
                    (i % 7 === 0 ? 'text-red-500 font-bold' : 'text-gray-700'))}`}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-xl text-gray-800">Upcoming Events</h3>
            
            {[
              {
                time: "This Sunday at 10 AM",
                title: "Sunday Service",
                desc: "Join us for our weekly worship service. We'll have inspiring music...",
                img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=200"
              },
              {
                time: "Next Friday at 7 PM",
                title: "Youth Group Meeting",
                desc: "A fun and engaging meeting for youth members. We'll have games...",
                img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=200"
              }
            ].map((event, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="flex-1">
                  <p className="text-[10px] text-green-700 font-bold mb-1 uppercase tracking-wider">{event.time}</p>
                  <h4 className="font-extrabold text-sm text-gray-800 mb-1">{event.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-tight line-clamp-2">{event.desc}</p>
                  <button className="mt-3 text-xs bg-gray-100 px-4 py-1.5 rounded-lg font-bold text-gray-600 hover:bg-gray-200 transition-colors">View</button>
                </div>
                <div className="w-20 h-28 bg-gray-200 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                   <img src={event.img} alt="event" className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BishopDashboard;