/**
 * Three.js 3D Component Lazy Loading Strategy
 * Load 3D scenes only when needed to reduce initial bundle
 */

import { lazy, Suspense } from 'react';

// Lazy load expensive 3D components
export const DigitalCoreLazy = lazy(() =>
  import('../components/3d/DigitalCore').then((module) => ({
    default: module.default,
  }))
);

export const TechUniverseLazy = lazy(() =>
  import('../components/3d/TechUniverse').then((module) => ({
    default: module.default,
  }))
);

export const AIorbLazy = lazy(() =>
  import('../components/3d/AIOrb').then((module) => ({
    default: module.AIOrb3D,
  }))
);

export const ContributionLandscapeLazy = lazy(() =>
  import('../components/3d/ContributionLandscape').then((module) => ({
    default: module.ContributionLandscape3D,
  }))
);

/**
 * 3D Canvas Suspense boundary with optimized fallback
 */
export const Canvas3DSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense
    fallback={
      <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black animate-pulse" />
    }
  >
    {children}
  </Suspense>
);
