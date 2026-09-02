import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectCard } from '@/components/home/ProjectsSection';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Obras e instalações executadas pela VART Soluções em Luanda — canalização, eletrobombas, piscinas e manutenção técnica.',
  alternates: { canonical: '/projetos' },
};

/**
 * /projetos — galeria editorial dos trabalhos executados.
 */
export default function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow='Projetos'
        title='Trabalhos executados com comprovação.'
        description='Uma seleção de obras e instalações da VART Soluções. Qualidade acima de quantidade.'
      />

      <Container className='py-20 md:py-28'>
        <div className='grid gap-6 md:grid-cols-2'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              aspect='aspect-[16/11]'
              sizes='(min-width: 768px) 46vw, 92vw'
              priority={index < 2}
            />
          ))}
        </div>
      </Container>
    </>
  );
}