import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingProject } from '../../data/buildingProjects';

interface ProjectProgressCardProps {
  project: BuildingProject;
  index?: number;
}

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ project, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'planning':
        return 'text-blue-400';
      case 'development':
        return 'text-yellow-400';
      case 'beta':
        return 'text-orange-400';
      case 'launching':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusLabel = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTechStatusIcon = (status: string): string => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '◐';
      case 'planned':
        return '○';
      default:
        return '?';
    }
  };

  const getTechStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'text-[#00ff88]';
      case 'in-progress':
        return 'text-[#ffff00]';
      case 'planned':
        return 'text-gray-500';
      default:
        return 'text-gray-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="h-full"
    >
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8 cursor-pointer group hover:border-gray-600/50 transition-all duration-300"
        whileHover={{ borderColor: 'rgba(0, 255, 136, 0.3)', y: -2 }}
      >
        {/* Header */}
        <div className="mb-4">
          {/* Status Badge */}
          <motion.div
            className="inline-block mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${getStatusColor(project.status)} border-current`}>
              {getStatusLabel(project.status)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Progress Section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {/* Progress Label */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Progress</p>
            <motion.p
              className="text-lg font-bold text-[#00ff88]"
              animate={{
                textShadow: ['0 0 0px rgba(0, 255, 136, 0)', '0 0 8px rgba(0, 255, 136, 0.5)', '0 0 0px rgba(0, 255, 136, 0)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {project.progress}%
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden border border-gray-700/50">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00ff88] to-[#00ffff] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              style={{
                boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
              }}
            />
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          className="mb-4 pb-4 border-b border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
            Technology Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs font-medium text-gray-300 flex items-center gap-1"
              >
                <span>{tech.name}</span>
                <span className={`font-bold ml-1 ${getTechStatusColor(tech.status)}`}>
                  {getTechStatusIcon(tech.status)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Info */}
        <motion.div
          className="flex items-center justify-between text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>Started: {new Date(project.startedAt).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</span>
          {project.estimatedCompletion && (
            <span>Est. {new Date(project.estimatedCompletion).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</span>
          )}
        </motion.div>

        {/* Expand Indicator */}
        <motion.div
          className="mt-4 text-center text-xs text-gray-600 group-hover:text-gray-500 transition-colors"
          animate={{ y: isExpanded ? -2 : 0 }}
        >
          {isExpanded ? '▲ Show Less' : '▼ Learn More'}
        </motion.div>
      </motion.div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 lg:p-8"
        >
          {project.longDescription && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <p className="text-sm text-gray-300 leading-relaxed">{project.longDescription}</p>
            </motion.div>
          )}

          {/* Detailed Technology Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Detailed Status</p>
            <div className="space-y-2">
              {project.technologies.map((tech) => (
                <div key={tech.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{tech.name}</span>
                  <span className={`font-mono font-bold ${getTechStatusColor(tech.status)}`}>
                    {tech.status === 'completed' && '✓ Completed'}
                    {tech.status === 'in-progress' && '◐ In Progress'}
                    {tech.status === 'planned' && '○ Planned'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
