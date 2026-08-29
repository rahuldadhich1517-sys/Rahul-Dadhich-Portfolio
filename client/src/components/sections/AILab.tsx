import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AIOrb3D } from '../3d/AIOrb';
import { AIProjectCard } from '../ui/AIProjectCard';
import { aiProjects, getAICategories } from '../../data/aiProjects';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { containerStaggerVariants, itemFadeUpVariants, getVariants } from '../../animations/transitionVariants';

export const AILab: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = getAICategories();
  const filteredProjects = selectedCategory
    ? aiProjects.filter((p) => p.category === selectedCategory)
    : aiProjects;

  const containerVariants = getVariants(prefersReducedMotion, containerStaggerVariants);
  const itemVariants = getVariants(prefersReducedMotion, itemFadeUpVariants);

  return (
    <section
      id="ai-lab"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div className="mb-12 lg:mb-20" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-sm font-mono text-[#00ff88] tracking-wider">06 / AI LAB</div>
            <div className="h-px flex-grow bg-gradient-to-r from-[#00ff88] to-transparent max-w-xs" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            EXPERIMENTING
            <br />
            WITH INTELLIGENCE.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
            Exploring the frontiers of artificial intelligence through practical research and real-world applications.
          </p>
        </motion.div>

        {/* AI Orb Section */}
        <motion.div
          variants={itemVariants}
          className="mb-20 lg:mb-32"
        >
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8 lg:gap-12 items-center`}>
            {/* Orb */}
            <div className={`${isMobile ? 'col-span-1 h-64' : 'lg:col-span-2 h-96'} bg-gradient-to-b from-gray-900/50 to-gray-900/20 rounded-xl overflow-hidden border border-gray-800/50`}>
              <AIOrb3D isMobile={isMobile} />
            </div>

            {/* Categories */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-6">
                AI Capabilities
              </h3>

              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { delay: index * 0.1 } },
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? 'bg-[#00ff88]/10 border-[#00ff88] shadow-lg shadow-[#00ff88]/20'
                      : 'bg-gray-900/30 border-gray-700/50 hover:border-[#00ff88]/50 hover:bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-lg font-bold text-[#00ff88]">{category.label}</span>
                    <motion.span
                      animate={{
                        scale: selectedCategory === category.id ? 1.2 : 1,
                      }}
                      className="text-[#00ffff]"
                    >
                      ▸
                    </motion.span>
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {category.description}
                  </p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8">
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.label} Projects`
              : 'All Projects'}
          </h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <AIProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">No projects in this category yet.</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
