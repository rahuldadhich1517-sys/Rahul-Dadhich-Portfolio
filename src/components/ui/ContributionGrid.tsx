import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ContributionDay } from '../../types/github';

interface ContributionGridProps {
  contributionData: ContributionDay[];
}

export const ContributionGrid: React.FC<ContributionGridProps> = ({ contributionData }) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Group contributions by week and day
  const barsPerWeek = 7;

  // Create a map for easy lookup
  const contributionMap = new Map(contributionData.map((d) => [d.date, d.count]));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const getColor = (count: number): string => {
    if (count === 0) return 'bg-gray-800/30 border-gray-700/30';
    if (count < 3) return 'bg-[#00ff88]/20 border-[#00ff88]/40';
    if (count < 6) return 'bg-[#00ff88]/40 border-[#00ff88]/60';
    return 'bg-[#00ff88]/70 border-[#00ff88]/90';
  };

  const tooltipText = (date: string, count: number): string => {
    const d = new Date(date);
    return `${count} contributions on ${d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })}`;
  };

  return (
    <motion.div
      className="flex justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="inline-block">
        <motion.div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${barsPerWeek}, minmax(0, 1fr))`,
          }}
        >
          {contributionData.map((day) => {
            const count = contributionMap.get(day.date) || 0;
            const isHovered = hoveredDate === day.date;

            return (
              <motion.div
                key={day.date}
                variants={cellVariants}
                onMouseEnter={() => setHoveredDate(day.date)}
                onMouseLeave={() => setHoveredDate(null)}
                title={tooltipText(day.date, count)}
                className="group relative"
              >
                <motion.div
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded border transition-all duration-200 cursor-pointer ${getColor(count)}`}
                  animate={{
                    scale: isHovered ? 1.5 : 1,
                    boxShadow: isHovered ? '0 0 12px rgba(0, 255, 136, 0.6)' : '0 0 0px rgba(0, 255, 136, 0)',
                  }}
                />

                {/* Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs whitespace-nowrap text-gray-300 z-10 pointer-events-none"
                  >
                    {count} {count === 1 ? 'contribution' : 'contributions'}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};
