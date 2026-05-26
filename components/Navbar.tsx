const TABS = [
  { label: 'School Requirements', active: true },
  { label: 'GPA Calculator', active: false },
  { label: 'Cost Calculator', active: false },
  { label: 'Policy Change Tracker', active: false },
  { label: 'Reference Letter Template', active: false },
  { label: 'Free Resources', active: false },
  { label: 'Personal Story', active: false },
];

export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-center px-6"
      style={{ background: '#0f1f3d', height: '44px' }}
    >
      <div className="flex items-center gap-8">
        {TABS.map((tab) => (
          <a
            key={tab.label}
            href="#"
            className="text-[13px] font-medium text-white transition-colors duration-200 hover:text-[#7dd3fc] whitespace-nowrap"
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
    </nav>
  );
}
