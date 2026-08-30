import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ExperienceEntry } from '../../data/experience';

interface HorizontalTimelineProps {
  experiences: ExperienceEntry[];
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ experiences }) => {
  const [selectedId, setSelectedId] = useState<string | null>(experiences[0]?.id || null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Sort experiences by year (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return yearB - yearA;
  });

  // Track scroll progress for timeline fill effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when section enters at bottom, 1 when it leaves at top
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      setScrollProgress(progress);

      // Make milestones visible as progress fills
      const visibleCount = Math.floor(progress * sortedExperiences.length);
      const newVisibleIndices = new Set<number>();
      for (let i = 0; i < visibleCount; i++) {
        newVisibleIndices.add(i);
      }
      setVisibleIndices(newVisibleIndices);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sortedExperiences.length]);

  const selectedExperience = sortedExperiences.find((exp) => exp.id === selectedId);

  return (
    <div ref={containerRef} className="w-full">
      {/* Timeline Track */}
      <div className="relative mb-16 lg:mb-20">
        {/* Background track */}
        <div className="h-1 bg-border-primary rounded-full overflow-hidden relative">
          {/* Animated fill */}
          <motion.div
            className="h-full bg-gradient-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${scrollProgress * 100}%` }}
            transition={{ type: 'tween', duration: 0.3 }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-16 h-8 bg-gradient-primary/50 blur-xl"
            animate={{
              left: `${scrollProgress * 100}%`,
            }}
            transition={{ type: 'tween', duration: 0.3 }}
          />
        </div>

        {/* Milestones */}
        <div ref={timelineRef} className="absolute top-1/2 -translate-y-1/2 w-full">
          {sortedExperiences.map((experience, index) => {
            const position = (index / (sortedExperiences.length - 1)) * 100;
            const isVisible = visibleIndices.has(index);
            const isSelected = selectedId === experience.id;

            return (
              <motion.button
                key={experience.id}
                onClick={() => setSelectedId(experience.id)}
                className="absolute top-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Outer glow circle */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={isSelected ? { boxShadow: '0 0 20px var(--color-accent-primary-glow)' } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '24px',
                    height: '24px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />

                {/* Main dot */}
                <motion.div
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-accent-primary border-accent-primary shadow-lg shadow-accent-primary/50'
                      : 'bg-bg-card border-border-strong hover:border-accent-primary'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.95 }}
                />

                {/* Year label below */}
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-text-muted whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 }}
                >
                  {experience.year}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Details Panel */}
      {selectedExperience && (
        <motion.div
          key={selectedExperience.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-bg-surface/50 to-bg-card/30 border border-border-primary rounded-xl p-8 lg:p-10 backdrop-blur-sm hover:border-border-strong transition-colors"
        >
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
            {/* Year & Role */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-mono text-accent-primary uppercase tracking-wider mb-2"
              >
                {selectedExperience.type}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-2xl font-bold text-text-primary mb-2"
              >
                {selectedExperience.role}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-accent-secondary"
              >
                {selectedExperience.company}
              </motion.p>
            </div>

            {/* Meta Info */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {selectedExperience.duration && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                      Duration
                    </p>
                    <p className="text-text-primary font-medium">{selectedExperience.duration}</p>
                  </motion.div>
                )}
                {selectedExperience.location && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-text-primary font-medium">{selectedExperience.location}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mb-6 pb-6 border-b border-border-primary"
          >
            <p className="text-text-secondary leading-relaxed">{selectedExperience.description}</p>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedExperience.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                  className="px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-medium rounded-full hover:bg-accent-primary/20 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Expand indicator */}
          <motion.div
            className="mt-6 text-center text-xs text-text-muted"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={16} className="mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
