import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../data/skills';
import SkillDetails from './SkillDetails';

interface SkillGridProps {
  skills: Skill[];
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Category color mapping using design system tokens
  const categoryColors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
    'Frontend': { bg: 'bg-accent-secondary/10', border: 'border-accent-secondary/30', text: 'text-accent-secondary', accent: 'var(--color-accent-secondary)' },
    'Backend': { bg: 'bg-success/10', border: 'border-success/30', text: 'text-success', accent: 'var(--color-success)' },
    'Database': { bg: 'bg-accent-primary/10', border: 'border-accent-primary/30', text: 'text-accent-primary', accent: 'var(--color-accent-primary)' },
    'DevOps': { bg: 'bg-warning/10', border: 'border-warning/30', text: 'text-warning', accent: 'var(--color-warning)' },
    'Tools': { bg: 'bg-accent-secondary/10', border: 'border-accent-secondary/30', text: 'text-accent-secondary', accent: 'var(--color-accent-secondary)' },
    'AI/ML': { bg: 'bg-accent-primary/10', border: 'border-accent-primary/30', text: 'text-accent-primary', accent: 'var(--color-accent-primary)' },
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
                background: 'linear-gradient(135deg, var(--color-bg-surface) 0%, var(--color-bg-card) 100%)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 20px var(--color-accent-primary-glow)',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and name */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-lg font-bold text-text-primary">{skill.name}</h3>
                </div>

                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
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
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {skill.description}
                </p>

                {/* Related techs preview */}
                <div className="flex flex-wrap gap-2">
                  {skill.relatedTechs.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded bg-accent-primary/10 text-accent-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {skill.relatedTechs.length > 2 && (
                    <span className="text-xs px-2 py-1 text-text-muted">
                      +{skill.relatedTechs.length - 2}
                    </span>
                  )}
                </div>

                {/* Click hint */}
                <div className="mt-4 pt-3 border-t border-border-primary text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
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
