import React, { useMemo } from 'react';
import { Applicant, ApplicationStatus } from '../../types';
import { Users, UserCheck, Clock, UserX } from 'lucide-react';

interface DashboardStatsProps {
  applicants: Applicant[];
}

const DashboardStats = ({ applicants }: DashboardStatsProps) => {
  const stats = useMemo(() => {
    const total = applicants.length;
    const newApps = applicants.filter(a => a.status === 'New').length;
    const inProgress = applicants.filter(a => a.status === 'Contacted' || a.status === 'Trial').length;
    const accepted = applicants.filter(a => a.status === 'Accepted').length;
    const rejected = applicants.filter(a => a.status === 'Rejected').length;
    
    const averageIlvl = applicants.length > 0
      ? applicants.reduce((sum, app) => sum + app.ilvl, 0) / applicants.length
      : 0;
    
    const averageScore = applicants.length > 0
      ? applicants.reduce((sum, app) => sum + app.score, 0) / applicants.length
      : 0;
    
    // Get top 3 classes applied
    const classCounts: Record<string, number> = {};
    applicants.forEach(app => {
      classCounts[app.charClass] = (classCounts[app.charClass] || 0) + 1;
    });
    
    const topClasses = Object.entries(classCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([className, count]) => ({ className, count }));
    
    return {
      total,
      newApps,
      inProgress,
      accepted,
      rejected,
      averageIlvl,
      averageScore,
      topClasses
    };
  }, [applicants]);

  return (
    <div>
      <h2 className="text-xl font-display text-primary mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card flex items-center">
          <div className="rounded-full bg-primary/10 p-4 mr-4">
            <Users size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Applications</p>
            <p className="text-2xl font-display text-primary">{stats.total}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-status-new/10 p-4 mr-4">
            <Clock size={24} className="text-status-new" />
          </div>
          <div>
            <p className="text-sm text-gray-400">New / Pending</p>
            <p className="text-2xl font-display text-status-new">{stats.newApps}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-status-trial/10 p-4 mr-4">
            <UserCheck size={24} className="text-status-trial" />
          </div>
          <div>
            <p className="text-sm text-gray-400">In Progress</p>
            <p className="text-2xl font-display text-status-trial">{stats.inProgress}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-status-accepted/10 p-4 mr-4">
            <UserCheck size={24} className="text-status-accepted" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Accepted</p>
            <p className="text-2xl font-display text-status-accepted">{stats.accepted}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="text-lg font-display text-primary mb-4">Application Stats</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Average Item Level</p>
              <p className="text-2xl font-medium">{stats.averageIlvl.toFixed(1)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-1">Average Score</p>
              <p className="text-2xl font-medium">{stats.averageScore.toFixed(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-display text-primary mb-4">Most Applied Classes</h3>
          
          {stats.topClasses.length > 0 ? (
            <div className="space-y-3">
              {stats.topClasses.map(({ className, count }, index) => (
                <div key={className} className="flex items-center">
                  <span className="w-8">{index + 1}.</span>
                  <span className={`text-class-${className.toLowerCase().replace(' ', '-')} flex-grow`}>
                    {className}
                  </span>
                  <span className="bg-primary/10 px-2 py-0.5 rounded text-sm">
                    {count} {count === 1 ? 'application' : 'applications'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;