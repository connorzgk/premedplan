export interface SchoolFeeInfo {
  id: string;
  name: string;
  abbr: string;
  color: string;
  requiresMCAT: boolean;
  requiresCasper: boolean;
  requiresSnapshot: boolean;
  requiresDuet: boolean;
  designationFee?: number;
}

// 2025–26 Ontario cycle fees (CAD unless noted)
export const OMSAS_BASE_FEE = 220;
export const OMSAS_PER_SCHOOL = 135;
export const MCAT_FEE_USD = 335;
export const MCAT_FEE_CAD = 459; // ~1.37 exchange rate
export const CASPER_FEE = 50;        // one-time test fee
export const CASPER_DIST_FEE = 20;   // per school distribution fee
export const SNAPSHOT_FEE = 14; // per program (McMaster)
export const DUET_FEE = 25;     // per program (McMaster)
export const TRANSCRIPT_FEE_EST = 15; // per institution, estimate
export const INTERVIEW_TRAVEL_EST = 300; // per interview (transport + accommodation est.)

export const SCHOOL_FEES: SchoolFeeInfo[] = [
  {
    id: 'uoft',
    name: 'University of Toronto',
    abbr: 'UofT',
    color: '#002A5C',
    requiresMCAT: true,
    requiresCasper: false,
    requiresSnapshot: false,
    requiresDuet: false,
  },
  {
    id: 'mcmaster',
    name: 'McMaster University',
    abbr: 'Mac',
    color: '#7A003C',
    requiresMCAT: true,
    requiresCasper: true,
    requiresSnapshot: false,
    requiresDuet: false,
  },
  {
    id: 'western',
    name: 'Western University',
    abbr: 'Schulich',
    color: '#4F2683',
    requiresMCAT: true,
    requiresCasper: false,
    requiresSnapshot: false,
    requiresDuet: false,
  },
  {
    id: 'queens',
    name: "Queen's University",
    abbr: "Queen's",
    color: '#B10D28',
    requiresMCAT: true,
    requiresCasper: true,
    requiresSnapshot: false,
    requiresDuet: false,
  },
  {
    id: 'uottawa',
    name: 'University of Ottawa',
    abbr: 'uOttawa',
    color: '#8F001A',
    requiresMCAT: false,
    requiresCasper: true,
    requiresSnapshot: false,
    requiresDuet: false,
  },
  {
    id: 'tmu',
    name: 'Toronto Metropolitan University',
    abbr: 'TMU',
    color: '#C9960C',
    requiresMCAT: false,
    requiresCasper: false,
    requiresSnapshot: false,
    requiresDuet: false,
    designationFee: 130,
  },
  {
    id: 'nosm',
    name: 'NOSM University',
    abbr: 'NOSM',
    color: '#1a7a4a',
    requiresMCAT: false,
    requiresCasper: true,
    requiresSnapshot: false,
    requiresDuet: false,
  },
];

export type MCATPrep = 'none' | 'books' | 'online' | 'premium';

export const MCAT_PREP_OPTIONS: { value: MCATPrep; label: string; cost: number }[] = [
  { value: 'none',    label: 'None',                                     cost: 0    },
  { value: 'books',   label: 'Self-study books',                         cost: 200  },
  { value: 'online',  label: 'Online course (Blueprint, Jack Westin…)',  cost: 700  },
  { value: 'premium', label: 'Premium course (Kaplan, Princeton…)',      cost: 2500 },
];
