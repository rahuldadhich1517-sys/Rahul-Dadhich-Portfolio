import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { cardStaggerVariants, itemFadeUpVariants, getVariants } from '../../animations/transitionVariants';

const Projects: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const labelVariants = getVariants(prefersReducedMotion, itemFadeUpVariants);
  const cardStaggerVariantsResolved = getVariants(prefersReducedMotion, cardStaggerVariants);

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-bg-primary overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-primary-glow) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-4 md:mb-8"
        >
          <span className="text-sm md:text-base font-mono text-accent-primary tracking-widest">
            03 / SELECTED WORK
          </span>
        </motion.div>

        {/* Headline - Staggered reveal */}
        <motion.div
          variants={cardStaggerVariantsResolved}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20 md:mb-32"
        >
          {['PROJECTS', 'THAT SOLVE', 'REAL PROBLEMS.'].map((line, index) => (
            <motion.h2
              key={index}
              variants={itemFadeUpVariants}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight"
            >
              {line}
            </motion.h2>
          ))}
        </motion.div>

        {/* Projects Grid - Staggered card reveal */}
        <motion.div
          variants={cardStaggerVariantsResolved}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-24 md:space-y-32"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemFadeUpVariants}>
              <ProjectCard
                project={project}
                index={index}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
