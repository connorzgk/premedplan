export type McatStatus = 'required' | 'cars' | 'no';
export type FilterType = 'all' | 'mcat' | 'no-mcat' | '3yr';

export interface School {
  id: string;
  name: string;
  abbr: string;
  color: string;
  program: string;
  programLen: number;
  mcatStatus: McatStatus;
  gpa: {
    min: string;
    competitive: string;
    note: string;
  };
  mcat: {
    min: string;
    competitive: string;
    note: string;
  };
  prereqs: string[];
  website: string;
  seats: string;
}
