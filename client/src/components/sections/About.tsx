import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from '../ui/ProfileCard';
import AnimatedCounter from '../ui/AnimatedCounter';

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
      },
    },
  };

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-black overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Label */}
        <motion.div
          variants={labelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 md:mb-8"
        >
          <span className="text-sm md:text-base font-mono text-[#00ff88] tracking-widest">
            01 / ABOUT
          </span>
        </motion.div>

        {/* Main Content */}
        <div className={`grid gap-12 md:gap-16 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-start"
          >
            {/* Headline */}
            <motion.div
              variants={headlineVariants}
              className="mb-8 md:mb-12"
            >
              {['I BUILD THINGS', 'THAT LIVE', 'BETWEEN CODE', 'AND CREATIVITY.'].map((line, index) => (
                <motion.h2
                  key={index}
                  variants={wordVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2"
                >
                  {line}
                </motion.h2>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={descriptionVariants}
              className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md mb-12 md:mb-16"
            >
              I'm Rahul Dadhich, a Full Stack Developer focused on building scalable web applications, modern interfaces and AI-powered experiences.
            </motion.p>

            {/* Statistics */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-6 md:gap-8"
            >
              <StatCard
                number={2}
                suffix="+"
                label="Years Experience"
                delay={0.6}
              />
              <StatCard
                number={10}
                suffix="+"
                label="Projects"
                delay={0.7}
              />
              <StatCard
                number={15}
                suffix="+"
                label="Technologies"
                delay={0.8}
              />
              <StatCard
                number={Infinity}
                suffix=""
                label="Things Building"
                isInfinity={true}
                delay={0.9}
              />
            </motion.div>
          </motion.div>

          {/* Right side - Profile Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start justify-center md:justify-end"
          >
            <ProfileCard isMobile={isMobile} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  delay: number;
  isInfinity?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  number,
  suffix,
  label,
  delay,
  isInfinity = false,
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-start"
    >
      <div className="relative mb-3">
        {isInfinity ? (
          <span className="text-3xl md:text-4xl font-bold text-[#00ff88]">∞</span>
        ) : (
          <div className="flex items-baseline gap-1">
            <AnimatedCounter
              target={number}
              isInView={isInView}
              className="text-3xl md:text-4xl font-bold text-[#00ff88]"
            />
            <span className="text-2xl md:text-3xl font-bold text-[#00ff88]">{suffix}</span>
          </div>
        )}
      </div>
      <span className="text-sm md:text-base text-gray-400 font-medium tracking-wide">{label}</span>
    </motion.div>
  );
};

export default About;
