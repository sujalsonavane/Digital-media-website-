import HeroSection from '@/components/agency/HeroSection';
import { StatementSection } from '@/components/agency/StatementSection';
import { ProjectsSection } from '@/components/agency/ProjectsSection';
import { ArchiveSection } from '@/components/agency/ArchiveSection';
import { ServicesSection } from '@/components/agency/ServicesSection';
import { EnquirySection } from '@/components/agency/EnquirySection';
import { FooterSection } from '@/components/agency/FooterSection';
import WhatsAppButton from '@/components/agency/WhatsAppButton';

export default function Home() {
  return (
    <div className="page-frame min-h-screen">
      {/* 1. Hero Panel & Navigation */}
      <HeroSection />

      {/* 2. Positioning & Statement Panel */}
      <StatementSection />

      {/* 3. Featured Client Projects Showcase */}
      <ProjectsSection />

      {/* 4. Interactive Historical Archive */}
      <ArchiveSection />

      {/* 5. Services Stack (4 Approved Disciplines) */}
      <ServicesSection />

      {/* 6. Client Enquiry & Interaction Band */}
      <EnquirySection />

      {/* 7. Studio Footer */}
      <FooterSection />

      {/* 8. Floating Direct WhatsApp Interaction */}
      <WhatsAppButton />
    </div>
  );
}
