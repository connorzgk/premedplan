'use client';

import { useState, useMemo } from 'react';
import { POLICY_CHANGES, CATEGORY_META, ChangeCategory } from '@/lib/policyChanges';

const FILTERS: { key: ChangeCategory | 'all'; label: string }[] = [
  { key: 'all',     label: 'All Changes' },
  { key: 'gpa',     label: 'GPA' },
  { key: 'mcat',    label: 'MCAT' },
  { key: 'casper',  label: 'CASPer' },
  { key: 'process', label: 'Process' },
];

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#9ca3af]">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function PolicyChangeTracker() {
  const [filter, setFilter] = useState<ChangeCategory | 'all'>('all');

  const filtered = useMemo(
    () => filter === 'all' ? POLICY_CHANGES : POLICY_CHANGES.filter(c => c.category === filter),
    [filter],
  );

  // Group by cycle year, preserving order (newest first)
  const grouped = useMemo(() => {
    const map = new Map<string, typeof POLICY_CHANGES>();
    for (const change of filtered) {
      if (!map.has(change.cycleYear)) map.set(change.cycleYear, []);
      map.get(change.cycleYear)!.push(change);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex gap-[10px] mb-7 flex-wrap items-center">
        {FILTERS.map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`px-[15px] py-[9px] border-[1.5px] rounded-[9px] text-[13px] font-semibold cursor-pointer transition-all duration-[180ms] whitespace-nowrap ${
              filter === btn.key
                ? 'bg-[#1a3a6b] border-[#1a3a6b] text-white'
                : 'bg-white border-[#e5e7eb] text-[#6b7280] hover:bg-[#f3f4f6]'
            }`}
          >
            {btn.label}
          </button>
        ))}
        <span className="text-[13px] text-[#6b7280] ml-1">
          {filtered.length} change{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Timeline grouped by cycle year */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-16 text-center">
          <p className="text-[13px] text-[#6b7280]">No changes recorded for this category yet.</p>
        </div>
      ) : (
        <div className="space-y-8 mb-7">
          {Array.from(grouped.entries()).map(([year, changes]) => (
            <div key={year}>
              {/* Year header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[13px] font-bold text-[#0f1f3d] bg-[#e8edf5] px-3 py-[5px] rounded-[6px] whitespace-nowrap">
                  {year} Cycle
                </div>
                <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
              </div>

              {/* Change cards */}
              <div className="space-y-3">
                {changes.map(change => {
                  const meta = CATEGORY_META[change.category];
                  return (
                    <div
                      key={change.id}
                      className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden"
                    >
                      {/* Colored accent bar */}
                      <div className="h-[3px]" style={{ background: change.schoolColor }} />

                      <div className="px-[22px] py-[16px]">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4 mb-[10px]">
                          <div className="flex items-center gap-[9px] flex-wrap">
                            <div className="w-[9px] h-[9px] rounded-full flex-shrink-0" style={{ background: change.schoolColor }} />
                            <span className="text-[13px] font-bold text-[#111827]">{change.schoolName}</span>
                            <span
                              className="text-[10px] font-bold px-[7px] py-[3px] rounded-[5px]"
                              style={{ background: meta.bg, color: meta.text }}
                            >
                              {meta.label}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#9ca3af] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px] whitespace-nowrap flex-shrink-0">
                            {change.cycleYear}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="text-[15px] font-bold text-[#111827] mb-[8px]">
                          {change.title}
                        </div>

                        {/* From → To */}
                        {(change.from || change.to) && (
                          <div className="flex items-center gap-2 mb-[10px] flex-wrap">
                            {change.from && (
                              <span className="text-[12px] font-semibold text-[#6b7280] bg-[#f9fafb] border border-[#e5e7eb] px-[9px] py-[4px] rounded-[6px]">
                                {change.from}
                              </span>
                            )}
                            {change.from && change.to && <Arrow />}
                            {change.to && (
                              <span className="text-[12px] font-semibold text-[#111827] bg-[#f0f4ff] border border-[#c7d7f7] px-[9px] py-[4px] rounded-[6px]">
                                {change.to}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Note */}
                        <p className="text-[12px] text-[#6b7280] leading-[1.65]">
                          {change.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer disclaimer */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] px-[22px] py-[14px] mb-7">
        <p className="text-[11px] text-[#9ca3af] leading-[1.65]">
          Policy changes are tracked manually and may not reflect the most recent updates.
          Always verify requirements directly with each school's official admissions page before applying.
          Cycle years refer to the application cycle in which the change was announced or took effect.
        </p>
      </div>
    </div>
  );
}
