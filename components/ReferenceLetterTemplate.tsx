'use client';

import { useState, useMemo } from 'react';

type RefereeStatus = 'not-asked' | 'asked' | 'confirmed' | 'submitted';
type RefereeType = 'academic' | 'professional' | 'personal' | '';

interface Referee {
  id: string;
  name: string;
  title: string;
  institution: string;
  type: RefereeType;
  status: RefereeStatus;
  notes: string;
}

interface EmailForm {
  yourName: string;
  refereeName: string;
  refereeTitle: string;
  howYouKnowThem: string;
  highlights: string;
  deadline: string;
}

const STATUS_META: Record<RefereeStatus, { label: string; bg: string; text: string; dot: string }> = {
  'not-asked': { label: 'Not Asked',  bg: '#f3f4f6', text: '#6b7280', dot: '#d1d5db' },
  'asked':     { label: 'Asked',      bg: '#fffbeb', text: '#92400e', dot: '#f59e0b' },
  'confirmed': { label: 'Confirmed',  bg: '#eff6ff', text: '#1e40af', dot: '#3b82f6' },
  'submitted': { label: 'Submitted',  bg: '#f0fdf4', text: '#166534', dot: '#22c55e' },
};

function makeReferee(): Referee {
  return {
    id: Math.random().toString(36).slice(2, 9),
    name: '', title: '', institution: '', type: '', status: 'not-asked', notes: '',
  };
}

function generateEmail(f: EmailForm): string {
  const name = f.yourName || '[Your Name]';
  const refFirst = f.refereeName.split(' ')[0] || '[Referee First Name]';
  const salutation = f.refereeTitle && f.refereeName
    ? `${f.refereeTitle} ${f.refereeName}`
    : f.refereeName || '[Referee Name]';
  const knowing = f.howYouKnowThem || '[describe your relationship — e.g. "worked in your research lab during the 2024–25 academic year"]';
  const highlights = f.highlights || '[describe what experiences or qualities you hope they can speak to]';
  const deadline = f.deadline || '[application deadline date]';

  return `Subject: Reference Letter Request — ${name} — Ontario Medical School Application

Dear ${salutation},

I hope this message finds you well. My name is ${name}, and I had the pleasure of ${knowing}.

I am writing to ask if you would be willing and able to write a strong letter of reference on my behalf. I am applying to Ontario medical schools through OMSAS for the upcoming admissions cycle, with letters due by ${deadline}.

I chose to ask you specifically because ${highlights}.

If you are able to support my application, I would be happy to provide you with any materials that would be helpful, including:

  • My personal statement and CV
  • A summary of experiences I hope you can speak to
  • Unofficial transcripts and course list
  • The OMSAS referee submission portal link and instructions

Letters are submitted confidentially and directly through the OMSAS Electronic Matching System — I can send you a step-by-step guide once you confirm.

Please don't hesitate to reach out if you have any questions. And if you are unable to write the letter at this time, I completely understand — just let me know and I will make other arrangements.

Thank you so much for your time and for everything you have done for me. I am truly grateful for your support.

Warm regards,
${name}
[Email Address]
[Phone Number]`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-[12px] font-semibold px-3 py-[6px] rounded-[7px] border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f3f4f6] transition-colors"
    >
      {copied ? '✓ Copied' : 'Copy to clipboard'}
    </button>
  );
}

