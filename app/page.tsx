import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { AboutPreview } from '@/components/home/AboutPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { DifferentialsSection } from '@/components/home/DifferentialsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ImpactSection } from '@/components/home/ImpactSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { CTASection } from '@/components/home/CTASection';
import { ContactSection } from '@/components/home/ContactSection';

/**
 * Home — funil completo: atrair → apresentar → provar → converter.
 * Ordem definida na especificação (seções com função de negócio clara).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesSection />
      <DifferentialsSection />
      <ProjectsSection />
      <ImpactSection />
      <ProcessSection />
      <CTASection />
      <ContactSection />
    </>
  );
}