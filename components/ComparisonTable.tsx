import { schools } from '@/lib/schools';
import type { School } from '@/lib/types';

function McatTag({ school }: { school: School }) {
  if (school.mcatStatus === 'no') {
    return (
      <span className="inline-block px-2 py-[2px] rounded-[5px] text-[11px] font-bold bg-[#dcfce7] text-[#166534]">
        Not Required
      </span>
    );
  }
  if (school.mcatStatus === 'cars') {
    return (
      <span className="inline-block px-2 py-[2px] rounded-[5px] text-[11px] font-bold bg-[#fef9c3] text-[#854d0e]">
        CARS Only
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-[2px] rounded-[5px] text-[11px] font-bold bg-[#fff7ed] text-[#c2410c]">
      Required
    </span>
  );
}

const HEADERS = [
  'School',
  'Program',
  'Min GPA',
  'Competitive GPA',
  'MCAT',
  'Min MCAT Threshold',
  'CASPer',
  'Seats (~)',
];

function CasperTag({ school }: { school: School }) {
  const required = school.prereqs.some((p) => p.toLowerCase().includes('casper'));
  return required ? (
    <span className="inline-block px-2 py-[2px] rounded-[5px] text-[11px] font-bold bg-[#fff7ed] text-[#c2410c]">
      Required
    </span>
  ) : (
    <span className="inline-block px-2 py-[2px] rounded-[5px] text-[11px] font-bold bg-[#dcfce7] text-[#166534]">
      Not Required
    </span>
  );
}

export default function ComparisonTable() {
  return (
    <div className="bg-white rounded-[14px] shadow-[0_1px_4px_rgba(0,0,0,0.07),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden mb-7">
      <div className="px-[22px] py-[18px] border-b border-[#e5e7eb] flex items-center justify-between">
        <h2 className="text-[16px] font-bold">At-a-Glance Comparison</h2>
        <span className="text-[12px] text-[#6b7280]">2025–2026 application cycle</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-[11px] text-[10px] font-bold uppercase tracking-[0.06em] text-[#6b7280] bg-[#f9fafb] border-b border-[#e5e7eb] text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schools.map((school, i) => (
              <tr
                key={school.id}
                className="hover:bg-[#f9fafb]"
                style={{
                  borderBottom: i < schools.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <td className="px-4 py-[13px] text-[13px] align-middle">
                  <div className="flex items-center gap-[9px]">
                    <div
                      className="w-[9px] h-[9px] rounded-full flex-shrink-0"
                      style={{ background: school.color }}
                    />
                    <strong className="font-bold">{school.name}</strong>
                  </div>
                </td>
                <td className="px-4 py-[13px] text-[13px] align-middle">{school.program}</td>
                <td className="px-4 py-[13px] text-[13px] align-middle">{school.gpa.min}</td>
                <td className="px-4 py-[13px] text-[13px] align-middle">{school.gpa.competitive}</td>
                <td className="px-4 py-[13px] text-[13px] align-middle">
                  <McatTag school={school} />
                </td>
                <td className="px-4 py-[13px] text-[12px] align-middle max-w-[220px]">
                  {school.mcatStatus !== 'no' ? school.mcat.min : '—'}
                </td>
                <td className="px-4 py-[13px] text-[13px] align-middle">
                  <CasperTag school={school} />
                </td>
                <td className="px-4 py-[13px] text-[13px] align-middle">{school.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
