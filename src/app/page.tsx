import HeroSection from '@/components/agency/HeroSection';
import { StatementSection } from '@/components/agency/StatementSection';
import TeamSection from '@/components/agency/TeamSection';
import { ProjectsSection } from '@/components/agency/ProjectsSection';
import TestimonialsSection from '@/components/agency/TestimonialsSection';
import { ArchiveSection } from '@/components/agency/ArchiveSection';
import { ServicesSection } from '@/components/agency/ServicesSection';
import { EnquirySection } from '@/components/agency/EnquirySection';
import { FooterSection } from '@/components/agency/FooterSection';
import WhatsAppButton from '@/components/agency/WhatsAppButton';

export default function Home() {
  return (
    <div className="page-frame min-h-screen">
      {/* 1. Hero Panel & Navigation with Sound Design */}
      <HeroSection />

      {/* 2. Positioning & Standard Statement Panel */}
      <StatementSection />

      {/* 3. "Our Team" Studio Collective & Principals */}
      <TeamSection />

      {/* 4. Featured Client Projects & Case Studies Showcase */}
      <ProjectsSection />

      {/* 5. Client Testimonials & Quantifiable Outcomes */}
      <TestimonialsSection />

      {/* 6. Live Clients Archive Table with Cursor-Following Previews */}
      <ArchiveSection />

      {/* 7. Services Stack (4 Approved Core Disciplines) */}
      <ServicesSection />

      {/* 8. Client Qualification & Direct Enquiry Band */}
      <EnquirySection />

      {/* 9. Studio Footer & Working Time */}
      <FooterSection />

      {/* 10. Floating Direct WhatsApp Interaction */}
      <WhatsAppButton />
    </div>
  );
}
