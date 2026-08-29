import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../data/projects';

interface ArchitectureFlowProps {
  project: Project;
}

// Define architecture flows for different project types
const architectureFlows: { [key: string]: string[] } = {
  'AI Content Generation Platform': [
    'React Frontend',
    'Next.js API Routes',
    'Node.js Backend',
    'OpenAI API',
    'PostgreSQL Database',
  ],
  'E-Commerce Platform': [
    'React Frontend',
    'Express Server',
    'Stripe API',
    'MongoDB Database',
    'Redis Cache',
  ],
  'Task Management Application': [
    'React SPA',
    'Firebase Auth',
    'Firestore Database',
    'Redux State',
    'Real-time Sync',
  ],
  'Data Visualization Dashboard': [
    'React + D3.js',
    'WebSocket Server',
    'Node.js Backend',
    'Data Aggregation',
    'PostgreSQL',
  ],
  'Mobile Fitness Companion': [
    'React Native',
    'Firebase Backend',
    'Firebase Auth',
    'Realtime Database',
    'Cloud Storage',
  ],
  'AI Document Processing System': [
    'React Frontend',
    'Node.js API',
    'Python AI Service',
    'TensorFlow Models',
    'PostgreSQL Database',
  ],
};

const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ project }) => {
  const flow = useMemo(() => {
    return (
      architectureFlows[project.title] || [
        'Frontend',
        'API Layer',
        'Backend',
        'Database',
      ]
    );
  }, [project.title]);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-8"
    >
      {flow.map((layer, index) => (
        <div key={index}>
          {/* Architecture layer */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="px-8 py-4 rounded-lg border-2 border-[#00ff88] bg-gradient-to-r from-[#00ff88]/10 to-[#00ff88]/5 text-center min-w-[200px]">
              <p className="text-lg font-semibold text-[#00ff88]">{layer}</p>
            </div>
          </motion.div>

          {/* Connecting line (except for last item) */}
          {index < flow.length - 1 && (
            <motion.div
              variants={lineVariants}
              className="relative my-4"
              style={{
                height: '32px',
                width: '2px',
                background: 'linear-gradient(to bottom, #00ff88, #00ff88/50)',
                margin: '0 auto',
              }}
            >
              {/* Arrow at bottom */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[#00ff88]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="8 2 14 8 8 14"></polyline>
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      ))}

      {/* Legend for complex architectures */}
      {flow.length > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 p-4 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 text-sm text-gray-300 max-w-md"
        >
          <p className="text-[#00ff88] font-semibold mb-2">Architecture Overview</p>
          <ul className="space-y-1 text-xs">
            {flow.map((layer, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] flex-shrink-0" />
                {layer}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ArchitectureFlow;
