export const OMSAS_GRADES: Record<string, number> = {
  'A+': 4.0,
  'A':  3.9,
  'A-': 3.7,
  'B+': 3.3,
  'B':  3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C':  2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D':  1.0,
  'F':  0.0,
};

export const GRADE_OPTIONS = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D',
  'F',
] as const;

export interface Course {
  id: string;
  year: number;
  gradeType: 'letter' | 'percent';
  letterGrade: string;
  percent: string;
  credits: string;
}

export interface YearSummary {
  year: number;
  gpa: number;
  credits: number;
  count: number;
}

export interface SchoolResult {
  id: string;
  name: string;
  abbr: string;
  color: string;
  gpa: number | null;
  method: string;
  usedYears: number[];
  droppedYears: number[];
  minGPA: string;
  competitiveGPA: string;
}

export function percentToLetterGrade(pct: number): string {
  if (pct >= 90) return 'A+';
  if (pct >= 85) return 'A';
  if (pct >= 80) return 'A-';
  if (pct >= 77) return 'B+';
  if (pct >= 73) return 'B';
  if (pct >= 70) return 'B-';
  if (pct >= 67) return 'C+';
  if (pct >= 63) return 'C';
  if (pct >= 60) return 'C-';
  if (pct >= 57) return 'D+';
  if (pct >= 53) return 'D';
  return 'F';
}

export function getGradePoints(course: Course): number | null {
  if (course.gradeType === 'letter') {
    return OMSAS_GRADES[course.letterGrade] ?? null;
  }
  const pct = parseFloat(course.percent);
  if (isNaN(pct) || pct < 0 || pct > 100) return null;
  return OMSAS_GRADES[percentToLetterGrade(pct)];
}

export function getEffectiveLetterGrade(course: Course): string | null {
  if (course.gradeType === 'letter') return course.letterGrade || null;
  const pct = parseFloat(course.percent);
  if (isNaN(pct)) return null;
  return percentToLetterGrade(pct);
}

function isValid(course: Course): boolean {
  const credits = parseFloat(course.credits);
  return !isNaN(credits) && credits > 0 && getGradePoints(course) !== null;
}

function weightedAvg(courses: Course[]): number | null {
  const valid = courses.filter(isValid);
  if (valid.length === 0) return null;
  let pts = 0, creds = 0;
  for (const c of valid) {
    pts += getGradePoints(c)! * parseFloat(c.credits);
    creds += parseFloat(c.credits);
  }
  return creds > 0 ? pts / creds : null;
}

export function calcYearSummaries(courses: Course[]): YearSummary[] {
  const map: Record<number, Course[]> = {};
  for (const c of courses.filter(isValid)) {
    (map[c.year] ??= []).push(c);
  }
  return Object.entries(map)
    .map(([y, cs]) => ({
      year: Number(y),
      gpa: weightedAvg(cs)!,
      credits: cs.reduce((s, c) => s + parseFloat(c.credits), 0),
      count: cs.length,
    }))
    .sort((a, b) => a.year - b.year);
}

export function calcCGPA(courses: Course[]): number | null {
  return weightedAvg(courses);
}

type CalcResult = { gpa: number | null; usedYears: number[]; droppedYears: number[] };

function cgpaResult(courses: Course[]): CalcResult {
  const years = calcYearSummaries(courses).map(s => s.year);
  return { gpa: weightedAvg(courses), usedYears: years, droppedYears: [] };
}

function best3Years(courses: Course[]): CalcResult {
  const summaries = calcYearSummaries(courses);
  if (summaries.length <= 3) {
    return { gpa: weightedAvg(courses), usedYears: summaries.map(s => s.year), droppedYears: [] };
  }
  const dropped = [...summaries].sort((a, b) => a.gpa - b.gpa)[0].year;
  const usedYears = summaries.filter(s => s.year !== dropped).map(s => s.year);
  return {
    gpa: weightedAvg(courses.filter(c => usedYears.includes(c.year))),
    usedYears,
    droppedYears: [dropped],
  };
}

