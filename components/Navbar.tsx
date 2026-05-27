'use client';

import { useState } from 'react';

const TABS = [
  { label: 'School Requirements', active: true },
  { label: 'GPA Calculator', active: false },
  { label: 'Cost Calculator', active: false },
  { label: 'Policy Change Tracker', active: false },
  { label: 'Reference Letter Template', active: false },
  { label: 'Free Resources', active: false },
  { label: 'Application Timeline', active: false },
  { label: 'Personal Story', active: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Main bar */}
      <nav
        className="w-full flex items-center justify-center px-6 bg-[#0f1f3d] hover:bg-[#264070] transition-colors duration-200"
        style={{ height: '44px' }}
      >
        {/* Desktop tabs */}
        <div className="hidden lg:flex items-center justify-between w-full max-w-[1320px]">
          {TABS.map((tab) => (
            <a
              key={tab.label}
              href="#"
              className="text-[11px] lg:text-[12px] xl:text-[14px] font-medium text-white transition-colors duration-200 hover:text-[#7dd3fc] whitespace-nowrap"
              style={
                tab.active
                  ? { borderBottom: '2px solid #7dd3fc', paddingBottom: '2px' }
                  : { borderBottom: '2px solid transparent', paddingBottom: '2px' }
              }
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Mobile: label + hamburger */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <span className="text-white text-[14px] font-medium">premedplan.ca</span>
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="text-white p-1 transition-colors duration-200 hover:text-[#7dd3fc]"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f1f3d] border-t border-white/10">
          {TABS.map((tab) => (
            <a
              key={tab.label}
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-6 py-3 text-[14px] font-medium text-white hover:text-[#7dd3fc] hover:bg-[#264070] transition-colors duration-200"
              style={
                tab.active
                  ? { borderLeft: '3px solid #7dd3fc', paddingLeft: '21px' }
                  : { borderLeft: '3px solid transparent', paddingLeft: '21px' }
              }
            >
              {tab.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
