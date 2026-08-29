/**
 * Three.js Performance Configuration
 * Optimized for mid-range devices while maintaining visual quality
 */

export const THREE_JS_CONFIG = {
  // Particle system optimization
  particles: {
    desktop: {
      count: 3000,
      size: 2,
      speed: 0.5,
    },
    tablet: {
      count: 1500,
      size: 1.8,
      speed: 0.4,
    },
    mobile: {
      count: 500, // 83% reduction from desktop
      size: 1.5,
      speed: 0.3,
    },
  },

  // Device Pixel Ratio settings
  dpr: {
    desktop: 2, // High quality on large screens
    tablet: 1.5, // Balanced quality/performance
    mobile: 1, // Mobile optimization
  },

  // Canvas rendering
  antialias: {
    desktop: true,
    tablet: true,
    mobile: false, // Disable on mobile for performance
  },

  // Geometry optimization
  geometryDetails: {
    desktop: {
      segments: 64,
      detail: 2,
    },
    tablet: {
      segments: 32,
      detail: 1,
    },
    mobile: {
      segments: 16, // 75% reduction
      detail: 0,
    },
  },

  // Shadow map quality
  shadowMap: {
    desktop: {
      width: 2048,
      height: 2048,
    },
    tablet: {
      width: 1024,
      height: 1024,
    },
    mobile: null, // No shadow maps on mobile
  },

  // Texture resolution
  textureResolution: {
    desktop: 4096,
    tablet: 2048,
    mobile: 1024, // 75% reduction
  },
};

/**
 * Detect device category
 */
export const getDeviceCategory = (): 'desktop' | 'tablet' | 'mobile' => {
  const width = window.innerWidth;
  const memory = (navigator as any).deviceMemory;

  // Mobile: small screen or low memory
  if (width < 768 || memory && memory <= 4) return 'mobile';

  // Tablet: medium screen
  if (width < 1024) return 'tablet';

  // Desktop
  return 'desktop';
};

/**
 * Get optimized THREE config for device
 */
export const getOptimizedConfig = () => {
  const device = getDeviceCategory();
  return {
    particleCount: THREE_JS_CONFIG.particles[device].count,
    dpr: THREE_JS_CONFIG.dpr[device],
    antialias: THREE_JS_CONFIG.antialias[device],
    geometrySegments: THREE_JS_CONFIG.geometryDetails[device].segments,
    textureResolution: THREE_JS_CONFIG.textureResolution[device],
    shadowMapSize: THREE_JS_CONFIG.shadowMap[device],
  };
};
