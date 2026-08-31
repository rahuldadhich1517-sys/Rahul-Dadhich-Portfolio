/**
 * Animation variants for different sections
 */

// Hero cinematic entrance
export const heroVariants = {
  full: {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  },
} as const;

// Section fade-up reveal
export const sectionRevealVariants = {
  full: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  },
} as const;

// Item fade-up
export const itemFadeUpVariants = {
  full: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
} as const;

// Staggered card reveal
export const cardStaggerVariants = {
  full: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
} as const;

// Individual card entrance
export const cardEntranceVariants = {
  full: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
} as const;

// Progressive construction (for architecture diagram)
export const progressiveConstructionVariants = {
  full: {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
} as const;

// Orb animation (for AI Lab)
export const orbAnimationVariants = {
  full: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
    float: {
      y: 0,
      transition: { duration: 0 },
    },
  },
} as const;

// Contact cinematic reveal
export const contactCinematicVariants = {
  full: {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  },
} as const;

// Container stagger (for consistent children animation)
export const containerStaggerVariants = {
  full: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  },
} as const;

// Parallax effect (disabled in reduced motion)
export const parallaxVariants = {
  full: {
    initial: { y: 0 },
    whileInView: (custom: number) => ({
      y: custom * 0.5,
      transition: {
        duration: 0.6,
      },
    }),
  },
  reduced: {
    initial: { y: 0 },
    whileInView: {
      y: 0,
    },
  },
} as const;

// Get variants based on motion preference
export const getVariants = (
  prefersReducedMotion: boolean,
  variantSet: { full: any; reduced: any }
) => {
  return prefersReducedMotion ? variantSet.reduced : variantSet.full;
};
