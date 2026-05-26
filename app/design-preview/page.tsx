import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const features = [
  { title: "School Requirements", desc: "Searchable database of all 17 Canadian MD programs — GPA cutoffs, MCAT, prerequisites, and more." },
  { title: "GPA Calculator", desc: "Calculate your wGPA for schools like UofT and Western that drop your worst years." },
  { title: "CASPer Prep Guide", desc: "Practice scenarios and strategies written by students who aced it." },
  { title: "Cost Calculator", desc: "Estimate total application costs including OMSAS, CASPer, and interview travel." },
  { title: "Reference Letter Tracker", desc: "Track your referees, deadlines, and submission status in one place." },
];

function MockSite({
  fontClass,
  palette,
  label,
}: {
  fontClass: string;
  palette: {
    bg: string;
    primary: string;
    primaryText: string;
    accent: string;
    text: string;
    muted: string;
    cardBg: string;
    border: string;
    navBg: string;
    badge: string;
    badgeText: string;
  };
  label: string;
}) {
  return (
    <div className={fontClass} style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* Label */}
      <div style={{ backgroundColor: palette.primary, color: palette.primaryText }} className="text-center py-2 text-sm font-semibold tracking-wider uppercase">
        {label}
      </div>

      {/* Header */}
      <header style={{ backgroundColor: palette.navBg, borderBottom: `1px solid ${palette.border}` }} className="sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ backgroundColor: palette.primary }} className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span style={{ color: palette.primaryText }} className="text-sm font-bold">P</span>
            </div>
            <span style={{ color: palette.text }} className="font-bold text-lg">PremedPlan</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: palette.muted }}>
            <a href="#" style={{ color: palette.muted }} className="hover:opacity-80">Schools</a>
            <a href="#" style={{ color: palette.muted }} className="hover:opacity-80">GPA Calc</a>
            <a href="#" style={{ color: palette.muted }} className="hover:opacity-80">CASPer</a>
            <a href="#" style={{ color: palette.muted }} className="hover:opacity-80">Costs</a>
            <a href="#" style={{ color: palette.muted }} className="hover:opacity-80">References</a>
          </nav>
          <button
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div
          style={{ backgroundColor: palette.badge, color: palette.badgeText, border: `1px solid ${palette.accent}` }}
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
        >
          Built for Canadian pre-med students
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl mx-auto" style={{ color: palette.text }}>
          Navigate your Canadian med school application — without the chaos
        </h1>
        <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: palette.muted }}>
          All 17 MD programs. One place. Track requirements, calculate your GPA, and prep smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            style={{ backgroundColor: palette.primary, color: palette.primaryText }}
            className="px-6 py-3 rounded-xl font-semibold text-base"
          >
            Explore Schools
          </button>
          <button
            style={{ border: `1.5px solid ${palette.border}`, color: palette.text, backgroundColor: "transparent" }}
            className="px-6 py-3 rounded-xl font-semibold text-base"
          >
            Calculate GPA
          </button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: palette.text }}>Everything you need to apply</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              style={{ backgroundColor: palette.cardBg, border: `1px solid ${palette.border}` }}
              className="rounded-2xl p-6"
            >
              <div
                style={{ backgroundColor: palette.badge, color: palette.badgeText }}
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg font-bold"
              >
                ✦
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: palette.text }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: palette.muted }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function DesignPreview() {
  const optionA = {
    bg: "#fafaf9",
    primary: "#0f766e",
    primaryText: "#ffffff",
    accent: "#d97706",
    text: "#1c1917",
    muted: "#78716c",
    cardBg: "#ffffff",
    border: "#e7e5e4",
    navBg: "#ffffff",
    badge: "#f0fdfa",
    badgeText: "#0f766e",
  };

  const optionB = {
    bg: "#f8fafc",
    primary: "#3730a3",
    primaryText: "#ffffff",
    accent: "#0284c7",
    text: "#0f172a",
    muted: "#64748b",
    cardBg: "#ffffff",
    border: "#e2e8f0",
    navBg: "#ffffff",
    badge: "#eef2ff",
    badgeText: "#3730a3",
  };

  return (
    <div>
      <MockSite fontClass={jakarta.className} palette={optionA} label="Option A — Forest & Stone (Plus Jakarta Sans)" />
      <div style={{ height: "2px", backgroundColor: "#000" }} />
      <MockSite fontClass={inter.className} palette={optionB} label="Option B — Slate & Sky (Inter)" />
    </div>
  );
}
