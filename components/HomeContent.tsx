'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import SchoolsSection from './SchoolsSection';
import ComparisonTable from './ComparisonTable';
import Disclaimer from './Disclaimer';
import Sources from './Sources';
import Footer from './Footer';
import GPACalculator from './GPACalculator';
import CostCalculator from './CostCalculator';
import PolicyChangeTracker from './PolicyChangeTracker';
import ReferenceLetterTemplate from './ReferenceLetterTemplate';
import ApplicationTimeline from './ApplicationTimeline';

const SCHOOL_REQUIREMENTS = 'School Requirements';
const GPA_CALCULATOR = 'GPA Calculator';
const COST_CALCULATOR = 'Cost Calculator';
const POLICY_TRACKER = 'Policy Change Tracker';
const REFERENCE_LETTER = 'Reference Letter Template';
const APP_TIMELINE = 'Application Timeline';

function ComingSoon({ tab }: { tab: string }) {
  return (
    <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] p-16 text-center">
        <h2 className="text-[18px] font-bold text-[#111827] mb-2">{tab}</h2>
        <p className="text-[13px] text-[#6b7280]">This section is coming soon.</p>
      </div>
    </main>
  );
}

export default function HomeContent() {
  const [activeTab, setActiveTab] = useState(SCHOOL_REQUIREMENTS);

  return (
    <div className="min-h-screen bg-[#f0f2f7] text-[#111827]">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === SCHOOL_REQUIREMENTS && (
        <>
          <Header />
          <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
            <SchoolsSection />
            <ComparisonTable />
            <Disclaimer />
            <Sources />
          </main>
        </>
      )}

      {activeTab === GPA_CALCULATOR && (
        <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
          <GPACalculator />
        </main>
      )}

      {activeTab === COST_CALCULATOR && (
        <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
          <CostCalculator />
        </main>
      )}

      {activeTab === POLICY_TRACKER && (
        <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
          <PolicyChangeTracker />
        </main>
      )}

      {activeTab === REFERENCE_LETTER && (
        <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
          <ReferenceLetterTemplate />
        </main>
      )}

      {activeTab === APP_TIMELINE && (
        <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
          <ApplicationTimeline />
        </main>
      )}

      {activeTab !== SCHOOL_REQUIREMENTS && activeTab !== GPA_CALCULATOR && activeTab !== COST_CALCULATOR && activeTab !== POLICY_TRACKER && activeTab !== REFERENCE_LETTER && activeTab !== APP_TIMELINE && (
        <ComingSoon tab={activeTab} />
      )}

      <Footer />
    </div>
  );
}
