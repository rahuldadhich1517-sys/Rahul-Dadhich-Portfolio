import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experience';
import { HorizontalTimeline } from '../ui/HorizontalTimeline';
import { VerticalTimeline } from '../ui/VerticalTimeline';

export const Experience: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
      id="experience"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />

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
            <div className="text-sm font-mono text-[#00ff88] tracking-wider">05 / EXPERIENCE</div>
            <div className="h-px flex-grow bg-gradient-to-r from-[#00ff88] to-transparent max-w-xs" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            THE PATH SO FAR.
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            A journey through roles, projects, and continuous learning.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div variants={itemVariants}>
          {isMobile ? (
            <VerticalTimeline experiences={experiences} />
          ) : (
            <HorizontalTimeline experiences={experiences} />
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};
