import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Applicant, CharacterDetails, ApplicationStatus } from '../../types';
import { ArrowLeft, Save, Mail, User, X } from 'lucide-react';
import { toast } from 'sonner';
import LoadingSpinner from '../ui/LoadingSpinner';
import StatusBadge from './StatusBadge';
import ClassIcon from './ClassIcon';
import RaidProgressChart from './RaidProgressChart';
import EquipmentList from './EquipmentList';

interface ApplicantDetailsProps {
  applicants: Applicant[];
  updateStatus: (id: string, status: string, notes?: string) => Promise<boolean>;
}

const ApplicantDetails = ({ applicants, updateStatus }: ApplicantDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the applicant by ID
  const applicant = applicants.find(app => app.id === id);
  
  // Mock character details - in a real app, this would come from stored API data
  const [characterDetails, setCharacterDetails] = useState<CharacterDetails | null>(null);
  
  // State for form
  const [status, setStatus] = useState<ApplicationStatus>(applicant?.status || 'New');
  const [officerNotes, setOfficerNotes] = useState(applicant?.officerNotes || '');
  
  // If applicant not found, we'd redirect
  if (!applicant) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">Applicant not found</p>
        <button 
          onClick={() => navigate('/admin')}
          className="btn btn-secondary flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }
  
  // Load character details from API on first render
  React.useEffect(() => {
    const fetchCharacterDetails = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in production
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        const mockCharacterDetails: CharacterDetails = {
          name: applicant.charName,
          realm: applicant.realm,
          class: applicant.charClass,
          level: 70,
          ilvl: applicant.ilvl,
          faction: 'Alliance',
          equipment: Array(16).fill(0).map((_, i) => ({
            id: 100 + i,
            name: `Epic Item ${i+1}`,
            quality: ['Rare', 'Epic', 'Epic', 'Epic', 'Legendary'][Math.floor(Math.random() * 4)],
            itemLevel: applicant.ilvl - 5 + Math.floor(Math.random() * 10),
            slot: ['Head', 'Neck', 'Shoulders', 'Back', 'Chest', 'Wrist', 'Hands', 'Waist', 'Legs', 'Feet', 'Ring 1', 'Ring 2', 'Trinket 1', 'Trinket 2', 'Main Hand', 'Off Hand'][i],
            icon: 'https://wow.zamimg.com/images/wow/icons/large/inv_sword_04.jpg'
          })),
          talents: ['Talent 1/3', 'Talent 2/3', 'Talent 3/2'],
          professions: [
            { name: 'Alchemy', level: 375 },
            { name: 'Herbalism', level: 375 }
          ],
          raidProgress: applicant.raidProgress,
          progressPercent: applicant.progressPercent,
          thumbnail: 'https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg'
        };
        
        setCharacterDetails(mockCharacterDetails);
      } catch (error) {
        console.error('Error fetching character details:', error);
        toast.error('Failed to load character details');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!characterDetails) {
      fetchCharacterDetails();
    }
  }, [applicant, characterDetails]);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await updateStatus(applicant.id, status, officerNotes);
      if (success) {
        toast.success('Applicant updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update applicant');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleEmailApplicant = () => {
    // In a real app, this would trigger an email to the applicant
    toast.success(`Email sent to ${applicant.battletag}`);
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => navigate('/admin')}
          className="p-2 rounded-full hover:bg-background-light transition-colors"
        >
          <ArrowLeft size={20} className="text-primary" />
        </button>
        <h2 className="text-xl font-display text-primary">
          Application Details
        </h2>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Applicant info */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-display text-primary">Applicant Info</h3>
                <StatusBadge status={applicant.status} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {characterDetails?.thumbnail && (
                    <img 
                      src={characterDetails.thumbnail} 
                      alt={applicant.charName} 
                      className="w-12 h-12 rounded-md border border-primary/30"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-200">
                      {applicant.charName}
                    </h4>
                    <p className="text-sm text-gray-400">{applicant.realm}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Class/Spec</p>
                    <p className="flex items-center space-x-1">
                      <ClassIcon className={applicant.charClass} size={16} />
                      <span>{applicant.spec} {applicant.charClass}</span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Role</p>
                    <p>{applicant.desiredRole}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Item Level</p>
                    <p className="font-medium">{applicant.ilvl}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Score</p>
                    <p className="font-medium">{applicant.score.toFixed(1)}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-sm text-gray-400 mb-1">Battle-Tag</p>
                  <p className="flex items-center space-x-2">
                    <User size={14} />
                    <span>{applicant.battletag}</span>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-sm text-gray-400 mb-1">Applied</p>
                  <p>{new Date(applicant.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-display text-primary mb-4">Officer Actions</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Update Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                    className="select w-full"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Trial">Trial</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Officer Notes
                  </label>
                  <textarea
                    value={officerNotes || ''}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    rows={5}
                    className="input w-full"
                    placeholder="Private notes about this applicant..."
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn btn-primary w-full sm:w-auto flex justify-center items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleEmailApplicant}
                    className="btn btn-secondary w-full sm:w-auto flex justify-center items-center gap-2"
                  >
                    <Mail size={16} />
                    <span>Email Applicant</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Character details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-lg font-display text-primary mb-4">Raid Progression</h3>
              
              {characterDetails && (
                <RaidProgressChart raidProgress={characterDetails.raidProgress} />
              )}
            </div>
            
            <div className="card">
              <h3 className="text-lg font-display text-primary mb-4">Equipment</h3>
              
              {characterDetails && (
                <EquipmentList equipment={characterDetails.equipment} />
              )}
            </div>
            
            <div className="card">
              <h3 className="text-lg font-display text-primary mb-4">Application Notes</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Why do you want to join Lowcalibre?
                  </h4>
                  <div className="p-3 bg-background rounded border border-primary/20 text-gray-300">
                    {applicant.notes || 'No reason provided.'}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Raiding Experience
                  </h4>
                  <div className="p-3 bg-background rounded border border-primary/20 text-gray-300">
                    I've been raiding since vanilla. Completed all content in Wrath Classic with my previous guild "Epic Gamers" where I maintained 95+ parses. Looking for a more structured environment with good leadership.
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">
                    Availability
                  </h4>
                  <div className="p-3 bg-background rounded border border-primary/20 text-gray-300">
                    Available for all raid times listed on your schedule. No conflicts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;