export default function ReferenceLetterTemplate() {
  const [referees, setReferees] = useState<Referee[]>([makeReferee(), makeReferee(), makeReferee()]);
  const [email, setEmail] = useState<EmailForm>({
    yourName: '', refereeName: '', refereeTitle: '', howYouKnowThem: '', highlights: '', deadline: '',
  });

  const updateReferee = (id: string, patch: Partial<Referee>) =>
    setReferees(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  const removeReferee = (id: string) =>
    setReferees(prev => prev.filter(r => r.id !== id));

  const statusCounts = useMemo(() => ({
    submitted: referees.filter(r => r.status === 'submitted').length,
    confirmed: referees.filter(r => r.status === 'confirmed').length,
    asked: referees.filter(r => r.status === 'asked').length,
  }), [referees]);

  const generatedEmail = useMemo(() => generateEmail(email), [email]);

  const inputCls = 'w-full text-[13px] border border-[#e5e7eb] rounded-[7px] px-3 py-[7px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] placeholder:text-[#d1d5db]';
  const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.05em] text-[#6b7280] mb-[5px]';

  return (
    <div>
      {/* Progress summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Submitted',  count: statusCounts.submitted, total: referees.length, dot: '#22c55e', bg: 'bg-white' },
          { label: 'Confirmed',  count: statusCounts.confirmed, total: referees.length, dot: '#3b82f6', bg: 'bg-white' },
          { label: 'Asked',      count: statusCounts.asked,     total: referees.length, dot: '#f59e0b', bg: 'bg-white' },
        ].map(card => (
          <div key={card.label} className={`${card.bg} rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.07)] px-4 py-3`}>
            <div className="flex items-center gap-[6px] mb-[3px]">
              <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: card.dot }} />
              <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280]">{card.label}</div>
            </div>
            <div className="text-[22px] font-bold text-[#111827] leading-none">{card.count} <span className="text-[15px] font-medium text-[#9ca3af]">/ {card.total}</span></div>
          </div>
        ))}
      </div>

      {/* Referee Tracker */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[16px] font-bold text-[#111827]">Referee Tracker</h2>
            <p className="text-[12px] text-[#6b7280] mt-[3px]">
              OMSAS requires 3 confidential reference letters. Track each referee's status here.
            </p>
          </div>
          <button
            onClick={() => setReferees(prev => [...prev, makeReferee()])}
            className="text-[12px] font-semibold text-[#0f1f3d] hover:text-[#264070] border border-[#e5e7eb] rounded-[8px] px-3 py-[6px] hover:bg-[#f9fafb] transition-colors whitespace-nowrap flex-shrink-0"
          >
            + Add Referee
          </button>
        </div>

        <div className="divide-y divide-[#e5e7eb]">
          {referees.map((ref, i) => {
            const sm = STATUS_META[ref.status];
            return (
              <div key={ref.id} className="px-[22px] py-[18px]">
                {/* Row header */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[26px] h-[26px] rounded-full bg-[#0f1f3d] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-[13px] font-bold text-[#111827]">
                      {ref.name || `Referee ${i + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-bold px-[8px] py-[3px] rounded-[5px] flex items-center gap-[5px]"
                      style={{ background: sm.bg, color: sm.text }}
                    >
                      <span className="w-[6px] h-[6px] rounded-full inline-block" style={{ background: sm.dot }} />
                      {sm.label}
                    </span>
                    {referees.length > 3 && (
                      <button
                        onClick={() => removeReferee(ref.id)}
                        className="text-[#9ca3af] hover:text-[#ef4444] transition-colors text-[18px] leading-none"
                        aria-label="Remove referee"
                      >×</button>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Dr. Jane Smith"
                      value={ref.name}
                      onChange={e => updateReferee(ref.id, { name: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Title / Role</label>
                    <input
                      type="text"
                      placeholder="Associate Professor"
                      value={ref.title}
                      onChange={e => updateReferee(ref.id, { title: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Institution</label>
                    <input
                      type="text"
                      placeholder="University of Toronto"
                      value={ref.institution}
                      onChange={e => updateReferee(ref.id, { institution: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Type</label>
                    <select
                      value={ref.type}
                      onChange={e => updateReferee(ref.id, { type: e.target.value as RefereeType })}
                      className={inputCls}
                    >
                      <option value="">Select type…</option>
                      <option value="academic">Academic</option>
                      <option value="professional">Professional</option>
                      <option value="personal">Personal / Character</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-3">
                  <div>
                    <label className={labelCls}>Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Research supervisor, BIO301 instructor, contacted Oct 3…"
                      value={ref.notes}
                      onChange={e => updateReferee(ref.id, { notes: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select
                      value={ref.status}
                      onChange={e => updateReferee(ref.id, { status: e.target.value as RefereeStatus })}
                      className={inputCls}
                    >
                      <option value="not-asked">Not Asked</option>
                      <option value="asked">Asked</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="submitted">Submitted</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Request Email Generator */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb]">
          <h2 className="text-[16px] font-bold text-[#111827]">Request Email Generator</h2>
          <p className="text-[12px] text-[#6b7280] mt-[3px]">
            Fill in the fields to generate a professional reference request email. Edit the preview directly before copying.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#e5e7eb]">
          {/* Form */}
          <div className="p-[22px] space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Your Name</label>
                <input type="text" placeholder="Alex Johnson" value={email.yourName}
                  onChange={e => setEmail(f => ({ ...f, yourName: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Referee Name</label>
                <input type="text" placeholder="Dr. Jane Smith" value={email.refereeName}
                  onChange={e => setEmail(f => ({ ...f, refereeName: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Referee Title / Honorific</label>
              <input type="text" placeholder="Dr. / Professor / Mr. / Ms." value={email.refereeTitle}
                onChange={e => setEmail(f => ({ ...f, refereeTitle: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>How you know them</label>
              <input type="text"
                placeholder="worked in your lab during the 2024–25 year / was in your BIO301 lecture"
                value={email.howYouKnowThem}
                onChange={e => setEmail(f => ({ ...f, howYouKnowThem: e.target.value }))}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Why you chose them / what you hope they highlight</label>
              <textarea
                rows={3}
                placeholder="you witnessed my growth as a researcher and can speak to my analytical thinking and work ethic…"
                value={email.highlights}
                onChange={e => setEmail(f => ({ ...f, highlights: e.target.value }))}
                className={inputCls + ' resize-none'}
              />
            </div>
            <div>
              <label className={labelCls}>Application deadline</label>
              <input type="text" placeholder="October 1, 2025" value={email.deadline}
                onChange={e => setEmail(f => ({ ...f, deadline: e.target.value }))} className={inputCls} />
            </div>
          </div>

          {/* Preview */}
          <div className="p-[22px] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6b7280]">Preview</span>
              <CopyButton text={generatedEmail} />
            </div>
            <textarea
              value={generatedEmail}
              onChange={e => {/* read-only preview, but allow manual edits via direct state */}}
              readOnly
              rows={22}
              className="w-full flex-1 text-[12px] font-mono text-[#374151] border border-[#e5e7eb] rounded-[8px] p-3 bg-[#f9fafb] resize-none focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] leading-[1.7]"
            />
          </div>
        </div>
      </div>

      {/* OMSAS Requirements Guide */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-7">
        <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#111827]">OMSAS Reference Letter Guide</h2>
          <span className="text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px]">2024–25 cycle</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e7eb]">
          {[
            {
              title: 'Requirements',
              points: [
                'Exactly 3 reference letters required',
                'Letters are fully confidential — you cannot view them',
                'Individual schools may specify required referee types (academic, professional, personal)',
                'Check each school\'s requirements — some prefer 2+ academic referees',
              ],
            },
            {
              title: 'Submission Process',
              points: [
                'Referees submit directly through the OMSAS EMS (Electronic Matching System)',
                'You enter referee contact info in your OMSAS application',
                'OMSAS sends referees an automatic invitation link',
                'Letters must be received by the application deadline — confirm this with your referees early',
              ],
            },
            {
              title: 'Timeline Tips',
              points: [
                'Ask referees at least 2–3 months before the deadline',
                'Send a follow-up 4–6 weeks before the deadline to confirm',
                'Provide your CV, personal statement draft, and a note on key experiences',
                'OMSAS applications typically open in July — aim to have referees confirmed by August',
              ],
            },
          ].map(section => (
            <div key={section.title} className="px-[22px] py-[18px]">
              <div className="text-[13px] font-bold text-[#111827] mb-[10px]">{section.title}</div>
              <ul className="space-y-[7px]">
                {section.points.map(p => (
                  <li key={p} className="flex items-start gap-[8px]">
                    <span className="text-[#9ca3af] mt-[3px] flex-shrink-0 text-[10px]">●</span>
                    <span className="text-[12px] text-[#6b7280] leading-[1.6]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="px-[22px] py-[13px] border-t border-[#e5e7eb]">
          <p className="text-[11px] text-[#9ca3af] leading-[1.6]">
            Requirements are for the OMSAS Ontario application cycle — verify current details at ouac.on.ca/omsas and with each school's admissions office before applying.
          </p>
        </div>
      </div>
    </div>
  );
}
