import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { AIProject } from '../../data/aiProjects';

interface AIProjectCardProps {
  project: AIProject;
}

export const AIProjectCard: React.FC<AIProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    completed: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/50', text: 'text-emerald-400' },
    'in-progress': { bg: 'bg-amber-500/10', border: 'border-amber-500/50', text: 'text-amber-400' },
    research: { bg: 'bg-blue-500/10', border: 'border-blue-500/50', text: 'text-blue-400' },
  };

  const status = project.status || 'completed';
  const statusColor = statusColors[status];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <motion.div
        className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8 backdrop-blur-sm hover:border-gray-600/50 transition-colors overflow-hidden relative group"
        animate={{
          borderColor: isHovered ? 'rgba(0, 255, 136, 0.3)' : 'rgba(107, 114, 128, 0.3)',
        }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-4">
            {/* Category Badge */}
            <motion.div
              className="inline-block mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-xs font-medium rounded-full uppercase tracking-wider">
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {project.title}
            </motion.h3>

            {/* Status Badge */}
            <motion.div
              className={`inline-block px-2 py-1 rounded text-xs font-mono uppercase tracking-wider ${statusColor.bg} border ${statusColor.border} ${statusColor.text}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {status.replace('-', ' ')}
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            {project.description}
          </motion.p>

          {/* Architecture */}
          <motion.div
            className="mb-6 pb-6 border-b border-gray-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Architecture
            </p>
            <div className="flex flex-wrap gap-2">
              {project.architecture.slice(0, 3).map((arch, index) => (
                <motion.span
                  key={arch}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="px-2 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 text-[#00ffff] text-xs rounded"
                >
                  {arch}
                </motion.span>
              ))}
              {project.architecture.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{project.architecture.length - 3} more
                </span>
              )}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                  className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 text-gray-300 text-xs rounded font-medium"
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs text-gray-500">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex gap-3 pt-4 border-t border-gray-700/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-[#00ff88] hover:border-[#00ff88]/50 transition-colors text-sm font-medium"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88]/20 transition-colors text-sm font-medium"
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
