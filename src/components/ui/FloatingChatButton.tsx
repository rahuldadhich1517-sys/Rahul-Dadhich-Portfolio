import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatPanel } from './ChatPanel';

export const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const buttonVariants = {
    idle: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
  };

  const pulseVariants = {
    idle: { scale: 1, opacity: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {/* Pulse background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-accent-primary/20 border border-accent-primary/30"
          variants={pulseVariants}
          animate={isOpen ? 'idle' : 'pulse'}
        />

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          variants={buttonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="tap"
          className="relative w-16 h-16 rounded-full bg-gradient-primary text-bg-primary shadow-lg shadow-accent-primary/50 flex items-center justify-center font-bold text-2xl hover:shadow-[0_0_30px_var(--color-accent-primary-glow-strong)] transition-shadow"
          aria-label="Open AI Assistant"
        >
          <span className="text-2xl">🤖</span>
        </motion.button>

        {/* Label */}
        {!isOpen && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-bg-card border border-border-primary rounded-lg px-3 py-2 whitespace-nowrap text-sm text-text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Ask Rahul AI
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-bg-card rotate-45 border-r border-b border-border-primary" />
          </motion.div>
        )}
      </motion.div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} isMobile={isMobile} />
    </>
  );
};
