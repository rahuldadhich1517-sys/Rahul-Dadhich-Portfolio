import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, isMobile = false }) => {
  const { messages, isLoading, error, sendMessage, clearMessages, isServiceReady } = useChat();
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      await sendMessage(inputValue);
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const panelVariants = {
    hidden: isMobile 
      ? { y: '100%' } 
      : { x: '100%' },
    visible: isMobile
      ? { y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 300 } }
      : { x: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 300 } },
    exit: isMobile
      ? { y: '100%' }
      : { x: '100%' },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            className={`fixed z-50 bg-gray-900 border-l border-gray-800 flex flex-col ${
              isMobile
                ? 'inset-0 bottom-0 rounded-t-2xl'
                : 'right-0 top-0 bottom-0 w-full sm:w-96 rounded-l-2xl'
            }`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <motion.div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <h2 className="text-lg font-bold text-white">Ask Rahul</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </motion.div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <span className="text-4xl mb-4">🤖</span>
                  <p className="text-gray-400 mb-2">Hi! I'm Rahul's AI assistant.</p>
                  <p className="text-sm text-gray-500">
                    Ask me about his skills, projects, experience, or anything related to his portfolio.
                  </p>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-[#00ff88]/20 border border-[#00ff88]/50 text-white'
                        : 'bg-gray-800 border border-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                    <p className="text-xs text-gray-500 mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2 h-2 bg-[#00ff88] rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#00ff88] rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#00ff88] rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg px-4 py-3 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="border-t border-gray-800 p-4 bg-gray-900/50 backdrop-blur-sm"
            >
              {!isServiceReady && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 rounded-lg px-3 py-2 text-xs mb-3"
                >
                  AI service is not configured. Check your API key.
                </motion.div>
              )}

              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me something..."
                  disabled={isLoading || !isServiceReady}
                  className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff88]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !inputValue.trim() || !isServiceReady}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00ff88] hover:bg-[#00ff88]/80 disabled:bg-gray-700 text-black disabled:text-gray-500 rounded-lg p-2 font-medium transition-colors disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </motion.button>
              </div>

              {/* Clear button */}
              {messages.length > 0 && (
                <motion.button
                  type="button"
                  onClick={() => clearMessages()}
                  disabled={isLoading}
                  className="w-full mt-2 text-xs text-gray-500 hover:text-gray-400 disabled:opacity-50 transition-colors"
                >
                  Clear conversation
                </motion.button>
              )}
            </motion.form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
