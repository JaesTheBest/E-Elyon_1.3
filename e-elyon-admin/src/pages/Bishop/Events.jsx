import React from 'react';

const Events = () => {
  const events = [
    { title: 'Sunday Worship', date: 'Oct 27, 2024', status: 'Scheduled' },
    { title: 'Youth Conference', date: 'Nov 05, 2024', status: 'Planning' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-6">Activity & Events</h1>
      <div className="grid gap-4">
        {events.map((e, i) => (
          <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">{e.title}</p>
              <p className="text-sm text-gray-500">{e.date}</p>
            </div>
            <button className="text-[#1b5e20] font-bold text-sm">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;