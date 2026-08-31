import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../data/skills';
import SkillDetails from './SkillDetails';

interface SkillGridProps {
skills: Skill[];
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills }) => {
const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.04,
},
},
};

const cardVariants = {
hidden: {
opacity: 0,
y: 12,
},
visible: {
opacity: 1,
y: 0,
transition: {
duration: 0.3,
},
},
};

return (
<>
<motion.div
variants={containerVariants}
initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.1 }}
className="
grid
grid-cols-2
sm:grid-cols-3
md:grid-cols-4
lg:grid-cols-5
gap-3
md:gap-4
"
>
{skills.map((skill) => {
// Convert the icon component into a React component
const Icon = skill.icon;

return (
        <motion.button
          key={skill.id}
          variants={cardVariants}
          onClick={() => setSelectedSkill(skill)}
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
          className="
            group
            relative
            flex
            flex-col
            items-center
            justify-center
            text-center
            p-4
            md:p-5
            rounded-xl
            border
            border-border-primary
            transition-all
            duration-300
            cursor-pointer
            overflow-hidden
          "
          style={{
            background:
              'linear-gradient(135deg, var(--color-bg-surface), var(--color-bg-card))',
          }}
        >
          {/* Hover Glow */}
          <div
            className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              pointer-events-none
            "
            style={{
              boxShadow:
                'inset 0 0 25px var(--color-accent-primary-glow)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center">

            {/* Technology Icon */}
            <div
              className="text-3xl md:text-4xl mb-2"
              style={{ color: skill.color }}
            >
              <Icon />
            </div>

            {/* Skill Name */}
            <h3 className="text-sm md:text-base font-semibold text-text-primary">
              {skill.name}
            </h3>

            {/* Category */}
            <span className="mt-1 text-[10px] md:text-xs uppercase tracking-wider text-text-muted">
              {skill.category}
            </span>

            {/* Proficiency */}
            <div className="flex items-center gap-1 mt-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 8px ${skill.color}`,
                }}
              />

              <span className="text-[10px] text-text-muted">
                {skill.proficiency}
              </span>
            </div>
          </div>
        </motion.button>
      );
    })}
  </motion.div>

  {/* Skill Details Modal */}
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
