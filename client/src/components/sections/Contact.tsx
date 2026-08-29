import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import { usePrefersReducedMotion } from '../../hooks/useReducedMotion';
import { contactCinematicVariants, itemFadeUpVariants, getVariants } from '../../animations/transitionVariants';

export const Contact: React.FC = () => {
  const { formData, isLoading, error, success, handleChange, handleSubmit } =
    useContactForm();
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = getVariants(prefersReducedMotion, contactCinematicVariants);
  const itemVariants = getVariants(prefersReducedMotion, itemFadeUpVariants);

  return (
    <section
      id="contact"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div className="mb-12 lg:mb-20 text-center" variants={itemVariants}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-sm font-mono text-[#00ff88] tracking-wider">09 / CONTACT</div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            USEFUL.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto">
            Have an idea? Let's talk.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-[#00ff88]/20 rounded-xl p-8 lg:p-12 backdrop-blur-xl"
        >
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-lg flex items-start gap-3"
            >
              <CheckCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-400 font-medium">Message transmitted successfully.</p>
                <p className="text-sm text-emerald-300 mt-1">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium">Unable to send message.</p>
                <p className="text-sm text-red-300 mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <label htmlFor="name" className="block text-sm font-mono text-gray-400 uppercase tracking-wider mb-2">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full bg-gray-900/50 border border-[#00ff88]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
                whileFocus={{ borderColor: '#00ff88', boxShadow: '0 0 12px rgba(0, 255, 136, 0.2)' }}
              />
            </motion.div>

            {/* Email Field */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <label
                htmlFor="email"
                className="block text-sm font-mono text-gray-400 uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || success}
                className="w-full bg-gray-900/50 border border-[#00ff88]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
                whileFocus={{ borderColor: '#00ff88', boxShadow: '0 0 12px rgba(0, 255, 136, 0.2)' }}
              />
            </motion.div>

            {/* Message Field */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <label
                htmlFor="message"
                className="block text-sm font-mono text-gray-400 uppercase tracking-wider mb-2"
              >
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading || success}
                rows={5}
                className="w-full bg-gray-900/50 border border-[#00ff88]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                placeholder="Tell me about your project or idea..."
                whileFocus={{ borderColor: '#00ff88', boxShadow: '0 0 12px rgba(0, 255, 136, 0.2)' }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="pt-4"
            >
              <motion.button
                type="submit"
                disabled={isLoading || success}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#00ff88] to-[#00ffff] hover:from-[#00ff88]/80 hover:to-[#00ffff]/80 disabled:from-gray-700 disabled:to-gray-600 text-black font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                    />
                    <span>SENDING...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle size={18} />
                    <span>MESSAGE SENT</span>
                  </>
                ) : (
                  <>
                    <span>START A CONVERSATION</span>
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative pt-4"
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
            </motion.div>

            {/* Alternative Contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-center text-sm text-gray-400"
            >
              <p className="mb-3">Or reach out directly:</p>
              <motion.a
                href="mailto:hello@rahuldadhich.dev"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 text-[#00ff88] hover:text-[#00ff88]/80 font-medium transition-colors"
              >
                <Mail size={16} />
                hello@rahuldadhich.dev
              </motion.a>
            </motion.div>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 lg:mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Based in{' '}
            <span className="text-[#00ff88] font-mono">Your Location</span>
            {' '}• Open to{' '}
            <span className="text-[#00ff88] font-mono">Remote & On-site</span>
            {' '}opportunities
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
