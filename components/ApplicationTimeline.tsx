'use client';

import { useState, useMemo } from 'react';
import { MILESTONES, CATEGORY_META, MilestoneCategory } from '@/lib/applicationTimeline';

const FILTERS: { key: MilestoneCategory | 'all'; label: string }[] = [
  { key: 'all',       label: 'All' },
  { key: 'omsas',     label: 'OMSAS' },
  { key: 'reference', label: 'References' },
  { key: 'interview', label: 'Interview' },
];

export default function ApplicationTimeline() {
  const [filter, setFilter] = useState<MilestoneCategory | 'all'>('all');

  const filtered = useMemo(
    () => filter === 'all' ? MILESTONES : MILESTONES.filter(m => m.category === filter),
    [filter],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, { order: number; milestones: typeof MILESTONES }>();
    for (const m of filtered) {
      if (!map.has(m.month)) map.set(m.month, { order: m.monthOrder, milestones: [] });
      map.get(m.month)!.milestones.push(m);
    }
    return [...map.entries()].sort((a, b) => a[1].order - b[1].order);
  }, [filtered]);

  return (
    <div>
      {/* Header card */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] px-[22px] py-[16px] mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#111827]">2026–27 Application Cycle</h2>
          <p className="text-[12px] text-[#6b7280] mt-[2px]">Key dates and deadlines for the Ontario OMSAS medical school application cycle.</p>
        </div>
        <span className="text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px] whitespace-nowrap flex-shrink-0">
          {MILESTONES.length} milestones
        </span>
      </div>

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
      </div>

      {/* Timeline */}
      <div className="mb-7">
        {grouped.map(([month, { milestones }]) => (
          <div key={month} className="mb-8">
            {/* Month header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="text-[13px] font-bold text-[#0f1f3d] bg-[#e8edf5] px-3 py-[5px] rounded-[6px] whitespace-nowrap">
                {month}
              </div>
              <div className="flex-1 h-[1px] bg-[#e5e7eb]" />
            </div>

            {/* Milestones */}
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#e5e7eb]" />
            <div className="space-y-3">
              {milestones.map(milestone => {
                const meta = CATEGORY_META[milestone.category];
                return (
                  <div key={milestone.id} className="bg-white rounded-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] overflow-hidden">
                    {milestone.isDeadline && <div className="h-[3px] bg-[#dc2626]" />}
                    <div className="px-[18px] py-[14px]">
                      <div className="flex items-center gap-2 flex-wrap mb-[6px]">
                        <span className="text-[11px] font-semibold text-[#9ca3af]">{milestone.date}</span>
                        <span
                          className="text-[10px] font-bold px-[6px] py-[2px] rounded-[4px]"
                          style={{ background: meta.bg, color: meta.text }}
                        >
                          {meta.label}
                        </span>
                        {milestone.isDeadline && (
                          <span className="text-[10px] font-bold px-[6px] py-[2px] rounded-[4px] bg-[#fef2f2] text-[#dc2626]">
                            Deadline
                          </span>
                        )}
                      </div>
                      <div className="text-[14px] font-bold text-[#111827] mb-[5px]">
                        {milestone.title}
                      </div>
                      <p className="text-[12px] text-[#6b7280] leading-[1.65]">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] px-[22px] py-[14px] mb-7">
        <p className="text-[11px] text-[#9ca3af] leading-[1.65]">
          Dates are approximate and based on historical OMSAS cycle patterns. Exact deadlines are published annually at ouac.on.ca/omsas. Always verify before relying on these dates.
        </p>
      </div>
    </div>
  );
}
