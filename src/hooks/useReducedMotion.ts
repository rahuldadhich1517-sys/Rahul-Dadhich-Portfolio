import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if user prefers reduced motion
 * Returns true if prefers-reduced-motion is enabled
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Helper to conditionally apply animations based on reduced motion preference
 */
export const getAnimationVariants = (
  prefersReducedMotion: boolean,
  fullVariants: any,
  reducedVariants?: any
) => {
  if (prefersReducedMotion && reducedVariants) {
    return reducedVariants;
  }
  return fullVariants;
};

/**
 * Helper to conditionally apply transition based on reduced motion preference
 */
export const getTransition = (
  prefersReducedMotion: boolean,
  fullTransition: any,
  reducedTransition?: any
) => {
  if (prefersReducedMotion) {
    return reducedTransition || { duration: 0.1 };
  }
  return fullTransition;
};
