import React from 'react';

/**
 * Image optimization utilities
 * Implements responsive image loading and lazy loading
 */

interface ImageOptimizationConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean; // true = eager load, false = lazy load
}

/**
 * Generate responsive image srcset for next-gen formats
 */
export const generateImageSrcSet = (
  basePath: string,
  width: number,
  format: 'jpg' | 'webp' = 'webp'
): string => {
  const sizes = [320, 640, 1024, 1280, 1920];
  return sizes
    .filter((size) => size <= width)
    .map((size) => {
      const fileName = basePath.replace(/\.[^.]+$/, `_${size}.${format}`);
      return `${fileName} ${size}w`;
    })
    .join(', ');
};

/**
 * Optimized image component with lazy loading
 */
export const OptimizedImage: React.FC<ImageOptimizationConfig> = ({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
}: ImageOptimizationConfig) => {
  const aspectRatio = (height / width) * 100;

  return (
    <div style={{ paddingBottom: `${aspectRatio}%`, position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

/**
 * Font loading optimization
 * Use font-display: swap to prevent FOUT/FOIT
 */
export const FONT_PRELOAD_CONFIG = {
  inter: {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    type: 'font/woff2',
  },
  mono: {
    href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap',
    type: 'font/woff2',
  },
};

/**
 * Inject font preload links
 */
export const injectFontPreloads = () => {
  if (typeof document === 'undefined') return;

  const head = document.head;
  Object.entries(FONT_PRELOAD_CONFIG).forEach(([name, config]) => {
    if (document.querySelector(`link[data-font="${name}"]`)) return; // Already loaded

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = config.href;
    link.setAttribute('data-font', name);
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
};
