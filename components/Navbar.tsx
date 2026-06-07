const TAB_LABELS = [
  'School Requirements',
  'GPA Calculator',
  'Cost Calculator',
  'Policy Change Tracker',
  'Reference Letter Template',
  'Application Timeline',
  "Creator's Personal Story",
];

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <div className="sticky top-0 z-50">
      {/* Main bar — desktop only */}
      <nav
        className="hidden lg:flex w-full items-center justify-center px-6 bg-[#0f1f3d] hover:bg-[#264070] transition-colors duration-200"
        style={{ height: '44px' }}
      >
        <div className="flex items-center justify-between w-full max-w-[1320px]">
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
      </nav>

      {/* Mobile: always-visible stacked list */}
      <div className="lg:hidden bg-[#0f1f3d]">
        {TAB_LABELS.map((label) => (
          <button
            key={label}
            onClick={() => onTabChange(label)}
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
    </div>
  );
}
