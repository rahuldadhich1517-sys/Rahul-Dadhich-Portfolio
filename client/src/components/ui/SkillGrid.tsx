import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../data/skills';
import SkillDetails from './SkillDetails';

interface SkillGridProps {
  skills: Skill[];
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
    'Frontend': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
    'Backend': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-300' },
    'Database': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300' },
    'DevOps': { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300' },
    'Tools': { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-300' },
    'AI/ML': { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-300' },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {skills.map((skill) => {
          const colors = categoryColors[skill.category];

          return (
            <motion.button
              key={skill.id}
              variants={cardVariants}
              onClick={() => setSelectedSkill(skill)}
              className={`group relative p-5 md:p-6 rounded-xl border transition-all duration-300 text-left hover:scale-105 ${colors.bg} ${colors.border} border`}
              style={{
                background: `linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 200, 0.02) 100%)`,
                borderColor: `rgba(0, 255, 136, 0.2)`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 20px rgba(0, 255, 136, 0.1)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                </div>

                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {skill.category}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: skill.color }}
                  >
                    {skill.proficiency}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {skill.description}
                </p>

                {/* Related techs preview */}
                <div className="flex flex-wrap gap-2">
                  {skill.relatedTechs.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.relatedTechs.length > 2 && (
                    <span className="text-xs px-2 py-1 text-gray-400">
                      +{skill.relatedTechs.length - 2}
                    </span>
                  )}
                </div>

                {/* Click hint */}
                <div className="mt-4 pt-3 border-t border-[#00ff88]/10 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to see more →
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skill details modal */}
      {selectedSkill && (
        <SkillDetails
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </>
  );
};

export default SkillGrid;
