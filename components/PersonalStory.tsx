
const WHY_MEDICINE = `My path to medicine was shaped by personal experiences, a genuine love for biomedical science, and time spent in clinical and research settings during my undergrad. The combination of meaningful patient impact and the opportunity to keep learning is what draws me to it.`;

const WHY_BUILT = `The information premed students need is spread across individual school websites, hundred-page PDFs, Reddit threads, and word of mouth from people a year ahead of you. I spent a lot of time during my own application process piecing things together from a dozen different sources, and it felt like a problem worth solving. premedplan.ca is my attempt to put it all in one place: requirements, GPA calculators, cost breakdowns, policy changes, timelines, and more. If it saves someone a few hours of searching during an already stressful process, it's worth it.`;

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

export default function PersonalStory() {
  return (
    <div>
      {/* Hero intro card */}
      <div
        className="rounded-[14px] overflow-hidden mb-5 shadow-[0_4px_24px_rgba(15,31,61,0.18)]"
        style={{ background: 'linear-gradient(140deg, #0b1e3f 0%, #1a3a6b 60%, #1e4d8c 100%)' }}
      >
        <div className="px-[28px] pt-[28px] pb-[24px] flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-[72px] h-[72px] rounded-full border-2 border-white/25 overflow-hidden flex-shrink-0">
            <img src="/connor.jpg" alt="Connor" className="w-full h-full object-cover" style={{ objectPosition: '70% 20%' }} />
          </div>

          <div className="flex-1">
            <div className="text-[22px] font-extrabold text-white mb-[8px]">Personal Story</div>
            <p className="text-[13px] text-white/70 leading-[1.75] max-w-[580px]">
              Hi, I'm Connor. I recently completed my undergraduate degree in Pharmacology and Immunology at the University of Toronto.
              I'm applying to Ontario medical schools for the 2026–27 cycle. My interest in surgery has been growing
              throughout my degree, particularly cardiac surgery, though I'm keeping an open mind as I learn more.
            </p>
          </div>
        </div>

      </div>

      {/* Why Medicine */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-5">
        <div className="h-[3px] bg-[#fda4af]" />
        <div className="px-[28px] py-[18px] border-b border-[#e5e7eb]">
          <div className="flex items-center gap-[9px]">
            <span className="text-[#fb7185]"><HeartIcon /></span>
            <h2 className="text-[16px] font-bold text-[#111827]">Why Medicine</h2>
          </div>
        </div>
        <div className="px-[28px] py-[20px]">
          <p className="text-[13px] text-[#6b7280] leading-[1.75] max-w-[720px]">{WHY_MEDICINE}</p>
        </div>
      </div>

      {/* Why I built this */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-7">
        <div className="h-[3px] bg-[#a5b4fc]" />
        <div className="px-[28px] py-[18px] border-b border-[#e5e7eb]">
          <div className="flex items-center gap-[9px]">
            <span className="text-[#818cf8]"><LightbulbIcon /></span>
            <h2 className="text-[16px] font-bold text-[#111827]">Why I Built This</h2>
          </div>
        </div>
        <div className="px-[28px] py-[20px]">
          <p className="text-[13px] text-[#6b7280] leading-[1.75] max-w-[720px]">{WHY_BUILT}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] px-[28px] py-[20px] mb-7">
        <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#6b7280] mb-[10px]">Get in touch</p>
        <a
          href="mailto:connorzgk@gmail.com"
          className="text-[14px] font-semibold text-[#2563eb] hover:underline"
        >
          connorzgk@gmail.com
        </a>
      </div>
    </div>
  );
}
