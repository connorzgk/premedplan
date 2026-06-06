'use client';

import { useState } from 'react';
import type { School } from '@/lib/types';

type Tab = 'gpa' | 'mcat' | 'prereqs';

const TABS: { key: Tab; label: string }[] = [
  { key: 'gpa', label: 'GPA' },
  { key: 'mcat', label: 'MCAT' },
  { key: 'prereqs', label: 'Prerequisites' },
];

function McatPill({ status }: { status: School['mcatStatus'] }) {
  if (status === 'no') {
    return (
      <span className="text-[11px] font-bold px-[9px] py-1 rounded-[6px] bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] flex-shrink-0 self-start mt-[2px]">
        No MCAT
      </span>
    );
  }
  if (status === 'cars') {
    return (
      <span className="text-[11px] font-bold px-[9px] py-1 rounded-[6px] bg-[#fef9c3] text-[#854d0e] border border-[#fef08a] flex-shrink-0 self-start mt-[2px]">
        CARS Only
      </span>
    );
  }
  return (
    <span className="text-[11px] font-bold px-[9px] py-1 rounded-[6px] bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa] flex-shrink-0 self-start mt-[2px]">
      MCAT Required
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-[14px]">
      <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#6b7280] mb-[3px]">{label}</div>
      <div className="text-[15px] font-bold text-[#111827] leading-[1.3]">{value}</div>
    </div>
  );
}

function MetricNote({ label, note }: { label: string; note: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#6b7280] mb-[3px]">{label}</div>
      <div className="text-[12px] text-[#6b7280] leading-[1.5] mt-[2px]">{note}</div>
    </div>
  );
}

export default function SchoolCard({ school }: { school: School }) {
  const [activeTab, setActiveTab] = useState<Tab>('gpa');
  const { color } = school;

  return (
    <div className="bg-white rounded-[14px] overflow-hidden flex flex-col transition-[box-shadow,transform] duration-[180ms] ease-in-out hover:-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.13)]">
      {/* Top */}
      <div
        className="px-[22px] pt-5 pb-4 flex items-start gap-[13px] border-t-4"
        style={{ borderTopColor: color }}
      >
        <div
          className="w-[46px] h-[46px] rounded-[10px] flex items-center justify-center font-extrabold text-[13px] text-white flex-shrink-0 tracking-[-0.02em]"
          style={{ background: color }}
        >
          {school.abbr.slice(0, 5)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold mb-[2px] leading-[1.3]">{school.name}</h3>
          <div className="text-[12px] text-[#6b7280]">{school.program}</div>
        </div>
        <McatPill status={school.mcatStatus} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#e5e7eb] px-[22px]">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-[13px] py-[9px] text-[12px] font-bold transition-[color,border-color] duration-[180ms] cursor-pointer tracking-[0.02em] -mb-px"
            style={{
              color: activeTab === tab.key ? color : '#6b7280',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: activeTab === tab.key ? `2px solid ${color}` : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="px-[22px] py-5 flex-1 min-h-[168px]">
        {activeTab === 'gpa' && (
          <>
            <Metric label="Minimum GPA" value={school.gpa.min} />
            <Metric label="Accepted GPA" value={school.gpa.competitive} />
            <MetricNote label="Notes" note={school.gpa.note} />
          </>
        )}

        {activeTab === 'mcat' && (
          <>
            {school.mcatStatus === 'no' ? (
              <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] px-3 py-[10px] text-[13px] font-bold text-[#166534] mb-[14px]">
                ✓ MCAT Not Required
              </div>
            ) : (
              <>
                <Metric label="Minimum Score" value={school.mcat.min} />
                <Metric label="Competitive Score" value={school.mcat.competitive} />
              </>
            )}
            <MetricNote label="Notes" note={school.mcat.note} />
          </>
        )}

        {activeTab === 'prereqs' && (
          <ul className="flex flex-col gap-[9px] list-none p-0 m-0">
            {school.prereqs.map((prereq) => (
              <li key={prereq} className="flex gap-[9px] text-[13px] leading-[1.45] text-[#111827]">
                <span className="text-[#22c55e] font-extrabold flex-shrink-0 mt-[1px]">✓</span>
                {prereq}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-[22px] py-3 pb-4 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="text-[12px] text-[#6b7280]">
          Approx. <b className="text-[#111827]">{school.seats}</b> seats/year
        </div>
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-bold no-underline hover:underline"
          style={{ color }}
        >
          Official Site ↗
        </a>
      </div>
    </div>
  );
}
