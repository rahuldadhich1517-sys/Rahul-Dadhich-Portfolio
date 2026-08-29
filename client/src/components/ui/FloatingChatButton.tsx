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
          className="absolute inset-0 rounded-full bg-[#00ff88]/20 border border-[#00ff88]/30"
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
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00ffff] text-black shadow-lg shadow-[#00ff88]/50 flex items-center justify-center font-bold text-2xl hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] transition-shadow"
          aria-label="Open AI Assistant"
        >
          <span className="text-2xl">🤖</span>
        </motion.button>

        {/* Label */}
        {!isOpen && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 whitespace-nowrap text-sm text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Ask Rahul AI
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700" />
          </motion.div>
        )}
      </motion.div>

      {/* Chat Panel */}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} isMobile={isMobile} />
    </>
  );
};
