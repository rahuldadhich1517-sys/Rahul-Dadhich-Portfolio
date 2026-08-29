import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBuildingProjects } from '../../hooks/useBuildingProjects';
import { ProjectProgressCard } from '../ui/ProjectProgressCard';

export const NowBuilding: React.FC = () => {
  const { projects, isLoading, error } = useBuildingProjects();
  const [displayCount, setDisplayCount] = useState(2);

  useEffect(() => {
    const checkMobile = () => {
      setDisplayCount(window.innerWidth < 768 ? 1 : 2);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="now-building"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient */}
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
            <div className="text-sm font-mono text-[#00ff88] tracking-wider">08 / NOW BUILDING</div>
            <div className="h-px flex-grow bg-gradient-to-r from-[#00ff88] to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            WHAT'S NEXT?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Active projects in development showcasing cutting-edge technologies and continuous innovation.
          </p>
        </motion.div>

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            variants={itemVariants}
            className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 lg:p-8 mb-12 text-red-400"
          >
            <p className="mb-2 font-medium">Failed to load projects</p>
            <p className="text-sm text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-8 h-8 border-2 border-[#00ff88]/50 border-t-[#00ff88] rounded-full" />
            </motion.div>
            <p className="text-gray-400">Loading projects...</p>
          </motion.div>
        )}

        {/* Projects Grid */}
        {projects && projects.length > 0 && !isLoading && (
          <>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.slice(0, displayCount).map((project, index) => (
                <ProjectProgressCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>

            {/* View All Button */}
            {projects.length > displayCount && (
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDisplayCount(projects.length)}
                  className="px-8 py-3 bg-[#00ff88]/10 border border-[#00ff88]/50 text-[#00ff88] rounded-lg font-medium hover:bg-[#00ff88]/20 transition-colors"
                >
                  View All {projects.length} Projects
                </motion.button>
              </motion.div>
            )}

            {/* All Projects Grid - Shown after clicking "View All" */}
            {displayCount > 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-12 lg:mt-16"
              >
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {projects.slice(displayCount, projects.length).map((project, index) => (
                    <ProjectProgressCard key={project.id} project={project} index={index + displayCount} />
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Summary Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-16 lg:mt-20 pt-12 border-t border-gray-700/50"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                {/* Total Projects */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-3xl font-bold text-[#00ff88]">{projects.length}</p>
                  <p className="text-sm text-gray-400 mt-2">Active Projects</p>
                </motion.div>

                {/* Avg Progress */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-3xl font-bold text-[#00ffff]">
                    {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Avg Progress</p>
                </motion.div>

                {/* Technologies Count */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-3xl font-bold text-[#00ff88]">
                    {new Set(projects.flatMap(p => p.technologies.map(t => t.name))).size}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Technologies</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {projects.length === 0 && !isLoading && !error && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <p className="text-gray-400 mb-4">No projects currently building.</p>
            <p className="text-sm text-gray-500">Check back soon for updates!</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