function best2Years(courses: Course[]): CalcResult {
  const summaries = calcYearSummaries(courses);
  if (summaries.length <= 2) {
    return { gpa: weightedAvg(courses), usedYears: summaries.map(s => s.year), droppedYears: [] };
  }
  const sorted = [...summaries].sort((a, b) => b.gpa - a.gpa);
  const usedYears = sorted.slice(0, 2).map(s => s.year);
  const droppedYears = sorted.slice(2).map(s => s.year);
  return {
    gpa: weightedAvg(courses.filter(c => usedYears.includes(c.year))),
    usedYears: usedYears.sort((a, b) => a - b),
    droppedYears,
  };
}

function lastNYears(courses: Course[], n: number): CalcResult {
  const summaries = calcYearSummaries(courses);
  const sorted = [...summaries].sort((a, b) => b.year - a.year);
  const usedYears = sorted.slice(0, n).map(s => s.year);
  const droppedYears = sorted.slice(n).map(s => s.year);
  return {
    gpa: weightedAvg(courses.filter(c => usedYears.includes(c.year))),
    usedYears: usedYears.sort((a, b) => a - b),
    droppedYears,
  };
}

const SCHOOL_DEFS = [
  {
    id: 'uoft',
    name: 'University of Toronto',
    abbr: 'UofT',
    color: '#002A5C',
    method: 'Cumulative GPA: all courses, all years',
    minGPA: '3.6',
    competitiveGPA: '3.9',
    calc: (c: Course[]) => cgpaResult(c),
  },
  {
    id: 'mcmaster',
    name: 'McMaster University',
    abbr: 'Mac',
    color: '#7A003C',
    method: 'Cumulative GPA: all courses, all years',
    minGPA: '3.0',
    competitiveGPA: '3.87',
    calc: (c: Course[]) => cgpaResult(c),
  },
  {
    id: 'western',
    name: 'Western University',
    abbr: 'Schulich',
    color: '#4F2683',
    method: 'Best 2 years (min 5 FCEs/30cr each): 3.7 minimum required in each year',
    minGPA: '3.7*',
    competitiveGPA: '3.9',
    calc: (c: Course[]) => best2Years(c),
  },
  {
    id: 'queens',
    name: "Queen's University",
    abbr: "Queen's",
    color: '#B10D28',
    method: 'Cumulative GPA: all courses, all years',
    minGPA: '3.0',
    competitiveGPA: '3.85',
    calc: (c: Course[]) => cgpaResult(c),
  },
  {
    id: 'uottawa',
    name: 'University of Ottawa',
    abbr: 'uOttawa',
    color: '#8F001A',
    method: 'Most recent 3 years: highest year numbers used',
    minGPA: '3.5',
    competitiveGPA: '3.93',
    calc: (c: Course[]) => lastNYears(c, 3),
  },
  {
    id: 'tmu',
    name: 'Toronto Metropolitan University',
    abbr: 'TMU',
    color: '#C9960C',
    method: 'Cumulative GPA: all courses, all years',
    minGPA: '3.0',
    competitiveGPA: '3.7',
    calc: (c: Course[]) => cgpaResult(c),
  },
  {
    id: 'nosm',
    name: 'NOSM University',
    abbr: 'NOSM',
    color: '#1a7a4a',
    method: 'Cumulative GPA: all courses, all years',
    minGPA: '3.0',
    competitiveGPA: '3.76',
    calc: (c: Course[]) => cgpaResult(c),
  },
];

export function calculateAllSchools(courses: Course[]): SchoolResult[] {
  return SCHOOL_DEFS.map(school => {
    const { gpa, usedYears, droppedYears } = school.calc(courses);
    return {
      id: school.id,
      name: school.name,
      abbr: school.abbr,
      color: school.color,
      gpa,
      method: school.method,
      usedYears,
      droppedYears,
      minGPA: school.minGPA,
      competitiveGPA: school.competitiveGPA,
    };
  });
}
