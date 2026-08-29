import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

export const Resume: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate 3D tilt angles (only on desktop)
  const rotateX = isMobile ? 0 : (mousePosition.y - (cardRef.current?.clientHeight || 0) / 2) / 10;
  const rotateY = isMobile ? 0 : (mousePosition.x - (cardRef.current?.clientWidth || 0) / 2) / 10;

  const handleViewResume = () => {
    // Open resume in new tab (you can serve from public folder or external link)
    window.open('/resume.txt', '_blank');
  };

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.txt';
    link.download = 'Rahul_Dadhich_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="resume"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00ffff]/5 via-transparent to-[#00ff88]/5 pointer-events-none" />

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#00ff88]/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div className="mb-16 lg:mb-24 text-center" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText size={20} className="text-[#00ff88]" />
            <span className="text-sm font-mono text-[#00ff88] tracking-wider uppercase">
              10 / RESUME
            </span>
            <FileText size={20} className="text-[#00ff88]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            PROFESSIONAL
            <br />
            CREDENTIALS
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            View and download my professional resume with skills, experience, and achievements.
          </p>
        </motion.div>

        {/* Premium Resume Card */}
        <motion.div
          variants={itemVariants}
          className="perspective"
          style={{
            perspective: '1200px',
          }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/50 border border-[#00ff88]/30 rounded-2xl p-8 lg:p-12 backdrop-blur-2xl overflow-hidden group ${
              !isMobile ? 'cursor-pointer' : ''
            }`}
          >
            {/* Animated border glow on hover */}
            <motion.div
              animate={isHovering && !isMobile ? { opacity: 1 } : { opacity: 0 }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 via-transparent to-[#00ffff]/20 pointer-events-none"
            />

            {/* Light effect that follows cursor (desktop only) */}
            {!isMobile && isHovering && (
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 50%)`,
                }}
              />
            )}

            {/* Card Content */}
            <div className="relative z-10">
              {/* Resume Header */}
              <motion.div
                animate={isHovering && !isMobile ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-8 lg:mb-12"
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ffff] flex items-center justify-center">
                    <FileText size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white font-mono">
                      RAHUL DADHICH
                    </h3>
                    <p className="text-sm lg:text-base text-[#00ff88] font-mono tracking-wider">
                      FULL STACK × AI ENGINEER
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Resume Preview Section */}
              <motion.div
                animate={isHovering && !isMobile ? { y: -5 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-8 lg:mb-12 p-6 bg-gray-900/50 rounded-lg border border-[#00ff88]/20"
              >
                <div className="space-y-3 text-gray-300">
                  <p className="text-sm lg:text-base">
                    <span className="text-[#00ff88] font-mono">→</span> Full-stack engineer with
                    expertise in modern web technologies
                  </p>
                  <p className="text-sm lg:text-base">
                    <span className="text-[#00ff88] font-mono">→</span> Specialized in AI/ML
                    integration and scalable architecture
                  </p>
                  <p className="text-sm lg:text-base">
                    <span className="text-[#00ff88] font-mono">→</span> Proficient in TypeScript,
                    React, Node.js, and cloud platforms
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                animate={isHovering && !isMobile ? { y: -5 } : { y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* View Resume Button */}
                <motion.button
                  onClick={handleViewResume}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleViewResume();
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View resume in new tab"
                  className="flex-1 bg-gradient-to-r from-[#00ffff] to-[#00ff88] hover:from-[#00ffff]/80 hover:to-[#00ff88]/80 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Eye size={18} />
                  <span className="hidden sm:inline">VIEW RESUME</span>
                  <span className="sm:hidden">VIEW</span>
                </motion.button>

                {/* Download Resume Button */}
                <motion.button
                  onClick={handleDownloadResume}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDownloadResume();
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Download resume as text file"
                  className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 border border-[#00ff88]/30"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">DOWNLOAD</span>
                  <span className="sm:hidden">DL</span>
                </motion.button>
              </motion.div>

              {/* Footer Info */}
              <motion.div
                animate={isHovering && !isMobile ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mt-6 lg:mt-8 pt-6 border-t border-gray-700/50 text-center text-xs lg:text-sm text-gray-500"
              >
                <p>PDF • TXT • Last Updated: August 2026</p>
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#00ff88]/30 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#00ffff]/30 rounded-tl-3xl pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Additional Info Grid */}
        <motion.div
          variants={itemVariants}
          className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '⚡',
              title: 'Skills',
              description: 'Full Stack, AI/ML, 3D Graphics',
            },
            {
              icon: '🎯',
              title: 'Expertise',
              description: 'Architecture, Performance, UX',
            },
            {
              icon: '🚀',
              title: 'Focus',
              description: 'Innovation, Scalability, Quality',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-[#00ff88]/20 rounded-lg text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
