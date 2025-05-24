export type CharacterClass = 
  | 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' 
  | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' 
  | 'Druid' | 'Death Knight';

export type CharacterSpec = string;

export type CharacterRole = 'Tank' | 'Healer' | 'Melee DPS' | 'Ranged DPS';

export type Realm = string;

export type RaidTier = {
  id: number;
  name: string;
  bosses: {
    id: number;
    name: string;
    killed: boolean;
  }[];
};

export type ApplicationStatus = 'New' | 'Contacted' | 'Trial' | 'Rejected' | 'Accepted';

export type Applicant = {
  id: string;
  battletag: string;
  charName: string;
  realm: Realm;
  charClass: CharacterClass;
  spec: CharacterSpec;
  desiredRole: CharacterRole;
  ilvl: number;
  raidProgress: RaidTier[];
  progressPercent: number;
  score: number;
  status: ApplicationStatus;
  notes: string;
  officerNotes?: string;
  createdAt: string;
  updatedAt: string;
  rawApiJson?: string;
};

export type Equipment = {
  id: number;
  name: string;
  quality: string;
  itemLevel: number;
  slot: string;
  icon: string;
};

export type CharacterDetails = {
  name: string;
  realm: string;
  class: CharacterClass;
  level: number;
  ilvl: number;
  faction: 'Alliance' | 'Horde';
  equipment: Equipment[];
  talents: string[];
  professions: { name: string; level: number }[];
  raidProgress: RaidTier[];
  progressPercent: number;
  thumbnail: string;
};

export type User = {
  id: string;
  username: string;
  role: 'admin' | 'officer';
};

export type Vacancy = {
  role: CharacterRole;
  classes: CharacterClass[];
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
};