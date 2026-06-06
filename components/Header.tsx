const stats = [
  { num: '7', lbl: 'Medical Schools' },
  { num: '1,217', lbl: 'Total Seats/Year' },
  { num: '3', lbl: 'No MCAT Required' },
  { num: '1', lbl: 'CARS Only' },
];

export default function Header() {
  return (
    <header
      className="text-white text-center px-6 pt-[52px] pb-[44px]"
      style={{ background: 'linear-gradient(140deg, #0b1e3f 0%, #1a3a6b 60%, #1e4d8c 100%)' }}
    >
      <div className="inline-flex items-center gap-[6px] bg-white/[0.12] border border-white/[0.22] rounded-[20px] px-[14px] py-[5px] text-[11px] font-bold tracking-[0.1em] uppercase mb-[18px]">
        <span className="badge-dot" />
        2026–2027 Cycle
      </div>

      <h1 className="font-extrabold tracking-[-0.025em] mb-3 leading-[1.15] text-[clamp(26px,5vw,44px)]">
        Ontario Pre-Med<br />Information Center
      </h1>

      <p className="text-[15px] opacity-[0.72] max-w-[480px] mx-auto mb-8 leading-[1.6]">
        Admissions requirements for all 7 Ontario MD programs: GPA, MCAT, and course prerequisites.
      </p>

      <div className="inline-flex bg-white/10 border border-white/[0.18] rounded-[12px] overflow-hidden flex-col min-[701px]:flex-row">
        {stats.map((stat, i) => (
          <div
            key={stat.lbl}
            className={`px-7 py-[14px] text-center ${
              i < stats.length - 1
                ? 'border-b border-white/[0.15] min-[701px]:border-b-0 min-[701px]:border-r min-[701px]:border-r-white/[0.15]'
                : ''
            }`}
          >
            <div className="text-[26px] font-extrabold leading-none mb-[3px]">{stat.num}</div>
            <div className="text-[10px] opacity-[0.58] uppercase tracking-[0.07em]">{stat.lbl}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
