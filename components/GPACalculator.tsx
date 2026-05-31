'use client';

import { useState } from 'react';
import {
  Course,
  GRADE_OPTIONS,
  percentToLetterGrade,
  getGradePoints,
  calcYearSummaries,
  calcCGPA,
  calculateAllSchools,
} from '@/lib/gpaCalculator';

function makeCourse(year = 1): Course {
  return {
    id: Math.random().toString(36).slice(2, 9),
    year,
    gradeType: 'letter',
    letterGrade: 'A',
    percent: '',
    credits: '0.5',
  };
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([makeCourse(1)]);

  const update = (id: string, patch: Partial<Course>) =>
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
  const remove = (id: string) =>
    setCourses(prev => prev.filter(c => c.id !== id));
  const addCourse = () => {
    const lastYear = courses[courses.length - 1]?.year ?? 1;
    setCourses(prev => [...prev, makeCourse(lastYear)]);
  };

  const yearSummaries = calcYearSummaries(courses);
  const cgpa = calcCGPA(courses);
  const schoolResults = calculateAllSchools(courses);

  return (
    <div>
      {/* Course Entry */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[16px] font-bold text-[#111827]">Your Courses</h2>
            <p className="text-[12px] text-[#6b7280] mt-[3px]">
              Enter each course with its grade and credit weight (FCE). Use 0.5 for a semester course, 1.0 for a full-year course.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px] whitespace-nowrap flex-shrink-0">
            OMSAS scale
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Year', 'Grade', 'Credits (FCE)', 'OMSAS Points', ''].map(h => (
                  <th
                    key={h}
                    className="px-4 py-[10px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280] bg-[#f9fafb] border-b border-[#e5e7eb] text-left whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => {
                const pts = getGradePoints(course);
                const pctNum = parseFloat(course.percent);
                const pctConverted = !isNaN(pctNum) && course.gradeType === 'percent'
                  ? percentToLetterGrade(pctNum)
                  : null;
                return (
                  <tr
                    key={course.id}
                    className="hover:bg-[#f9fafb]"
                    style={{ borderBottom: i < courses.length - 1 ? '1px solid #e5e7eb' : 'none' }}
                  >
                    {/* Year */}
                    <td className="px-4 py-[10px] align-middle">
                      <select
                        value={course.year}
                        onChange={e => update(course.id, { year: Number(e.target.value) })}
                        className="text-[13px] border border-[#e5e7eb] rounded-[6px] px-2 py-[5px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
                      >
                        <option value={1}>Year 1</option>
                        <option value={2}>Year 2</option>
                        <option value={3}>Year 3</option>
                        <option value={4}>Year 4</option>
                        <option value={5}>Year 5</option>
                      </select>
                    </td>

                    {/* Grade */}
                    <td className="px-4 py-[10px] align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex rounded-[6px] border border-[#e5e7eb] overflow-hidden text-[11px] font-medium">
                          <button
                            type="button"
                            onClick={() => update(course.id, { gradeType: 'letter' })}
                            className={`px-[8px] py-[4px] transition-colors ${course.gradeType === 'letter' ? 'bg-[#0f1f3d] text-white' : 'bg-white text-[#6b7280] hover:bg-[#f3f4f6]'}`}
                          >
                            Grade
                          </button>
                          <button
                            type="button"
                            onClick={() => update(course.id, { gradeType: 'percent' })}
                            className={`px-[8px] py-[4px] transition-colors ${course.gradeType === 'percent' ? 'bg-[#0f1f3d] text-white' : 'bg-white text-[#6b7280] hover:bg-[#f3f4f6]'}`}
                          >
                            %
                          </button>
                        </div>
                        {course.gradeType === 'letter' ? (
                          <select
                            value={course.letterGrade}
                            onChange={e => update(course.id, { letterGrade: e.target.value })}
                            className="text-[13px] border border-[#e5e7eb] rounded-[6px] px-2 py-[5px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
                          >
                            {GRADE_OPTIONS.map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={course.percent}
                              onChange={e => update(course.id, { percent: e.target.value })}
                              placeholder="0–100"
                              className="w-[72px] text-[13px] border border-[#e5e7eb] rounded-[6px] px-2 py-[5px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
                            />
                            {pctConverted && (
                              <span className="text-[11px] font-semibold text-[#374151] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px]">
                                {pctConverted}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="px-4 py-[10px] align-middle">
                      <input
                        type="number"
                        min={0.5}
                        max={2}
                        step={0.5}
                        value={course.credits}
                        onChange={e => update(course.id, { credits: e.target.value })}
                        className="w-[72px] text-[13px] border border-[#e5e7eb] rounded-[6px] px-2 py-[5px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
                      />
                    </td>

                    {/* OMSAS Points */}
                    <td className="px-4 py-[10px] align-middle">
                      <span className={`text-[14px] font-bold ${pts !== null ? 'text-[#111827]' : 'text-[#d1d5db]'}`}>
                        {pts !== null ? pts.toFixed(1) : '—'}
                      </span>
                    </td>

                    {/* Delete */}
                    <td className="px-4 py-[10px] align-middle">
                      <button
                        onClick={() => remove(course.id)}
                        disabled={courses.length === 1}
                        className="text-[#9ca3af] hover:text-[#ef4444] transition-colors text-[20px] leading-none disabled:opacity-25 disabled:cursor-not-allowed"
                        aria-label="Remove course"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-[22px] py-[14px] border-t border-[#e5e7eb]">
          <button
            onClick={addCourse}
            className="text-[13px] font-semibold text-[#0f1f3d] hover:text-[#264070] transition-colors border border-[#e5e7eb] rounded-[8px] px-4 py-[7px] hover:bg-[#f9fafb]"
          >
            + Add Course
          </button>
        </div>
      </div>

      {/* Year Summary */}
      {yearSummaries.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {yearSummaries.map(ys => (
            <div key={ys.year} className="bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] px-4 py-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-[3px]">Year {ys.year}</div>
              <div className="text-[22px] font-bold text-[#111827] leading-none">{ys.gpa.toFixed(3)}</div>
              <div className="text-[11px] text-[#9ca3af] mt-[5px]">{ys.credits.toFixed(1)} FCE · {ys.count} course{ys.count !== 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      )}

      {/* School Results */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-7">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#111827]">GPA by School</h2>
          {cgpa !== null && (
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280]">cGPA (all years)</div>
              <div className="text-[22px] font-bold text-[#111827] leading-none">{cgpa.toFixed(3)}</div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['School', 'Method', 'Your GPA', 'Min GPA', 'Competitive GPA'].map(h => (
                  <th
                    key={h}
                    className="px-4 py-[11px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280] bg-[#f9fafb] border-b border-[#e5e7eb] text-left whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schoolResults.map((result, i) => {
                const minVal = parseFloat(result.minGPA);
                const compVal = parseFloat(result.competitiveGPA);
                const g = result.gpa;
                let gpaColor = '#111827';
                if (g !== null) {
                  if (!isNaN(compVal) && g >= compVal) gpaColor = '#166534';
                  else if (!isNaN(minVal) && g >= minVal) gpaColor = '#854d0e';
                  else if (!isNaN(minVal) && g < minVal) gpaColor = '#dc2626';
                }
                return (
                  <tr
                    key={result.id}
                    className="hover:bg-[#f9fafb]"
                    style={{ borderBottom: i < schoolResults.length - 1 ? '1px solid #e5e7eb' : 'none' }}
                  >
                    <td className="px-4 py-[13px] text-[13px] align-middle">
                      <div className="flex items-center gap-[9px]">
                        <div className="w-[9px] h-[9px] rounded-full flex-shrink-0" style={{ background: result.color }} />
                        <strong className="font-bold">{result.name}</strong>
                      </div>
                    </td>
                    <td className="px-4 py-[13px] text-[12px] text-[#6b7280] align-middle max-w-[260px]">
                      {result.method}
                    </td>
                    <td className="px-4 py-[13px] align-middle">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-bold" style={{ color: gpaColor }}>
                          {g !== null ? g.toFixed(3) : '—'}
                        </span>
                        {result.droppedYears.length > 0 && (
                          <span className="text-[11px] text-[#9ca3af]">
                            (Year {result.droppedYears.join(', ')} dropped)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-[13px] text-[13px] align-middle">{result.minGPA}</td>
                    <td className="px-4 py-[13px] text-[13px] align-middle">{result.competitiveGPA}+</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-[22px] py-[13px] border-t border-[#e5e7eb]">
          <p className="text-[11px] text-[#9ca3af] leading-[1.6]">
            GPA colour:{' '}
            <span className="font-semibold text-[#166534]">green</span> = at or above competitive ·{' '}
            <span className="font-semibold text-[#854d0e]">amber</span> = above minimum, below competitive ·{' '}
            <span className="font-semibold text-[#dc2626]">red</span> = below minimum.{' '}
            * Western requires 3.7 in at least 2 separate years — check per-year GPAs above.{' '}
            These formulas are approximate prototypes — verify with each school&apos;s official admissions page.
          </p>
        </div>
      </div>
    </div>
  );
}
