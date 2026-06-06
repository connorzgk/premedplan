'use client';

import { useState, useMemo } from 'react';
import {
  SCHOOL_FEES,
  OMSAS_BASE_FEE,
  OMSAS_PER_SCHOOL,
  MCAT_FEE_USD,
  MCAT_FEE_CAD,
  CASPER_FEE,
  CASPER_DIST_FEE,
  SNAPSHOT_FEE,
  DUET_FEE,
  TRANSCRIPT_FEE_EST,
  MCAT_PREP_OPTIONS,
  MCATPrep,
} from '@/lib/costCalculator';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-CA');
}

function Stepper({ value, onChange, min = 1, max = 10 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-[22px] h-[22px] rounded-full border border-[#e5e7eb] text-[#374151] text-[14px] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
      >−</button>
      <span className="text-[13px] font-semibold text-[#111827] w-5 text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-[22px] h-[22px] rounded-full border border-[#e5e7eb] text-[#374151] text-[14px] flex items-center justify-center hover:bg-[#f3f4f6] transition-colors"
      >+</button>
    </div>
  );
}

export default function CostCalculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [includeMCAT, setIncludeMCAT] = useState(true);
  const [includeCasper, setIncludeCasper] = useState(true);
  const [mcatPrep, setMcatPrep] = useState<MCATPrep>('none');
  const [transcriptCount, setTranscriptCount] = useState(2);
  const [includeTranscripts, setIncludeTranscripts] = useState(false);
  const [includeCasperPrep, setIncludeCasperPrep] = useState(false);
  const [includeBackground, setIncludeBackground] = useState(false);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectedSchools = SCHOOL_FEES.filter(s => selected.has(s.id));
  const needsMCAT = selectedSchools.some(s => s.requiresMCAT);
  const needsCasper = selectedSchools.some(s => s.requiresCasper);
  const snapshotSchools = selectedSchools.filter(s => s.requiresSnapshot);
  const duetSchools = selectedSchools.filter(s => s.requiresDuet);

  const feeRows = useMemo(() => {
    const rows: { label: string; desc: string; amount: number; note?: string }[] = [];

    rows.push({
      label: 'OMSAS Application',
      desc: 'Application service fee (all Ontario applicants)',
      amount: OMSAS_BASE_FEE,
    });

    if (selected.size > 0) {
      const schoolFeesTotal = selectedSchools.reduce(
        (sum, s) => sum + (s.designationFee ?? OMSAS_PER_SCHOOL),
        0
      );
      const allSameRate = selectedSchools.every(
        (s) => (s.designationFee ?? OMSAS_PER_SCHOOL) === OMSAS_PER_SCHOOL
      );
      const desc = allSameRate
        ? `${selected.size} school${selected.size !== 1 ? 's' : ''} × $${OMSAS_PER_SCHOOL}`
        : selectedSchools
            .map((s) => `${s.abbr} $${s.designationFee ?? OMSAS_PER_SCHOOL}`)
            .join(' + ');
      rows.push({
        label: 'OMSAS School Fees',
        desc,
        amount: schoolFeesTotal,
      });
    }

    if (needsMCAT && includeMCAT) {
      rows.push({
        label: 'MCAT Registration',
        desc: `AAMC exam fee ($${MCAT_FEE_USD} USD, 2024 rate)`,
        amount: MCAT_FEE_CAD,
        note: '~CAD at 1.37',
      });
    }

    if (needsCasper && includeCasper) {
      rows.push({
        label: 'CASPer',
        desc: 'Altus Suite test fee (one-time)',
        amount: CASPER_FEE,
      });

      const casperSchools = selectedSchools.filter(s => s.requiresCasper);
      rows.push({
        label: 'CASPer Distribution',
        desc: `${casperSchools.length} school${casperSchools.length !== 1 ? 's' : ''} × $${CASPER_DIST_FEE} (${casperSchools.map(s => s.abbr).join(', ')})`,
        amount: casperSchools.length * CASPER_DIST_FEE,
      });

      if (snapshotSchools.length > 0) {
        rows.push({
          label: 'Snapshot',
          desc: `${snapshotSchools.length} program${snapshotSchools.length !== 1 ? 's' : ''} × $${SNAPSHOT_FEE} (${snapshotSchools.map(s => s.abbr).join(', ')})`,
          amount: snapshotSchools.length * SNAPSHOT_FEE,
        });
      }

      if (duetSchools.length > 0) {
        rows.push({
          label: 'Duet',
          desc: `${duetSchools.length} program${duetSchools.length !== 1 ? 's' : ''} × $${DUET_FEE} (${duetSchools.map(s => s.abbr).join(', ')})`,
          amount: duetSchools.length * DUET_FEE,
        });
      }
    }

    return rows;
  }, [selected, needsMCAT, needsCasper, includeMCAT, includeCasper, snapshotSchools, duetSchools]);

  const mcatPrepCost = MCAT_PREP_OPTIONS.find(o => o.value === mcatPrep)?.cost ?? 0;

  const optionalItems = [
    mcatPrepCost > 0 ? mcatPrepCost : 0,
    includeTranscripts ? transcriptCount * TRANSCRIPT_FEE_EST : 0,
    includeCasperPrep ? 50 : 0,
    includeBackground ? 50 : 0,
  ];

  const requiredTotal = feeRows.reduce((s, r) => s + r.amount, 0);
  const optionalTotal = optionalItems.reduce((a, b) => a + b, 0);
  const grandTotal = requiredTotal + optionalTotal;

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Required Fees', amount: requiredTotal, sub: 'OMSAS + tests', accent: false },
          { label: 'Prep & Other', amount: optionalTotal, sub: 'Optional costs', accent: false },
          { label: 'Total Estimate', amount: grandTotal, sub: 'All selected costs', accent: true },
        ].map(card => (
          <div
            key={card.label}
            className={`rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] px-4 py-3 ${card.accent ? 'bg-[#0f1f3d]' : 'bg-white'}`}
          >
            <div className={`text-[10px] font-bold uppercase tracking-[0.06em] mb-[3px] ${card.accent ? 'text-[#7dd3fc]' : 'text-[#6b7280]'}`}>
              {card.label}
            </div>
            <div className={`text-[22px] font-bold leading-none ${card.accent ? 'text-white' : 'text-[#111827]'}`}>
              {fmt(card.amount)}
            </div>
            <div className={`text-[11px] mt-[5px] ${card.accent ? 'text-[#7dd3fc]/70' : 'text-[#9ca3af]'}`}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* School Selection */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb]">
          <h2 className="text-[16px] font-bold text-[#111827]">Schools You're Applying To</h2>
          <p className="text-[12px] text-[#6b7280] mt-[3px]">
            Select each school to add its OMSAS designation fee and see which tests are required.
          </p>
        </div>
        <div className="p-[18px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SCHOOL_FEES.map(school => {
            const isSelected = selected.has(school.id);
            return (
              <button
                key={school.id}
                onClick={() => toggle(school.id)}
                className={`flex items-start gap-3 p-3 rounded-[10px] border-[1.5px] text-left transition-all duration-150 cursor-pointer w-full ${
                  isSelected
                    ? 'border-[#0f1f3d] bg-[#f0f4ff]'
                    : 'border-[#e5e7eb] bg-white hover:bg-[#f9fafb]'
                }`}
              >
                {/* Checkbox */}
                <div className={`flex-shrink-0 mt-[1px] w-[16px] h-[16px] rounded-[4px] border-[2px] flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-[#0f1f3d] border-[#0f1f3d]' : 'border-[#d1d5db] bg-white'
                }`}>
                  {isSelected && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[7px] mb-[5px]">
                    <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: school.color }} />
                    <span className="text-[13px] font-bold text-[#111827] leading-snug">{school.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {school.requiresMCAT && (
                      <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] bg-[#eff6ff] text-[#1d4ed8]">MCAT</span>
                    )}
                    {school.requiresCasper && (
                      <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] bg-[#f0fdf4] text-[#166534]">CASPer</span>
                    )}
                    {school.requiresSnapshot && (
                      <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] bg-[#faf5ff] text-[#6b21a8]">Snapshot</span>
                    )}
                    {school.requiresDuet && (
                      <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] bg-[#fff7ed] text-[#9a3412]">Duet</span>
                    )}
                    {!school.requiresMCAT && !school.requiresCasper && (
                      <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] bg-[#f3f4f6] text-[#6b7280]">No MCAT · No CASPer</span>
                    )}
                  </div>
                </div>

                <div className="text-[12px] font-bold text-[#6b7280] flex-shrink-0 mt-[1px]">
                  ${OMSAS_PER_SCHOOL} / school
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Required Fee Breakdown */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-[16px] font-bold text-[#111827]">Required Application Fees</h2>
            <p className="text-[12px] text-[#6b7280] mt-[3px]">
              Mandatory costs for the Ontario medical school application cycle.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            {needsMCAT && (
              <label className="flex items-center gap-[7px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMCAT}
                  onChange={e => setIncludeMCAT(e.target.checked)}
                  className="w-[14px] h-[14px] accent-[#0f1f3d]"
                />
                <span className="text-[12px] text-[#6b7280] whitespace-nowrap">Include MCAT</span>
              </label>
            )}
            {needsCasper && (
              <label className="flex items-center gap-[7px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCasper}
                  onChange={e => setIncludeCasper(e.target.checked)}
                  className="w-[14px] h-[14px] accent-[#0f1f3d]"
                />
                <span className="text-[12px] text-[#6b7280] whitespace-nowrap">Include CASPer</span>
              </label>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Fee', 'Description', 'Amount (CAD)'].map(h => (
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
              {feeRows.map((row, i) => (
                <tr
                  key={row.label}
                  className="hover:bg-[#f9fafb]"
                  style={{ borderBottom: i < feeRows.length - 1 ? '1px solid #e5e7eb' : 'none' }}
                >
                  <td className="px-4 py-[12px] text-[13px] font-bold text-[#111827] align-middle whitespace-nowrap">
                    {row.label}
                  </td>
                  <td className="px-4 py-[12px] text-[12px] text-[#6b7280] align-middle">
                    {row.desc}
                    {row.note && (
                      <span className="ml-2 text-[10px] bg-[#f3f4f6] px-[5px] py-[2px] rounded-[4px] text-[#6b7280]">
                        {row.note}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-[12px] text-[14px] font-bold text-[#111827] align-middle whitespace-nowrap">
                    {fmt(row.amount)}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#f9fafb]">
                <td colSpan={2} className="px-4 py-[12px] text-[13px] font-bold text-[#111827] align-middle">
                  Subtotal
                </td>
                <td className="px-4 py-[12px] text-[15px] font-bold text-[#0f1f3d] align-middle whitespace-nowrap">
                  {fmt(requiredTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-[22px] py-[13px] border-t border-[#e5e7eb]">
          <p className="text-[11px] text-[#9ca3af] leading-[1.6]">
            OMSAS fees reflect the 2025–26 cycle. Verify current amounts at omsas.ca before applying.
            MCAT shown in CAD using an approximate exchange rate; actual cost varies with the USD/CAD rate.
            CASPer base fee ($85) covers unlimited program distributions. Snapshot and Duet are per-program add-ons required by McMaster.
          </p>
        </div>
      </div>

      {/* Optional & Prep Costs */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-7">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb]">
          <h2 className="text-[16px] font-bold text-[#111827]">Prep &amp; Additional Costs</h2>
          <p className="text-[12px] text-[#6b7280] mt-[3px]">
            Toggle to include optional costs in your total estimate.
          </p>
        </div>

        <div className="divide-y divide-[#e5e7eb]">
          {/* MCAT Prep */}
          <div className="px-[22px] py-[14px] flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <div className="text-[13px] font-bold text-[#111827]">MCAT Prep Materials</div>
              <div className="text-[11px] text-[#9ca3af] mt-[2px]">Study books, courses, and practice exams</div>
            </div>
            <select
              value={mcatPrep}
              onChange={e => setMcatPrep(e.target.value as MCATPrep)}
              className="text-[12px] border border-[#e5e7eb] rounded-[6px] px-2 py-[5px] bg-white text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
            >
              {MCAT_PREP_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}{o.cost > 0 ? ` (~$${o.cost.toLocaleString()})` : ''}
                </option>
              ))}
            </select>
            <div className="text-[14px] font-bold text-[#111827] w-[70px] text-right">
              {mcatPrepCost > 0 ? fmt(mcatPrepCost) : <span className="text-[#d1d5db]">—</span>}
            </div>
          </div>

          {/* Transcripts */}
          <div className="px-[22px] py-[14px] flex items-center gap-4 flex-wrap">
            <input
              type="checkbox"
              checked={includeTranscripts}
              onChange={e => setIncludeTranscripts(e.target.checked)}
              className="w-[14px] h-[14px] accent-[#0f1f3d] flex-shrink-0"
            />
            <div className="flex-1 min-w-[180px]">
              <div className="text-[13px] font-bold text-[#111827]">Official Transcripts</div>
              <div className="text-[11px] text-[#9ca3af] mt-[2px]">Required from each previously attended institution (~$15 est. each)</div>
            </div>
            {includeTranscripts && (
              <Stepper value={transcriptCount} onChange={setTranscriptCount} min={1} max={8} />
            )}
            <div className="text-[14px] font-bold text-[#111827] w-[70px] text-right">
              {includeTranscripts ? fmt(transcriptCount * TRANSCRIPT_FEE_EST) : <span className="text-[#d1d5db]">—</span>}
            </div>
          </div>

          {/* CASPer Prep */}
          <div className="px-[22px] py-[14px] flex items-center gap-4 flex-wrap">
            <input
              type="checkbox"
              checked={includeCasperPrep}
              onChange={e => setIncludeCasperPrep(e.target.checked)}
              className="w-[14px] h-[14px] accent-[#0f1f3d] flex-shrink-0"
            />
            <div className="flex-1 min-w-[180px]">
              <div className="text-[13px] font-bold text-[#111827]">CASPer Prep Resources</div>
              <div className="text-[11px] text-[#9ca3af] mt-[2px]">Practice scenarios, sample questions, and guides (~$50 est.)</div>
            </div>
            <div className="text-[14px] font-bold text-[#111827] w-[70px] text-right">
              {includeCasperPrep ? fmt(50) : <span className="text-[#d1d5db]">—</span>}
            </div>
          </div>

          {/* Background Check */}
          <div className="px-[22px] py-[14px] flex items-center gap-4 flex-wrap">
            <input
              type="checkbox"
              checked={includeBackground}
              onChange={e => setIncludeBackground(e.target.checked)}
              className="w-[14px] h-[14px] accent-[#0f1f3d] flex-shrink-0"
            />
            <div className="flex-1 min-w-[180px]">
              <div className="text-[13px] font-bold text-[#111827]">Background Check</div>
              <div className="text-[11px] text-[#9ca3af] mt-[2px]">Required at some schools upon acceptance (~$50 est.)</div>
            </div>
            <div className="text-[14px] font-bold text-[#111827] w-[70px] text-right">
              {includeBackground ? fmt(50) : <span className="text-[#d1d5db]">—</span>}
            </div>
          </div>
        </div>

        <div className="px-[22px] py-[13px] border-t border-[#e5e7eb]">
          <p className="text-[11px] text-[#9ca3af] leading-[1.6]">
            Prep costs are approximate; actual prices vary widely by provider and year.
            Interview travel assumes one overnight stay within Ontario; adjust for your situation.
            All figures are for planning purposes only. Verify fees directly with each school and service provider.
          </p>
        </div>
      </div>
    </div>
  );
}
