import React from 'react';
import { cn } from '../../utils/cn';
import { ApplicationStatus } from '../../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusClasses: Record<ApplicationStatus, string> = {
  'New': 'bg-status-new text-white',
  'Contacted': 'bg-status-contacted text-black',
  'Trial': 'bg-status-trial text-black',
  'Rejected': 'bg-status-rejected text-white',
  'Accepted': 'bg-status-accepted text-black'
};

const sizesClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-md px-3 py-1',
};

const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  return (
    <span 
      className={cn(
        'badge font-medium', 
        statusClasses[status],
        sizesClasses[size]
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;