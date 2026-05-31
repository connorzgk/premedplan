export type MilestoneCategory = 'omsas' | 'reference' | 'interview';

export interface Milestone {
  id: string;
  date: string;
  month: string;
  monthOrder: number;
  category: MilestoneCategory;
  title: string;
  description: string;
  isDeadline?: boolean;
}

export const CATEGORY_META: Record<MilestoneCategory, { label: string; bg: string; text: string; dot: string }> = {
  omsas:     { label: 'OMSAS',      bg: '#eff6ff', text: '#1e40af', dot: '#3b82f6' },
  reference: { label: 'References', bg: '#fffbeb', text: '#92400e', dot: '#f59e0b' },
  interview: { label: 'Interview',  bg: '#faf5ff', text: '#6b21a8', dot: '#a855f7' },
};

// 2026–27 Ontario OMSAS cycle. Update dates each year as OMSAS publishes them.
export const MILESTONES: Milestone[] = [
  {
    id: 'ps-draft',
    date: 'April 2026',
    month: 'April 2026',
    monthOrder: 1,
    category: 'omsas',
    title: 'Begin drafting your personal statement',
    description: 'Start early — the OMSAS Autobiographical Sketch requires significant reflection and multiple revisions. List all activities, research, work, and volunteer experiences you plan to include.',
  },
  {
    id: 'identify-referees',
    date: 'May 2026',
    month: 'May 2026',
    monthOrder: 2,
    category: 'reference',
    title: 'Identify 3+ potential referees',
    description: 'Shortlist professors, supervisors, or mentors who know you well and can speak to your academic ability, character, and suitability for medicine. Aim for at least one strong academic referee.',
  },
  {
    id: 'ask-referees',
    date: 'June 2026',
    month: 'June 2026',
    monthOrder: 3,
    category: 'reference',
    title: 'Formally ask your referees',
    description: 'Send a professional email requesting their support. Provide your CV, a draft personal statement, unofficial transcripts, and a note on what you hope they can speak to. Use the Request Email Generator in the Reference Letter tab.',
  },
  {
    id: 'omsas-opens',
    date: 'July 7, 2026',
    month: 'July 2026',
    monthOrder: 4,
    category: 'omsas',
    title: 'OMSAS application portal opens',
    description: 'Register at ouac.on.ca/omsas and begin your online application. Add your biographical information, academic history, and start building your Autobiographical Sketch entries.',
  },
  {
    id: 'transcripts-request',
    date: 'July 2026',
    month: 'July 2026',
    monthOrder: 4,
    category: 'omsas',
    title: 'Request official transcripts from all institutions',
    description: 'Contact every university or college you attended and request official transcripts be sent directly to OMSAS. Processing can take 2–4 weeks — do not leave this until September.',
  },
  {
    id: 'referee-confirmation',
    date: 'July 2026',
    month: 'July 2026',
    monthOrder: 4,
    category: 'reference',
    title: 'Confirm referees received their OMSAS invitation',
    description: 'Once you add referees in your OMSAS application, the system automatically emails them an invitation. Follow up to confirm they received and accepted it. Check their status in your OMSAS portal.',
  },
  {
    id: 'ps-finalize',
    date: 'August 2026',
    month: 'August 2026',
    monthOrder: 5,
    category: 'omsas',
    title: 'Finalize personal statement and Autobiographical Sketch',
    description: 'Incorporate feedback from advisors, peers, or premed mentors. Every sketch entry requires a verifier — ensure all contact details are accurate and your verifiers are aware they may be contacted.',
  },
  {
    id: 'referee-followup',
    date: 'August 2026',
    month: 'August 2026',
    monthOrder: 5,
    category: 'reference',
    title: 'Follow up with all referees',
    description: 'Send a friendly check-in to confirm each referee is on track. Share the deadline (October 1) and offer to answer any questions. Confirm all 3 have accepted in the OMSAS portal.',
  },
  {
    id: 'app-review',
    date: 'September 2026',
    month: 'September 2026',
    monthOrder: 6,
    category: 'omsas',
    title: 'Complete final application review',
    description: 'Read your entire application from start to finish. Check for typos, inconsistent dates, and missing verifiers. Have someone unfamiliar with your application review it for clarity and completeness.',
  },
  {
    id: 'omsas-deadline',
    date: 'October 1, 2026',
    month: 'October 2026',
    monthOrder: 7,
    category: 'omsas',
    title: 'OMSAS Application Deadline',
    description: 'Submit your completed OMSAS application by 11:59 PM ET. Late submissions are not accepted. Double-check that all school selections, fees, and documents are in order before submitting.',
    isDeadline: true,
  },
  {
    id: 'reference-deadline',
    date: 'October 1, 2026',
    month: 'October 2026',
    monthOrder: 7,
    category: 'reference',
    title: 'Reference Letters Deadline',
    description: 'All 3 referees must submit their letters through the OMSAS EMS portal by the application deadline. Send a final reminder at least one week before — do not wait until the last day.',
    isDeadline: true,
  },
  {
    id: 'transcripts-deadline',
    date: 'October 1, 2026',
    month: 'October 2026',
    monthOrder: 7,
    category: 'omsas',
    title: 'Official Transcripts Deadline',
    description: 'Official transcripts from all attended institutions must be received by OMSAS by the deadline. Confirm with each institution that transcripts have been sent and follow up if not yet received.',
    isDeadline: true,
  },
  {
    id: 'first-invitations',
    date: 'December 2026',
    month: 'December 2026',
    monthOrder: 8,
    category: 'interview',
    title: 'First-round interview invitations released',
    description: 'UofT, McMaster, and Western typically release MMI invitations in December. Check your email and OMSAS portal regularly. Begin structured MMI preparation if invited — 4–6 weeks of prep is recommended.',
  },
  {
    id: 'second-invitations',
    date: 'January 2027',
    month: 'January 2027',
    monthOrder: 9,
    category: 'interview',
    title: 'Second-round interview invitations released',
    description: "Queen's, uOttawa, NOSM, and TMU typically release invitations in January. Continue monitoring your email. If you have not received an invitation from a school by late January, you may be waitlisted for an interview.",
  },
  {
    id: 'interview-season',
    date: 'February – March 2027',
    month: 'February 2027',
    monthOrder: 10,
    category: 'interview',
    title: 'Interview season',
    description: 'Most MMI and panel interviews take place between February and March. Confirm logistics well in advance, arrange travel if needed, and prepare thoroughly using practice scenarios and mock MMIs.',
  },
  {
    id: 'offer-day',
    date: 'May 14, 2027',
    month: 'May 2027',
    monthOrder: 11,
    category: 'interview',
    title: 'OMSAS Offer Day',
    description: 'Acceptance offers are released simultaneously to all applicants through the OMSAS portal at 8:00 AM ET. If you receive multiple offers, you must choose one. Waitlist movement begins after the acceptance deadline.',
    isDeadline: true,
  },
  {
    id: 'acceptance-deadline',
    date: 'May 28, 2027',
    month: 'May 2027',
    monthOrder: 11,
    category: 'interview',
    title: 'Acceptance deadline',
    description: 'You must accept or decline your offer through OMSAS by this date. Declining frees your spot for waitlisted applicants. Waitlist movement can occur up to the start of classes.',
    isDeadline: true,
  },
];
