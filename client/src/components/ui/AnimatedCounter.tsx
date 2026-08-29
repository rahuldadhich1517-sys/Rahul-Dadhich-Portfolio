import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedCounterProps {
  target: number;
  isInView: boolean;
  className?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  isInView,
  className = '',
  duration = 2,
}) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef({ value: 0 });

  useEffect(() => {
    if (!isInView || !countRef.current) return;

    // Reset the value
    valueRef.current.value = 0;

    // Animate the counter
    gsap.to(valueRef.current, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.floor(valueRef.current.value).toString();
        }
      },
    });
  }, [isInView, target, duration]);

  return (
    <span ref={countRef} className={className}>
      0
    </span>
  );
};

export default AnimatedCounter;
