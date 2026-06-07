export type ChangeCategory = 'gpa' | 'mcat' | 'casper' | 'process';

export interface PolicyChange {
  id: string;
  cycleYear: string;    // e.g. "2025–26"
  schoolId: string;
  schoolName: string;
  schoolAbbr: string;
  schoolColor: string;
  category: ChangeCategory;
  title: string;
  from?: string;
  to?: string;
  note: string;
}

export const CATEGORY_META: Record<ChangeCategory, { label: string; bg: string; text: string }> = {
  gpa:     { label: 'GPA',     bg: '#eff6ff', text: '#1d4ed8' },
  mcat:    { label: 'MCAT',    bg: '#faf5ff', text: '#6b21a8' },
  casper:  { label: 'CASPer',  bg: '#f0fdf4', text: '#166534' },
  process: { label: 'Process', bg: '#f3f4f6', text: '#374151' },
};

// Newest entries at the top. Add new entries here as policies change.
export const POLICY_CHANGES: PolicyChange[] = [
  {
    id: 'queens-qars-2024',
    cycleYear: '2024–25',
    schoolId: 'queens',
    schoolName: "Queen's University",
    schoolAbbr: "Queen's",
    schoolColor: '#B10D28',
    category: 'process',
    title: 'QARS lottery system replaces rank-based screening',
    note: "Queen's replaced traditional GPA/MCAT/CASPer rank-based pre-interview screening with QARS (Queen's Applicant Review System). Applicants who meet all minimum thresholds (GPA, MCAT section mins, CASPer cutoff) are entered into a randomized lottery for MMI invitations, removing the advantage of marginal score differences above the cutoff.",
  },
  {
    id: 'western-mcat-2024',
    cycleYear: '2024–25',
    schoolId: 'western',
    schoolName: 'Western University',
    schoolAbbr: 'Schulich',
    schoolColor: '#4F2683',
    category: 'mcat',
    title: 'Section minimums updated for 2024–25 cycle',
    from: '126 C/P · 126 CARS · 126 B/B · 125 P/S',
    to: '127 C/P · 127 CARS · 127 B/B · 126 P/S',
    note: "Western reviews and resets MCAT section minimums each cycle based on the competitiveness of the applicant pool. Pathway stream applicants retain a lower threshold of 125 per section.",
  },
  {
    id: 'tmu-opens-2024',
    cycleYear: '2024–25',
    schoolId: 'tmu',
    schoolName: 'Toronto Metropolitan University',
    schoolAbbr: 'TMU',
    schoolColor: '#C9960C',
    category: 'process',
    title: 'TMU School of Medicine opens',
    note: "TMU launched Ontario's newest MD program, the TMU School of Medicine, with a first cohort of 94 students. The school is located in Brampton and places strong emphasis on equity-deserving applicants and serving the Peel Region community. Notably, TMU requires neither the MCAT nor CASPer; assessment uses KIRA Talent and an MMI instead.",
  },
  {
    id: 'uoft-wgpa-removed-2022',
    cycleYear: '2022–23',
    schoolId: 'uoft',
    schoolName: 'University of Toronto',
    schoolAbbr: 'UofT',
    schoolColor: '#002A5C',
    category: 'gpa',
    title: 'Weighted GPA (wGPA) removed: switch to cumulative GPA',
    from: 'Weighted GPA (wGPA)',
    to: 'Cumulative GPA (cGPA)',
    note: "UofT removed its weighted GPA system starting in the 2022–23 cycle. Previously, applicants needed a full course load to avoid GPA penalties; lighter semesters were weighted down. All undergraduate course grades are now included equally in the cGPA, giving applicants flexibility in course load without GPA disadvantage.",
  },
  {
    id: 'nosm-independence-2022',
    cycleYear: '2022–23',
    schoolId: 'nosm',
    schoolName: 'NOSM University',
    schoolAbbr: 'NOSM',
    schoolColor: '#1a7a4a',
    category: 'process',
    title: 'NOSM becomes an independent university',
    from: 'Federated with Laurentian University',
    to: 'Independent: NOSM University',
    note: "Following Laurentian University's insolvency proceedings, NOSM separated and was granted independent university status by the Ontario government in 2022. It now operates as NOSM University and issues its own MD degrees.",
  },
  {
    id: 'uoft-grad-gpa-min-2021',
    cycleYear: '2021–22',
    schoolId: 'uoft',
    schoolName: 'University of Toronto',
    schoolAbbr: 'UofT',
    schoolColor: '#002A5C',
    category: 'gpa',
    title: 'Minimum GPA requirement raised for graduate applicants',
    from: '3.0 OMSAS (undergraduate minimum)',
    to: '3.3 OMSAS (graduate applicant minimum)',
    note: "Effective July 2021, UofT raised the minimum undergraduate OMSAS GPA requirement for graduate applicants from 3.0 to 3.3.",
  },
];
