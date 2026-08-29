import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import DigitalCore from '../3d/DigitalCore';
import HeroBackground from './HeroBackground';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion) return;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  }, [prefersReducedMotion]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  // Text animation variants
  const labelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.6,
      },
    },
  };

  const buttonsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: prefersReducedMotion ? 0 : 1.2,
      },
    },
    animate: prefersReducedMotion
      ? {}
      : {
          y: [0, 10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
          },
        },
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background */}
      <HeroBackground scrollProgress={scrollProgress} />

      {/* Content container */}
      <div className="relative h-full w-full flex items-center">
        {/* Left side - Text content */}
        <motion.div
          className={`${
            isMobile ? 'w-full px-4 sm:px-6 text-center' : 'w-1/2 px-8 md:px-12'
          } flex flex-col justify-center relative z-10`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Small label */}
          <motion.div variants={labelVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 backdrop-blur-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-sm font-medium text-[#00ff88] tracking-wider">
                FULL STACK × AI ENGINEER
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={headlineVariants}
            className="mb-6 mt-4"
          >
            {['BUILDING', 'DIGITAL', 'EXPERIENCES.'].map((word, index) => (
              <motion.div
                key={index}
                variants={wordVariants}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight break-words"
              >
                {word}
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={descriptionVariants}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-sm sm:max-w-md mb-8 leading-relaxed"
          >
            I build scalable web applications, modern interfaces and intelligent AI-powered
            systems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={buttonsVariants}
            className={`flex gap-4 ${isMobile ? 'flex-col' : 'flex-row'}`}
          >
            <a
              href="#work"
              className="px-6 py-3 rounded-lg bg-[#00ff88] text-black font-semibold hover:bg-[#00ff88]/90 transition-all duration-300 text-center"
            >
              Explore My Work
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-lg border border-[#00ff88]/50 text-[#00ff88] font-semibold hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              View Resume
              <span>↗</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - 3D Object */}
        {!isMobile ? (
          <div className="w-1/2 h-full flex items-center justify-center relative">
            <Canvas
              camera={{ position: [0, 0, 3.5], fov: 50 }}
              style={{
                width: '100%',
                height: '100%',
              }}
              dpr={[1, Math.min(2, window.devicePixelRatio)]}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={50} />
              <Environment preset="night" />
              <DigitalCore
                mousePosition={mousePosition}
                scrollProgress={scrollProgress}
                isMobile={isMobile}
              />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
            </Canvas>
          </div>
        ) : null}
      </div>

      {/* Mobile 3D Object - Below headline */}
      {isMobile ? (
        <motion.div
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-64"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            style={{
              width: '100%',
              height: '100%',
            }}
            dpr={1}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
            <Environment preset="night" />
            <DigitalCore
              mousePosition={mousePosition}
              scrollProgress={scrollProgress}
              isMobile={isMobile}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
          </Canvas>
        </motion.div>
      ) : null}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#00ff88]/60 text-sm"
        variants={scrollIndicatorVariants}
        initial="hidden"
        whileInView="visible"
        animate="animate"
        viewport={{ once: true }}
      >
        <span className="font-medium tracking-widest">01</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </motion.div>
    </section>
  );
};

export default Hero;
