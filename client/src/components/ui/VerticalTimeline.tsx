import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ExperienceEntry } from '../../data/experience';

interface VerticalTimelineProps {
  experiences: ExperienceEntry[];
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ experiences }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  // Sort experiences by year (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return yearB - yearA;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Vertical timeline line */}
      <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00ff88] via-[#00ffff] to-[#00ff88]/30" />

      {/* Timeline items */}
      <div className="space-y-4 sm:space-y-6">
        {sortedExperiences.map((experience) => (
          <motion.div
            key={experience.id}
            variants={itemVariants}
            className="relative pl-14 sm:pl-20"
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 sm:left-1 w-6 h-6 sm:w-8 sm:h-8 bg-gray-900 border-2 border-[#00ff88] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                setExpandedId(expandedId === experience.id ? null : experience.id)
              }
            >
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#00ff88] rounded-full" />
            </motion.div>

            {/* Glow effect around dot */}
            <motion.div
              className="absolute left-1 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 rounded-full"
              animate={expandedId === experience.id ? { boxShadow: '0 0 12px rgba(0, 255, 136, 0.6)' } : {}}
              transition={{ duration: 0.3 }}
            />

            {/* Card */}
            <motion.div
              className="group cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === experience.id ? null : experience.id)
              }
            >
              {/* Collapsed view */}
              <motion.div
                className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 border rounded-lg p-4 sm:p-5 transition-all duration-300 ${
                  expandedId === experience.id
                    ? 'border-[#00ff88]/50 bg-gray-900/70'
                    : 'border-gray-700/50 hover:border-gray-600/50'
                }`}
                layout
              >
                {/* Year and Type */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <motion.p
                      className="text-xs font-mono text-[#00ff88] uppercase tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {experience.year}
                    </motion.p>
                    <motion.p
                      className="text-xs font-mono text-gray-500 uppercase tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {experience.type}
                    </motion.p>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedId === experience.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={18} className="text-[#00ff88]" />
                  </motion.div>
                </div>

                {/* Title and Company */}
                <motion.h4
                  className="text-lg sm:text-xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {experience.role}
                </motion.h4>
                <motion.p
                  className="text-[#00ffff] text-sm sm:text-base font-medium mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {experience.company}
                </motion.p>

                {/* Duration and Location (preview) */}
                <div className="text-xs text-gray-500 space-y-1">
                  {experience.duration && <p>{experience.duration}</p>}
                  {experience.location && <p>{experience.location}</p>}
                </div>
              </motion.div>

              {/* Expanded view */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  expandedId === experience.id
                    ? { opacity: 1, height: 'auto' }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <motion.div className="bg-gray-900/40 border border-t-0 border-gray-700/50 rounded-b-lg p-4 sm:p-5 space-y-4">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Description
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                          className="px-2 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-medium rounded-full"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
