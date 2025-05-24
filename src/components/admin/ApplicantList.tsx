import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Applicant, ApplicationStatus, CharacterClass } from '../../types';
import { cn } from '../../utils/cn';
import { ArrowUp, ArrowDown, Search, Filter, Calendar, Eye } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';
import StatusBadge from './StatusBadge';
import ClassIcon from './ClassIcon';

interface ApplicantListProps {
  applicants: Applicant[];
  isLoading: boolean;
  updateStatus: (id: string, status: string, notes?: string) => Promise<boolean>;
}

type SortField = 'charName' | 'ilvl' | 'progressPercent' | 'score' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const ApplicantList = ({ applicants, isLoading, updateStatus }: ApplicantListProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<CharacterClass | 'All'>('All');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
  const [minIlvl, setMinIlvl] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Filter and sort applicants
  const filteredApplicants = useMemo(() => {
    let filtered = [...applicants];
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.charName.toLowerCase().includes(searchLower) ||
        app.battletag.toLowerCase().includes(searchLower) ||
        app.realm.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply class filter
    if (classFilter !== 'All') {
      filtered = filtered.filter(app => app.charClass === classFilter);
    }
    
    // Apply role filter
    if (roleFilter !== 'All') {
      filtered = filtered.filter(app => app.desiredRole === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Apply minimum ilvl filter
    if (minIlvl !== '') {
      filtered = filtered.filter(app => app.ilvl >= minIlvl);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'charName':
          valueA = a.charName.toLowerCase();
          valueB = b.charName.toLowerCase();
          break;
        case 'ilvl':
          valueA = a.ilvl;
          valueB = b.ilvl;
          break;
        case 'progressPercent':
          valueA = a.progressPercent;
          valueB = b.progressPercent;
          break;
        case 'score':
          valueA = a.score;
          valueB = b.score;
          break;
        case 'createdAt':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          valueA = a.createdAt;
          valueB = b.createdAt;
      }
      
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    return filtered;
  }, [applicants, searchTerm, classFilter, roleFilter, statusFilter, minIlvl, sortBy, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  const renderSortIcon = (field: SortField) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const viewApplicantDetails = (id: string) => {
    navigate(`/admin/applicant/${id}`);
  };

  const handleQuickStatusUpdate = async (id: string, status: ApplicationStatus) => {
    const success = await updateStatus(id, status);
    if (success) {
      toast.success(`Application status updated to ${status}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-display text-primary mb-4 md:mb-0">
          Applications {filteredApplicants.length > 0 ? `(${filteredApplicants.length})` : ''}
        </h2>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              className="btn btn-secondary flex items-center gap-2"
              onClick={() => {
                // Reset all filters
                setSearchTerm('');
                setClassFilter('All');
                setRoleFilter('All');
                setStatusFilter('All');
                setMinIlvl('');
              }}
            >
              <Filter size={16} />
              <span className="hidden md:inline">Reset Filters</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="classFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Class
          </label>
          <select
            id="classFilter"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value as CharacterClass | 'All')}
            className="select w-full"
          >
            <option value="All">All Classes</option>
            <option value="Warrior">Warrior</option>
            <option value="Paladin">Paladin</option>
            <option value="Hunter">Hunter</option>
            <option value="Rogue">Rogue</option>
            <option value="Priest">Priest</option>
            <option value="Shaman">Shaman</option>
            <option value="Mage">Mage</option>
            <option value="Warlock">Warlock</option>
            <option value="Druid">Druid</option>
            <option value="Death Knight">Death Knight</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Role
          </label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select w-full"
          >
            <option value="All">All Roles</option>
            <option value="Tank">Tank</option>
            <option value="Healer">Healer</option>
            <option value="Melee DPS">Melee DPS</option>
            <option value="Ranged DPS">Ranged DPS</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'All')}
            className="select w-full"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Trial">Trial</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="minIlvl" className="block text-sm font-medium text-gray-300 mb-1">
            Min Item Level
          </label>
          <input
            id="minIlvl"
            type="number"
            placeholder="e.g. 390"
            value={minIlvl}
            onChange={(e) => setMinIlvl(e.target.value === '' ? '' : Number(e.target.value))}
            className="input w-full"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-full">
          <thead className="bg-background-light border-b border-primary/20">
            <tr>
              <th className="py-3 px-6 text-left">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('charName')}
                >
                  <span className="font-medium">Character</span>
                  {renderSortIcon('charName')}
                </div>
              </th>
              <th className="py-3 px-6 text-left">Class/Spec</th>
              <th className="py-3 px-6 text-left">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('ilvl')}
                >
                  <span className="font-medium">Item Level</span>
                  {renderSortIcon('ilvl')}
                </div>
              </th>
              <th className="py-3 px-6 text-left">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('progressPercent')}
                >
                  <span className="font-medium">Raid Progress</span>
                  {renderSortIcon('progressPercent')}
                </div>
              </th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('score')}
                >
                  <span className="font-medium">Score</span>
                  {renderSortIcon('score')}
                </div>
              </th>
              <th className="py-3 px-6 text-left">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <span className="font-medium">Applied</span>
                  {renderSortIcon('createdAt')}
                </div>
              </th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10">
            {filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-4 px-6 text-center text-gray-400">
                  No applications found matching your filters
                </td>
              </tr>
            ) : (
              filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-background-light/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-medium">{applicant.charName}</div>
                    <div className="text-sm text-gray-400">{applicant.realm}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <ClassIcon className={applicant.charClass} size={20} />
                      <div>
                        <div>{applicant.charClass}</div>
                        <div className="text-sm text-gray-400">{applicant.spec}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{applicant.ilvl}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-32">
                      <div className="flex items-center">
                        <span className="text-sm mr-2">{Math.round(applicant.progressPercent)}%</span>
                        <div className="flex-grow progress-bar">
                          <div 
                            className="progress-bar-fill bg-primary"
                            style={{ width: `${applicant.progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{applicant.desiredRole}</td>
                  <td className="py-4 px-6">
                    <div className="font-medium">{applicant.score.toFixed(1)}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span>
                        {new Date(applicant.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={applicant.status} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => viewApplicantDetails(applicant.id)}
                        className="p-1 text-gray-400 hover:text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicantList;