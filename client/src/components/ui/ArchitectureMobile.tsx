import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { architectureNodes } from '../../data/architecture';

const ArchitectureMobile: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Vertical flow order for mobile
  const mobileOrder = ['client', 'frontend', 'api', 'backend', 'database', 'redis', 'cloud', 'ai'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2"
      >
        {mobileOrder.map((nodeId, index) => {
          const node = architectureNodes.find((n) => n.id === nodeId);
          if (!node) return null;

          const isExpanded = expandedId === nodeId;

          return (
            <div key={nodeId}>
              {/* Connection line */}
              {index > 0 && (
                <motion.div
                  variants={lineVariants}
                  className="flex justify-center py-2"
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-[#00ff88] to-[#00ff88]/50" />
                </motion.div>
              )}

              {/* Node card */}
              <motion.button
                variants={itemVariants}
                onClick={() => setExpandedId(isExpanded ? null : nodeId)}
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isExpanded
                      ? 'border-[#00ff88] bg-[#00ff88]/15'
                      : 'border-[#00ff88]/30 bg-[#00ff88]/5 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10'
                  }`}
                  style={{ borderColor: node.color, backgroundColor: `${node.color}10` }}
                >
                  {/* Node header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="font-bold text-sm md:text-base font-mono"
                        style={{ color: node.color }}
                      >
                        {node.label}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{node.description}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      style={{
                        color: node.color,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}
                    />
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-[#00ff88]/20 space-y-2"
                    >
                      {node.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <span style={{ color: node.color }} className="text-xs font-bold">
                            ▪
                          </span>
                          <span className="text-xs text-gray-300">{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.button>
            </div>
          );
        })}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-8 p-4 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 text-xs space-y-2"
      >
        <p className="text-gray-400 uppercase tracking-widest font-semibold mb-3">Layer Types</p>
        <div className="space-y-2">
          {[
            { type: 'Client Interface', color: '#61dafb' },
            { type: 'Frontend Layer', color: '#61dafb' },
            { type: 'API Gateway', color: '#fbbf24' },
            { type: 'Backend Runtime', color: '#68a063' },
            { type: 'Data Layer', color: '#336791' },
            { type: 'Support Services', color: '#dc382d' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300">{item.type}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ArchitectureMobile;
