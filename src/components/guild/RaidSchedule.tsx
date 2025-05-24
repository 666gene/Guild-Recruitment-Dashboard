import React from 'react';

const RaidSchedule = () => {
  const raidDays = [
    { day: 'Wednesday', time: '7:30 PM - 10:30 PM', type: 'Main Raid', note: 'Progression' },
    { day: 'Sunday', time: '7:30 PM - 10:30 PM', type: 'Main Raid', note: 'Progression' },
    { day: 'Sunday', time: '7:30 PM - 10:30 PM', type: 'Alt Raid', note: 'Backup raid if full clear' }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-lg border border-primary/30 shadow-wow">
        <table className="w-full">
          <thead className="bg-primary/10">
            <tr>
              <th className="py-3 px-4 text-left font-display text-primary">Day</th>
              <th className="py-3 px-4 text-left font-display text-primary">Time</th>
              <th className="py-3 px-4 text-left font-display text-primary">Type</th>
              <th className="py-3 px-4 text-left font-display text-primary hidden sm:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10">
            {raidDays.map((raid, index) => (
              <tr 
                key={index} 
                className="bg-background-light hover:bg-primary/5 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{raid.day}</td>
                <td className="py-3 px-4">{raid.time}</td>
                <td className="py-3 px-4">{raid.type}</td>
                <td className="py-3 px-4 hidden sm:table-cell text-gray-400">{raid.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaidSchedule;