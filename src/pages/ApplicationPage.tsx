import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CharacterClass, CharacterRole } from '../types';
import { Search } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

// Form validation schema
const applicationSchema = z.object({
  battletag: z.string().min(3, { message: "Battle-Tag is required" }).includes('#', { message: "Battle-Tag must include '#'" }),
  charName: z.string().min(2, { message: "Character name is required" }),
  realm: z.string().min(1, { message: "Realm is required" }),
  charClass: z.string().min(1, { message: "Class is required" }),
  spec: z.string().min(1, { message: "Specialization is required" }),
  desiredRole: z.string().min(1, { message: "Desired role is required" }),
  experience: z.string().optional(),
  ui: z.string().optional(),
  addons: z.string().optional(),
  availability: z.string().min(1, { message: "Availability is required" }),
  reason: z.string().min(10, { message: "Please tell us why you want to join" }),
  referral: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplicationPage = () => {
  const [isSearchingCharacter, setIsSearchingCharacter] = useState(false);
  const [characterFound, setCharacterFound] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setValue, 
    watch 
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      charClass: '',
      spec: '',
      desiredRole: '',
    }
  });

  const selectedClass = watch('charClass');
  
  // Class options
  const classOptions: CharacterClass[] = [
    'Warrior', 'Paladin', 'Hunter', 'Rogue', 
    'Priest', 'Shaman', 'Mage', 'Warlock', 
    'Druid', 'Death Knight'
  ];
  
  // Role options
  const roleOptions: CharacterRole[] = [
    'Tank', 'Healer', 'Melee DPS', 'Ranged DPS'
  ];
  
  // Spec options based on selected class
  const getSpecOptions = (selectedClass: string) => {
    switch (selectedClass) {
      case 'Warrior':
        return ['Arms', 'Fury', 'Protection'];
      case 'Paladin':
        return ['Holy', 'Protection', 'Retribution'];
      case 'Hunter':
        return ['Beast Mastery', 'Marksmanship', 'Survival'];
      case 'Rogue':
        return ['Assassination', 'Combat', 'Subtlety'];
      case 'Priest':
        return ['Discipline', 'Holy', 'Shadow'];
      case 'Shaman':
        return ['Elemental', 'Enhancement', 'Restoration'];
      case 'Mage':
        return ['Arcane', 'Fire', 'Frost'];
      case 'Warlock':
        return ['Affliction', 'Demonology', 'Destruction'];
      case 'Druid':
        return ['Balance', 'Feral', 'Guardian', 'Restoration'];
      case 'Death Knight':
        return ['Blood', 'Frost', 'Unholy'];
      default:
        return [];
    }
  };
  
  // Handle character search (would connect to WoW API in production)
  const handleCharacterSearch = async () => {
    const charName = watch('charName');
    const realm = watch('realm');
    
    if (!charName || !realm) {
      toast.error('Please enter both character name and realm');
      return;
    }
    
    setIsSearchingCharacter(true);
    
    try {
      // Simulate API call to Blizzard
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      setCharacterFound(true);
      toast.success(`Character ${charName} found on ${realm}!`);
      
      // Mock setting class data that would come from API
      setValue('charClass', 'Warlock');
      
    } catch (error) {
      toast.error('Character not found. Please check the name and realm.');
      setCharacterFound(false);
    } finally {
      setIsSearchingCharacter(false);
    }
  };
  
  // Form submission handler
  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      await axios.post('/api/applications', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Application submitted successfully!');
      navigate('/success');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display text-primary mb-4 text-center">
            Guild Application
          </h1>
          <p className="text-gray-300 text-center mb-12">
            Fill out the form below to apply to Lowcalibre. We'll review your application and get back to you soon.
          </p>
          
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="border-b border-primary/20 pb-6">
                  <h2 className="text-xl font-display text-primary mb-4">Account & Character Information</h2>
                  
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="battletag" className="block text-sm font-medium text-gray-300 mb-1">
                        Battle-Tag
                      </label>
                      <input
                        id="battletag"
                        type="text"
                        placeholder="YourTag#1234"
                        className={`input w-full ${errors.battletag ? 'border-red-500' : ''}`}
                        {...register('battletag')}
                      />
                      {errors.battletag && (
                        <p className="mt-1 text-sm text-red-500">{errors.battletag.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-200 mb-3">Character Details</h3>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <label htmlFor="charName" className="block text-sm font-medium text-gray-300 mb-1">
                          Character Name
                        </label>
                        <input
                          id="charName"
                          type="text"
                          className={`input w-full ${errors.charName ? 'border-red-500' : ''}`}
                          {...register('charName')}
                        />
                        {errors.charName && (
                          <p className="mt-1 text-sm text-red-500">{errors.charName.message}</p>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <label htmlFor="realm" className="block text-sm font-medium text-gray-300 mb-1">
                          Realm
                        </label>
                        <input
                          id="realm"
                          type="text"
                          className={`input w-full ${errors.realm ? 'border-red-500' : ''}`}
                          {...register('realm')}
                        />
                        {errors.realm && (
                          <p className="mt-1 text-sm text-red-500">{errors.realm.message}</p>
                        )}
                      </div>
                      
                      <div className="md:self-end mb-1">
                        <button
                          type="button"
                          onClick={handleCharacterSearch}
                          disabled={isSearchingCharacter}
                          className="btn btn-secondary flex items-center gap-2"
                        >
                          {isSearchingCharacter ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Search size={16} />
                          )}
                          <span>Find Character</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
                      <div>
                        <label htmlFor="charClass" className="block text-sm font-medium text-gray-300 mb-1">
                          Class
                        </label>
                        <select
                          id="charClass"
                          className={`select w-full ${errors.charClass ? 'border-red-500' : ''}`}
                          {...register('charClass')}
                        >
                          <option value="">Select Class</option>
                          {classOptions.map((classOption) => (
                            <option key={classOption} value={classOption}>
                              {classOption}
                            </option>
                          ))}
                        </select>
                        {errors.charClass && (
                          <p className="mt-1 text-sm text-red-500">{errors.charClass.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="spec" className="block text-sm font-medium text-gray-300 mb-1">
                          Specialization
                        </label>
                        <select
                          id="spec"
                          className={`select w-full ${errors.spec ? 'border-red-500' : ''}`}
                          {...register('spec')}
                          disabled={!selectedClass}
                        >
                          <option value="">Select Spec</option>
                          {getSpecOptions(selectedClass).map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                        {errors.spec && (
                          <p className="mt-1 text-sm text-red-500">{errors.spec.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="desiredRole" className="block text-sm font-medium text-gray-300 mb-1">
                          Desired Role
                        </label>
                        <select
                          id="desiredRole"
                          className={`select w-full ${errors.desiredRole ? 'border-red-500' : ''}`}
                          {...register('desiredRole')}
                        >
                          <option value="">Select Role</option>
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        {errors.desiredRole && (
                          <p className="mt-1 text-sm text-red-500">{errors.desiredRole.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-primary/20 pb-6">
                  <h2 className="text-xl font-display text-primary mb-4">Experience & Availability</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                        Raiding Experience (Optional)
                      </label>
                      <textarea
                        id="experience"
                        rows={3}
                        placeholder="Tell us about your raiding history, achievements, and experience."
                        className="input w-full"
                        {...register('experience')}
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="ui" className="block text-sm font-medium text-gray-300 mb-1">
                          UI Setup (Optional)
                        </label>
                        <textarea
                          id="ui"
                          rows={3}
                          placeholder="Describe your UI setup or provide a screenshot link."
                          className="input w-full"
                          {...register('ui')}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="addons" className="block text-sm font-medium text-gray-300 mb-1">
                          Addon List (Optional)
                        </label>
                        <textarea
                          id="addons"
                          rows={3}
                          placeholder="List your essential addons for raiding."
                          className="input w-full"
                          {...register('addons')}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-1">
                        Raid Availability
                      </label>
                      <textarea
                        id="availability"
                        rows={3}
                        placeholder="What days/times are you available for raiding? Can you make our scheduled raid times?"
                        className={`input w-full ${errors.availability ? 'border-red-500' : ''}`}
                        {...register('availability')}
                      ></textarea>
                      {errors.availability && (
                        <p className="mt-1 text-sm text-red-500">{errors.availability.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-display text-primary mb-4">Additional Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-1">
                        Why do you want to join Lowcalibre?
                      </label>
                      <textarea
                        id="reason"
                        rows={4}
                        className={`input w-full ${errors.reason ? 'border-red-500' : ''}`}
                        {...register('reason')}
                      ></textarea>
                      {errors.reason && (
                        <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="referral" className="block text-sm font-medium text-gray-300 mb-1">
                        How did you hear about us? (Optional)
                      </label>
                      <input
                        id="referral"
                        type="text"
                        className="input w-full"
                        {...register('referral')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary px-8 py-3 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;