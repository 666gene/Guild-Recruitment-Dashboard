import { Applicant, RaidTier } from '../types';

// Mock raid tiers
export const currentRaidTier: RaidTier = {
  id: 1,
  name: 'Blackrock Foundry',
  bosses: [
    { id: 101, name: 'Gruul', killed: true },
    { id: 102, name: 'Oregorger', killed: true },
    { id: 103, name: 'Blast Furnace', killed: true },
    { id: 104, name: 'Hans\'gar & Franzok', killed: true },
    { id: 105, name: 'Flamebender Ka\'graz', killed: true },
    { id: 106, name: 'Kromog', killed: false },
    { id: 107, name: 'Beastlord Darmac', killed: true },
    { id: 108, name: 'Operator Thogar', killed: false },
    { id: 109, name: 'Iron Maidens', killed: false },
    { id: 110, name: 'Blackhand', killed: false }
  ]
};

// Helper function to calculate raid progress percentage
const calculateProgress = (raidTiers: RaidTier[]): number => {
  const totalBosses = raidTiers.reduce((total, tier) => total + tier.bosses.length, 0);
  const killedBosses = raidTiers.reduce((total, tier) => 
    total + tier.bosses.filter(boss => boss.killed).length, 0);
  
  return totalBosses > 0 ? (killedBosses / totalBosses) * 100 : 0;
};

// Helper function to calculate score
const calculateScore = (ilvl: number, progressPercent: number): number => {
  return (ilvl / 420 * 0.6) * 100 + (progressPercent * 0.4);
};

// Generate mock applicants
export const mockApplicants: Applicant[] = [
  {
    id: '1',
    battletag: 'Shadow#1234',
    charName: 'Shadowmoon',
    realm: 'Whitemane',
    charClass: 'Warlock',
    spec: 'Affliction',
    desiredRole: 'Ranged DPS',
    ilvl: 410,
    raidProgress: [currentRaidTier],
    progressPercent: 60,
    score: calculateScore(410, 60),
    status: 'New',
    notes: 'I am looking for a consistent raiding guild with a focus on progression.',
    createdAt: '2023-05-15T14:30:00Z',
    updatedAt: '2023-05-15T14:30:00Z'
  },
  {
    id: '2',
    battletag: 'Templar#5678',
    charName: 'Lightbringer',
    realm: 'Faerlina',
    charClass: 'Paladin',
    spec: 'Holy',
    desiredRole: 'Healer',
    ilvl: 405,
    raidProgress: [{
      ...currentRaidTier,
      bosses: currentRaidTier.bosses.map((boss, idx) => ({
        ...boss,
        killed: idx < 5 // Only first 5 bosses killed
      }))
    }],
    progressPercent: 50,
    score: calculateScore(405, 50),
    status: 'Contacted',
    notes: 'Experienced healer with 10+ years of WoW raiding experience.',
    createdAt: '2023-05-14T10:15:00Z',
    updatedAt: '2023-05-16T11:20:00Z',
    officerNotes: 'Great healing logs, scheduled for trial next reset'
  },
  {
    id: '3',
    battletag: 'Crusher#9012',
    charName: 'Smashfist',
    realm: 'Grobbulus',
    charClass: 'Warrior',
    spec: 'Protection',
    desiredRole: 'Tank',
    ilvl: 415,
    raidProgress: [{
      ...currentRaidTier,
      bosses: currentRaidTier.bosses.map((boss, idx) => ({
        ...boss,
        killed: idx < 8 // First 8 bosses killed
      }))
    }],
    progressPercent: 80,
    score: calculateScore(415, 80),
    status: 'Trial',
    notes: 'Main tank for my previous guild which disbanded. Looking for a new home.',
    createdAt: '2023-05-12T18:45:00Z',
    updatedAt: '2023-05-16T09:30:00Z',
    officerNotes: 'Solid tank, good awareness. Communication needs work.'
  },
  {
    id: '4',
    battletag: 'Archmage#3456',
    charName: 'Frostbolt',
    realm: 'Benediction',
    charClass: 'Mage',
    spec: 'Frost',
    desiredRole: 'Ranged DPS',
    ilvl: 420,
    raidProgress: [{
      ...currentRaidTier,
      bosses: currentRaidTier.bosses.map((boss) => ({
        ...boss,
        killed: true // All bosses killed
      }))
    }],
    progressPercent: 100,
    score: calculateScore(420, 100),
    status: 'Accepted',
    notes: 'Looking for a new guild after my previous one stopped raiding.',
    createdAt: '2023-05-10T21:20:00Z',
    updatedAt: '2023-05-17T14:10:00Z',
    officerNotes: 'Exceptional player, consistently high DPS. Promoted from trial early.'
  },
  {
    id: '5',
    battletag: 'Nature#7890',
    charName: 'Leafstorm',
    realm: 'Whitemane',
    charClass: 'Druid',
    spec: 'Restoration',
    desiredRole: 'Healer',
    ilvl: 395,
    raidProgress: [{
      ...currentRaidTier,
      bosses: currentRaidTier.bosses.map((boss, idx) => ({
        ...boss,
        killed: idx < 3 // Only first 3 bosses killed
      }))
    }],
    progressPercent: 30,
    score: calculateScore(395, 30),
    status: 'Rejected',
    notes: 'New to healing but learning fast. Looking for a patient guild.',
    createdAt: '2023-05-09T08:30:00Z',
    updatedAt: '2023-05-11T12:15:00Z',
    officerNotes: 'Too inexperienced for our current needs. Suggested to gain more experience.'
  },
  {
    id: '6',
    battletag: 'Stealth#2345',
    charName: 'Backstabber',
    realm: 'Faerlina',
    charClass: 'Rogue',
    spec: 'Assassination',
    desiredRole: 'Melee DPS',
    ilvl: 412,
    raidProgress: [{
      ...currentRaidTier,
      bosses: currentRaidTier.bosses.map((boss, idx) => ({
        ...boss,
        killed: idx < 7 // First 7 bosses killed
      }))
    }],
    progressPercent: 70,
    score: calculateScore(412, 70),
    status: 'New',
    notes: 'Parsing 95+ on all fights. Looking for a guild that raids on my schedule.',
    createdAt: '2023-05-18T15:40:00Z',
    updatedAt: '2023-05-18T15:40:00Z'
  }
];