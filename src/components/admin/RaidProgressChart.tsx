import React from 'react';
import { RaidTier } from '../../types';

interface RaidProgressChartProps {
  raidProgress: RaidTier[];
}

const RaidProgressChart = ({ raidProgress }: RaidProgressChartProps) => {
  return (
    <div className="space-y-6">
      {raidProgress.map((tier) => (
        <div key={tier.id} className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-200">{tier.name}</h4>
            <span className="text-sm text-primary">
              {tier.bosses.filter(b => b.killed).length} / {tier.bosses.length} Bosses
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {tier.bosses.map((boss) => (
              <div 
                key={boss.id}
                className={`p-2 rounded border text-center text-sm ${
                  boss.killed 
                    ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                    : 'bg-background border-primary/10 text-gray-400'
                }`}
              >
                {boss.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaidProgressChart;