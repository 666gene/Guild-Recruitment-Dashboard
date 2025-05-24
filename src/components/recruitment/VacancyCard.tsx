import React from 'react';
import { Vacancy, CharacterClass } from '../../types';

interface VacancyCardProps {
  vacancy: Vacancy;
}

// Map of class name to tailwind class for its color
const classColorMap: Record<CharacterClass, string> = {
  'Warrior': 'bg-class-warrior text-black',
  'Paladin': 'bg-class-paladin text-black',
  'Hunter': 'bg-class-hunter text-black',
  'Rogue': 'bg-class-rogue text-black',
  'Priest': 'bg-class-priest text-black',
  'Shaman': 'bg-class-shaman text-white',
  'Mage': 'bg-class-mage text-black',
  'Warlock': 'bg-class-warlock text-white',
  'Druid': 'bg-class-druid text-black',
  'Death Knight': 'bg-class-death-knight text-white',
};

// Map of priority to tailwind class
const priorityColorMap = {
  'High': 'bg-red-600',
  'Medium': 'bg-yellow-500',
  'Low': 'bg-green-600',
};

const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  return (
    <div className="card overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-display">{vacancy.role}</h3>
        <span 
          className={`badge ${priorityColorMap[vacancy.priority]} text-white`}
        >
          {vacancy.priority} Priority
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">Seeking:</p>
        <div className="flex flex-wrap gap-2">
          {vacancy.classes.map((charClass, index) => (
            <span 
              key={index}
              className={`badge ${classColorMap[charClass as CharacterClass]}`}
            >
              {charClass}
            </span>
          ))}
        </div>
      </div>
      
      {vacancy.notes && (
        <div className="text-sm text-gray-300 mt-3 border-t border-primary/10 pt-3">
          {vacancy.notes}
        </div>
      )}
    </div>
  );
};

export default VacancyCard;