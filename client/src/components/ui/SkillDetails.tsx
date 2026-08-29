import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '../../data/skills';
import { X } from 'lucide-react';

interface SkillDetailsProps {
  skill: Skill | null;
  onClose: () => void;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const categoryColors: Record<string, string> = {
    'Frontend': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    'Backend': 'bg-green-500/20 text-green-300 border-green-500/50',
    'Database': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    'DevOps': 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    'Tools': 'bg-pink-500/20 text-pink-300 border-pink-500/50',
    'AI/ML': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  };

  const proficiencyColors: Record<string, string> = {
    'Expert': 'text-[#00ff88]',
    'Advanced': 'text-cyan-400',
    'Intermediate': 'text-gray-400',
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Card */}
        <motion.div
          className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden border border-[#00ff88]/30 bg-black"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 200, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-[#00ff88]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
                </div>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Category and Proficiency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Category</p>
                <div className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${categoryColors[skill.category]}`}>
                  {skill.category}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Proficiency</p>
                <p className={`text-sm font-medium ${proficiencyColors[skill.proficiency]}`}>
                  {skill.proficiency}
                </p>
              </div>
            </div>

            {/* Related Technologies */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Related Technologies</p>
              <div className="flex flex-wrap gap-2">
                {skill.relatedTechs.map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 font-medium"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience note */}
            <div className="pt-4 border-t border-[#00ff88]/20">
              <p className="text-xs text-gray-400">
                Actively using in production applications and continuous learning.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillDetails;
