import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'Ontario Medical School Requirements, GPA Calculator & Application Guide',
  description:
    'Compare GPA cutoffs, MCAT requirements, prerequisites, and application costs for all 7 Ontario MD programs: UofT, McMaster, Western, Queen\'s, uOttawa, TMU, and NOSM. Built for Canadian premed students.',
};

export default function Home() {
  return <HomeContent />;
}
