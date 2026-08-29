import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import TechUniverse from '../3d/TechUniverse';
import SkillGrid from '../ui/SkillGrid';
import { skills } from '../../data/skills';

const Technology: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation variants
  const labelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="technology"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-black overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 200, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 md:mb-8"
        >
          <span className="text-sm md:text-base font-mono text-[#00ff88] tracking-widest">
            02 / THE ENGINE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          {['TOOLS I BUILD WITH.'].map((line, index) => (
            <motion.h2
              key={index}
              variants={wordVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {line}
            </motion.h2>
          ))}
        </motion.div>

        {/* Desktop: 3D Constellation */}
        {!isMobile && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(0, 255, 136, 0.2)',
              background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.05) 0%, rgba(5, 5, 5, 0) 70%)',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 10], fov: 50 }}
              dpr={[1, Math.min(2, window.devicePixelRatio)]}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
              <Environment preset="night" />
              <TechUniverse skills={skills} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
            </Canvas>
          </motion.div>
        )}

        {/* Mobile/Tablet: Skill Grid */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SkillGrid skills={skills} />
          </motion.div>
        )}

        {/* Fallback for reduced motion */}
        {!isMobile && prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SkillGrid skills={skills} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Technology;
