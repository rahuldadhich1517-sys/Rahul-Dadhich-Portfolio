import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchitectureVisualization from '../ui/ArchitectureVisualization';
import ArchitectureMobile from '../ui/ArchitectureMobile';

const Engineering: React.FC = () => {
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
      id="engineering"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-black overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background accents */}
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
            04 / ENGINEERING
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
          {['HOW I BUILD', 'SYSTEMS.'].map((line, index) => (
            <motion.h2
              key={index}
              variants={wordVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {line}
            </motion.h2>
          ))}
        </motion.div>

        {/* Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {isMobile ? (
            <ArchitectureMobile />
          ) : prefersReducedMotion ? (
            <ArchitectureMobile />
          ) : (
            <ArchitectureVisualization />
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-8 rounded-xl border border-[#00ff88]/20"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 255, 200, 0.02) 100%)',
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">System Architecture</h3>
          <p className="text-gray-300 leading-relaxed">
            A modern, scalable architecture designed for performance, reliability, and maintainability. 
            Built with TypeScript end-to-end for type safety and developer experience. The system 
            separates concerns cleanly: frontend UI, API gateway, backend business logic, persistent 
            storage, and optional services like caching and AI integration.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-400 uppercase tracking-widest">Frontend</p>
              <p className="text-[#00ff88]">React / Next.js with TypeScript</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 uppercase tracking-widest">Backend</p>
              <p className="text-[#00ff88]">Node.js / Express with REST APIs</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 uppercase tracking-widest">Database</p>
              <p className="text-[#00ff88]">PostgreSQL with Prisma ORM</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 uppercase tracking-widest">Services</p>
              <p className="text-[#00ff88]">Redis, Azure, AI APIs</p>
            </div>
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Scalability',
              description: 'Designed to handle growth from hundreds to millions of users with horizontal scaling.',
            },
            {
              title: 'Security',
              description: 'Authentication, authorization, encryption, and secure API design throughout.',
            },
            {
              title: 'Reliability',
              description: 'Error handling, logging, monitoring, and graceful degradation on failures.',
            },
          ].map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 hover:border-[#00ff88]/50 transition-all"
            >
              <h4 className="text-lg font-bold text-white mb-2">{principle.title}</h4>
              <p className="text-sm text-gray-300">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Engineering;
