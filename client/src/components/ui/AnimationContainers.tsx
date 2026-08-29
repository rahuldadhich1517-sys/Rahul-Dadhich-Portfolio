import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import {
  sectionRevealVariants,
  containerStaggerVariants,
  getVariants,
} from '../../animations/transitionVariants';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Wrapper component for section animations
 * Applies fade-up reveal with viewport detection
 * Respects prefers-reduced-motion
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  id,
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getVariants(prefersReducedMotion, sectionRevealVariants);

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  );
};

interface ContainerStaggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper for staggered children animations
 * Respects prefers-reduced-motion
 */
export const ContainerStagger: React.FC<ContainerStaggerProps> = ({
  children,
  className = '',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variants = getVariants(prefersReducedMotion, containerStaggerVariants);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
