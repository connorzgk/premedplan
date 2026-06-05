const sources = [
  {
    label: 'UofT — Academic Requirements',
    href: 'https://applymd.utoronto.ca/academic-requirements',
  },
  {
    label: 'McMaster — Admissions',
    href: 'https://ugme.healthsci.mcmaster.ca/admissions/',
  },
  {
    label: 'Western Schulich — Requirements',
    href: 'https://www.schulich.uwo.ca/med-dent-admissions/medicine/admission-requirements.html',
  },
  {
    label: "Queen's — MD Admissions",
    href: 'https://meds.queensu.ca/academics/mdprogram/admissions',
  },
  {
    label: 'uOttawa — Application Process',
    href: 'https://www.uottawa.ca/faculty-medicine/undergraduate/application-process',
  },
  {
    label: 'TMU — MD Admission Requirements',
    href: 'https://www.torontomu.ca/school-of-medicine/programs/md/md-admissions/before-you-apply/admission-requirements/',
  },
  {
    label: 'NOSM U — MD Admissions',
    href: 'https://www.nosm.ca/nosm-university-admissions-learner-recruitment/ume-program-md-degree-admissions/',
  },
  {
    label: 'OMSAS Program Requirements Overview',
    href: 'https://www.ouac.on.ca/guide/omsas-program-requirements/',
  },
];

export default function Sources() {
  return (
    <div className="bg-white rounded-[14px] px-[22px] py-5 shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] mb-8">
      <h3 className="text-[13px] font-bold mb-[13px] text-[#6b7280] uppercase tracking-[0.06em]">
        Sources
      </h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[7px]">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#2563eb] no-underline flex items-center gap-[5px] py-1 hover:underline"
          >
            ↗ {source.label}
          </a>
        ))}
      </div>
    </div>
  );
}
