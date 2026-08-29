import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  architectureNodes,
  architectureConnections,
  getConnectionsForNode,
  ArchitectureNode,
} from '../../data/architecture';

const ArchitectureVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [animatedConnections, setAnimatedConnections] = useState<Set<string>>(new Set());

  // Animate connections on mount
  useEffect(() => {
    // Animate connections in order
    const order = [
      'client-frontend',
      'frontend-api',
      'api-backend',
      'backend-database',
      'backend-redis',
      'backend-ai',
      'backend-cloud',
    ];

    order.forEach((connId, index) => {
      setTimeout(() => {
        setAnimatedConnections((prev) => new Set(prev).add(connId));
      }, 300 + index * 300);
    });
  }, []);

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const calculatePath = (fromId: string, toId: string): string => {
    const fromNode = architectureNodes.find((n) => n.id === fromId);
    const toNode = architectureNodes.find((n) => n.id === toId);

    if (!fromNode || !toNode || !fromNode.position || !toNode.position) {
      return '';
    }

    const x1 = (fromNode.position.x / 100) * 800;
    const y1 = (fromNode.position.y / 100) * 600;
    const x2 = (toNode.position.x / 100) * 800;
    const y2 = (toNode.position.y / 100) * 600;

    // Quadratic curve
    const controlX = (x1 + x2) / 2;
    const controlY = (y1 + y2) / 2 + 30;

    return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
  };

  return (
    <div className="relative">
      {/* SVG Container with connections */}
      <motion.svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 800 600"
        className="w-full border border-[#00ff88]/20 rounded-lg bg-gradient-to-b from-[#00ff88]/5 to-transparent"
      >
        {/* Draw connections */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#00ff88" />
          </marker>
        </defs>

        {/* Connection lines */}
        {architectureConnections.map((conn) => {
          const connId = `${conn.from}-${conn.to}`;
          const isAnimated = animatedConnections.has(connId);

          return (
            <motion.g key={connId}>
              {/* Background line for glow effect */}
              <motion.path
                d={calculatePath(conn.from, conn.to)}
                stroke="#00ff88"
                strokeWidth="3"
                fill="none"
                opacity="0.3"
                filter="url(#blur)"
              />

              {/* Main line */}
              <motion.path
                d={calculatePath(conn.from, conn.to)}
                stroke="#00ff88"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                initial={{ strokeDashoffset: 1000 }}
                animate={isAnimated ? { strokeDashoffset: 0 } : { strokeDashoffset: 1000 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                markerEnd="url(#arrowhead)"
              />
            </motion.g>
          );
        })}

        {/* Blur filter */}
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Draw nodes */}
        {architectureNodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          if (!node.position) return null;

          const x = (node.position.x / 100) * 800;
          const y = (node.position.y / 100) * 600;

          return (
            <motion.g
              key={node.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={nodeVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Background circle */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 65 : 55}
                fill={node.color}
                opacity={isSelected ? 0.15 : 0.08}
                transition={{ duration: 0.3 }}
              />

              {/* Border circle */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 65 : 55}
                fill="none"
                stroke={node.color}
                strokeWidth={isSelected ? 3 : 2}
                opacity={isSelected ? 1 : 0.5}
                transition={{ duration: 0.3 }}
              />

              {/* Inner circle */}
              <circle cx={x} cy={y} r={isSelected ? 45 : 40} fill={node.color} opacity="0.2" />

              {/* Label text */}
              <text
                x={x}
                y={y - 5}
                textAnchor="middle"
                fontSize={isSelected ? '14' : '12'}
                fontWeight="bold"
                fill={node.color}
                fontFamily="monospace"
                className="cursor-pointer"
                onClick={() => setSelectedNode(isSelected ? null : node)}
              >
                {node.label.split(' ').map((word, idx) => (
                  <tspan key={idx} x={x} dy={idx === 0 ? 0 : 16}>
                    {word}
                  </tspan>
                ))}
              </text>

              {/* Click indicator */}
              {!isSelected && (
                <motion.circle
                  cx={x}
                  cy={y + 60}
                  r="3"
                  fill={node.color}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.g>
          );
        })}
      </motion.svg>

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mt-8 p-8 rounded-lg border border-[#00ff88]/30 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{selectedNode.label}</h3>
              <p className="text-[#00ff88] font-semibold">{selectedNode.description}</p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Details list */}
          <div className="grid md:grid-cols-2 gap-4">
            {selectedNode.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded bg-[#00ff88]/5 border border-[#00ff88]/20"
              >
                <span className="text-[#00ff88] font-bold">▪</span>
                <span className="text-gray-300">{detail}</span>
              </motion.div>
            ))}
          </div>

          {/* Connected services */}
          {getConnectionsForNode(selectedNode.id).length > 0 && (
            <div className="mt-6 pt-6 border-t border-[#00ff88]/20">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Connections</p>
              <div className="flex flex-wrap gap-2">
                {getConnectionsForNode(selectedNode.id).map((conn, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20"
                  >
                    {conn.from === selectedNode.id ? `→ ${conn.to}` : `← ${conn.from}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Help text */}
      {!selectedNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-center text-sm text-gray-400 flex items-center justify-center gap-2"
        >
          <ChevronDown size={16} className="animate-bounce" />
          Click any node to see details
          <ChevronDown size={16} className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        </motion.div>
      )}
    </div>
  );
};

export default ArchitectureVisualization;
