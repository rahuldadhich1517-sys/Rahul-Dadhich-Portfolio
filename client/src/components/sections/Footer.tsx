import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      label: 'Visit GitHub profile',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'Visit LinkedIn profile',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      label: 'Visit Instagram profile',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hello@rahuldadhich.dev',
      label: 'Send email',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="relative bg-black border-t border-[#00ff88]/20">
      {/* Gradient glow effect */}
      <div className="absolute inset-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 top-0 h-20 bg-gradient-to-b from-[#00ff88]/5 to-transparent pointer-events-none" />

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 lg:mb-16">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-white font-mono mb-1">
                RAHUL DADHICH
              </h3>
              <p className="text-sm lg:text-base text-[#00ff88] font-mono tracking-wider">
                FULL STACK × AI ENGINEER
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-start md:justify-end">
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#00ff88]/30 hover:border-[#00ff88] text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent mb-12"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Tech Stack */}
          <motion.p variants={itemVariants} className="text-xs lg:text-sm text-gray-500 text-center md:text-left">
            Built with{' '}
            <span className="text-gray-400 font-mono">
              React + Node.js + Three.js
            </span>
          </motion.p>

          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-xs lg:text-sm text-gray-500">
            © 2026 Rahul Dadhich
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToTop}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
              }
            }}
            aria-label="Scroll back to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isScrolling ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0.5, pointerEvents: 'none' }}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#00ff88]/30 hover:border-[#00ff88] text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};
