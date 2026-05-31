'use client';

import { useState } from 'react';

const TAB_LABELS = [
  'School Requirements',
  'GPA Calculator',
  'Cost Calculator',
  'Policy Change Tracker',
  'Reference Letter Template',
  'Application Timeline',
  'Personal Story',
];

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
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
          {TAB_LABELS.map((label) => (
            <button
              key={label}
              onClick={() => onTabChange(label)}
              className="text-[11px] lg:text-[12px] xl:text-[14px] font-medium text-white transition-colors duration-200 hover:text-[#7dd3fc] whitespace-nowrap bg-transparent border-0 cursor-pointer p-0"
              style={
                activeTab === label
                  ? { borderBottom: '2px solid #7dd3fc', paddingBottom: '2px' }
                  : { borderBottom: '2px solid transparent', paddingBottom: '2px' }
              }
            >
              {label}
            </button>
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
          {TAB_LABELS.map((label) => (
            <button
              key={label}
              onClick={() => { onTabChange(label); setIsOpen(false); }}
              className="flex items-center w-full px-6 py-3 text-[14px] font-medium text-white hover:text-[#7dd3fc] hover:bg-[#264070] transition-colors duration-200 text-left bg-transparent border-0 cursor-pointer"
              style={
                activeTab === label
                  ? { borderLeft: '3px solid #7dd3fc', paddingLeft: '21px' }
                  : { borderLeft: '3px solid transparent', paddingLeft: '21px' }
              }
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
