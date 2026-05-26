import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import SchoolsSection from '@/components/SchoolsSection';
import ComparisonTable from '@/components/ComparisonTable';
import Disclaimer from '@/components/Disclaimer';
import Sources from '@/components/Sources';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f0f2f7] text-[#111827]">
      <Navbar />
      <Header />
      <main className="max-w-[1260px] mx-auto px-6 pt-9 pb-4">
        <SchoolsSection />
        <ComparisonTable />
        <Disclaimer />
        <Sources />
      </main>
      <Footer />
    </div>
  );
}
