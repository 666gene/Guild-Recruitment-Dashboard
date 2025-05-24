import React from 'react';
import { Equipment } from '../../types';

interface EquipmentListProps {
  equipment: Equipment[];
}

// Map of quality to tailwind classes
const qualityClasses: Record<string, string> = {
  'Poor': 'text-gray-500',
  'Common': 'text-gray-200',
  'Uncommon': 'text-green-500',
  'Rare': 'text-blue-500',
  'Epic': 'text-purple-500',
  'Legendary': 'text-orange-500',
};

const EquipmentList = ({ equipment }: EquipmentListProps) => {
  // Sort equipment by slot
  const sortedEquipment = [...equipment].sort((a, b) => {
    const slotOrder: Record<string, number> = {
      'Head': 1, 'Neck': 2, 'Shoulders': 3, 'Back': 4, 'Chest': 5,
      'Wrist': 6, 'Hands': 7, 'Waist': 8, 'Legs': 9, 'Feet': 10,
      'Ring 1': 11, 'Ring 2': 12, 'Trinket 1': 13, 'Trinket 2': 14,
      'Main Hand': 15, 'Off Hand': 16
    };
    
    return (slotOrder[a.slot] || 99) - (slotOrder[b.slot] || 99);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedEquipment.map((item) => (
        <div 
          key={item.id}
          className="flex items-center p-2 border border-primary/10 rounded bg-background hover:bg-background-light transition-colors"
        >
          <div className="flex-shrink-0 mr-3">
            <img 
              src={item.icon} 
              alt={item.name}
              className="w-10 h-10 border border-primary/30 rounded"
            />
          </div>
          
          <div className="flex-grow">
            <div className={`font-medium ${qualityClasses[item.quality]}`}>
              {item.name}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{item.slot}</span>
              <span className="text-yellow-500">ilvl {item.itemLevel}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentList;