'use client';

import { useState, useMemo } from 'react';

interface EmailForm {
  yourName: string;
  refereeName: string;
  refereeTitle: string;
  howYouKnowThem: string;
  highlights: string;
  deadline: string;
}

function generateEmail(f: EmailForm): string {
  const name = f.yourName || '[Your Name]';
  const refFirst = f.refereeName.split(' ')[0] || '[Referee First Name]';
  const salutation = f.refereeTitle && f.refereeName
    ? `${f.refereeTitle} ${f.refereeName}`
    : f.refereeName || '[Referee Name]';
  const knowing = f.howYouKnowThem || '[describe your relationship, e.g. "worked in your research lab during the 2024–25 academic year"]';
  const highlights = f.highlights || '[describe what experiences or qualities you hope they can speak to]';
  const deadline = f.deadline || '[application deadline date]';

  return `Subject: Reference Letter Request | ${name} | Ontario Medical School Application

Dear ${salutation},

I hope this message finds you well. My name is ${name}, and I had the pleasure of ${knowing}.

I am writing to ask if you would be willing and able to write a strong letter of reference on my behalf. I am applying to Ontario medical schools through OMSAS for the upcoming admissions cycle, with letters due by ${deadline}.

I chose to ask you specifically because ${highlights}.

If you are able to support my application, I would be happy to provide you with any materials that would be helpful, including:

  • My personal statement and CV
  • A summary of experiences I hope you can speak to
  • Unofficial transcripts and course list
  • The OMSAS referee submission portal link and instructions

Letters are submitted confidentially and directly through the OMSAS Electronic Matching System. I can send you a step-by-step guide once you confirm.

Please don't hesitate to reach out if you have any questions. And if you are unable to write the letter at this time, I completely understand. Just let me know and I will make other arrangements.

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
  const [email, setEmail] = useState<EmailForm>({
    yourName: '', refereeName: '', refereeTitle: '', howYouKnowThem: '', highlights: '', deadline: '',
  });

  const generatedEmail = useMemo(() => generateEmail(email), [email]);

  const inputCls = 'w-full text-[13px] border border-[#e5e7eb] rounded-[7px] px-3 py-[7px] bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc] placeholder:text-[#d1d5db]';
  const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.05em] text-[#6b7280] mb-[5px]';

  return (
    <div>
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
          <span className="text-[11px] font-semibold text-[#6b7280] bg-[#f3f4f6] px-2 py-[3px] rounded-[5px]">2025–26 cycle</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e7eb]">
          {[
            {
              title: 'Requirements',
              points: [
                'Exactly 3 reference letters required',
                'Letters are fully confidential (you cannot view them)',
                'Individual schools may specify required referee types (academic, professional, personal)',
                'Check each school\'s requirements; some prefer 2+ academic referees',
              ],
            },
            {
              title: 'Submission Process',
              points: [
                'Referees submit directly through the OMSAS EMS (Electronic Matching System)',
                'You enter referee contact info in your OMSAS application',
                'OMSAS sends referees an automatic invitation link',
                'Letters must be received by the application deadline. Confirm this with your referees early',
              ],
            },
            {
              title: 'Timeline Tips',
              points: [
                'Ask referees at least 2–3 months before the deadline',
                'Send a follow-up 4–6 weeks before the deadline to confirm',
                'Provide your CV, personal statement draft, and a note on key experiences',
                'OMSAS applications typically open in July. Aim to have referees confirmed by August',
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
            Requirements are for the OMSAS Ontario application cycle. Verify current details at ouac.on.ca/omsas and with each school's admissions office before applying.
          </p>
        </div>
      </div>
    </div>
  );
}
