import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Strategic React.memo wrapper
 * Only memoize if:
 * - Component receives expensive props (objects, arrays, callbacks)
 * - Component is re-rendered frequently
 * - Re-render prevents smooth animations
 */

interface MemoizedCardProps {
  title: string;
  description: string;
  index: number;
  onClick?: () => void;
}

/**
 * Memoize only when justified:
 * - Static props or primitive props
 * - Receives stable callbacks via useCallback
 */
export const MemoizedCard = memo<MemoizedCardProps>(
  ({ title, description, index, onClick }) => (
    <motion.div
      key={index}
      className="card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  ),
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if title or description changes
    return (
      prevProps.title === nextProps.title &&
      prevProps.description === nextProps.description &&
      prevProps.onClick === nextProps.onClick
    );
  }
);

MemoizedCard.displayName = 'MemoizedCard';

/**
 * Smart useMemo usage:
 * - Use only for expensive computations (filters, sorts, calculations)
 * - Avoid for simple object/array creation
 */
export const useExpensiveComputation = (items: any[], sortKey: string) => {
  return useMemo(() => {
    console.time(`sort-${sortKey}`);
    const sorted = [...items].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return typeof aVal === 'string'
        ? aVal.localeCompare(bVal)
        : aVal - bVal;
    });
    console.timeEnd(`sort-${sortKey}`);
    return sorted;
  }, [items, sortKey]);
};

/**
 * Request animation frame wrapper for smooth animations
 * Use for scroll-dependent calculations
 */
export const useRAF = (callback: (timestamp: DOMHighResTimeStamp) => void) => {
  React.useEffect(() => {
    let frameId: number;
    const animate = (timestamp: DOMHighResTimeStamp) => {
      callback(timestamp);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
};
