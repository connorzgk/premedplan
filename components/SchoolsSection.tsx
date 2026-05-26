'use client';

import { useState } from 'react';
import { schools } from '@/lib/schools';
import type { FilterType } from '@/lib/types';
import SchoolCard from './SchoolCard';

const FILTER_BTNS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All Schools' },
  { key: 'mcat', label: 'MCAT Required' },
  { key: 'no-mcat', label: 'No MCAT' },
  { key: '3yr', label: '3-Year Programs' },
];

export default function SchoolsSection() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filtered = schools.filter((school) => {
    const q = query.toLowerCase();
    const matchesSearch =
      school.name.toLowerCase().includes(q) || school.abbr.toLowerCase().includes(q);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'mcat' && school.mcatStatus !== 'no') ||
      (filter === 'no-mcat' && school.mcatStatus === 'no') ||
      (filter === '3yr' && school.programLen === 3);
    return matchesSearch && matchesFilter;
  });

  const countLabel =
    filtered.length === schools.length
      ? `Showing all ${filtered.length} schools`
      : `Showing ${filtered.length} of ${schools.length} schools`;

  return (
    <>
      {/* Controls */}
      <div className="flex gap-[10px] mb-7 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px] max-w-[320px]">
          <svg
            className="absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none text-[#9ca3af]"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search schools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-[10px] pr-4 pl-[38px] border-[1.5px] border-[#e5e7eb] rounded-[9px] bg-white text-[14px] text-[#111827] outline-none transition-[border-color,box-shadow] duration-[180ms] focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
          />
        </div>
        {FILTER_BTNS.map((btn) => (
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

      {/* Section header */}
      <div className="flex items-baseline gap-[10px] mb-5">
        <h2 className="text-[18px] font-bold">Medical Schools</h2>
        <span className="text-[13px] text-[#6b7280]">{countLabel}</span>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 min-[700px]:grid-cols-[repeat(auto-fill,minmax(370px,1fr))] gap-5 mb-11">
        {filtered.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </>
  );
}
