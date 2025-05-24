import React from 'react';
import { cn } from '../../utils/cn';

interface ClassIconProps {
  className: string; // This is the WoW class name
  size?: number;
}

const ClassIcon = ({ className, size = 24 }: ClassIconProps) => {
  // Map class name to its color
  const getClassColor = (wowClass: string) => {
    const classColors: Record<string, string> = {
      'Warrior': 'text-class-warrior',
      'Paladin': 'text-class-paladin',
      'Hunter': 'text-class-hunter',
      'Rogue': 'text-class-rogue',
      'Priest': 'text-class-priest',
      'Shaman': 'text-class-shaman',
      'Mage': 'text-class-mage',
      'Warlock': 'text-class-warlock',
      'Druid': 'text-class-druid',
      'Death Knight': 'text-class-death-knight',
    };
    
    return classColors[wowClass] || 'text-gray-400';
  };
  
  // Use a simple circle with the class color as a placeholder
  // In a production app, you'd use actual WoW class icons
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full',
        getClassColor(className)
      )}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full rounded-full border-2 current-color"></div>
    </div>
  );
};

export default ClassIcon;