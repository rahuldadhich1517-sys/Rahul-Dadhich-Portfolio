import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, RefreshCw } from 'lucide-react';
import { useGitHub } from '../../hooks/useGitHub';
import { ContributionLandscape3D } from '../3d/ContributionLandscape';
import { ContributionGrid } from '../ui/ContributionGrid';

export const OpenSource: React.FC = () => {
  const { activity, isLoading, error, refetch } = useGitHub();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      id="open-source"
      className="min-h-screen bg-black relative overflow-hidden px-4 sm:px-8 lg:px-16 py-20 lg:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88]/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section Header */}
        <motion.div className="mb-12 lg:mb-20" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-sm font-mono text-[#00ff88] tracking-wider">07 / OPEN SOURCE</div>
            <div className="h-px flex-grow bg-gradient-to-r from-[#00ff88] to-transparent max-w-xs" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            CODE IN MOTION.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
            GitHub contributions and open source projects showcasing continuous development.
          </p>
        </motion.div>

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            variants={itemVariants}
            className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6 lg:p-8 mb-12 text-yellow-400"
          >
            <p className="mb-2 font-medium">GitHub data unavailable</p>
            <p className="text-sm text-yellow-300 mb-4">
              {error}. Showing fallback view.
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-sm font-medium transition-colors"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Github size={32} className="text-[#00ff88]" />
            </motion.div>
            <p className="text-gray-400">Loading GitHub activity...</p>
          </motion.div>
        )}

        {/* Content */}
        {activity && !isLoading && (
          <>
            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20"
            >
              {/* Public Repositories */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8"
                whileHover={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Public Repositories
                </p>
                <p className="text-4xl lg:text-5xl font-bold text-[#00ff88]">
                  {activity.user.publicRepositories}
                </p>
                <p className="text-sm text-gray-400 mt-2">Open source projects</p>
              </motion.div>

              {/* Total Contributions */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8"
                whileHover={{ borderColor: 'rgba(0, 255, 255, 0.3)' }}
              >
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Total Contributions
                </p>
                <p className="text-4xl lg:text-5xl font-bold text-[#00ffff]">
                  {activity.user.totalContributions.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-2">All time</p>
              </motion.div>

              {/* Followers */}
              <motion.div
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8"
                whileHover={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}
              >
                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                  Followers
                </p>
                <p className="text-4xl lg:text-5xl font-bold text-[#00ff88]">
                  {activity.user.followers}
                </p>
                <p className="text-sm text-gray-400 mt-2">Community</p>
              </motion.div>
            </motion.div>

            {/* Contribution Visualization */}
            <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8">
                Contribution Activity (Last 365 Days)
              </h3>

              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden p-8">
                {isMobile ? (
                  <div className="h-64 sm:h-96">
                    <ContributionGrid contributionData={activity.contributionData} />
                  </div>
                ) : (
                  <div className="h-96 lg:h-[500px]">
                    <ContributionLandscape3D
                      contributionData={activity.contributionData}
                      isMobile={isMobile}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Repositories */}
            {activity.repositories.length > 0 && (
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-8">
                  Featured Repositories
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {activity.repositories.map((repo, index) => (
                    <motion.a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl p-6 lg:p-8 hover:border-[#00ff88]/50 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">
                            {repo.name}
                          </h4>
                          {repo.language && (
                            <p className="text-xs text-gray-500 mt-1">{repo.language}</p>
                          )}
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-gray-500 group-hover:text-[#00ff88] transition-colors ml-2"
                        />
                      </div>

                      {/* Description */}
                      {repo.description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                          {repo.description}
                        </p>
                      )}

                      {/* Stars */}
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>⭐</span>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Last Updated */}
            <motion.div
              variants={itemVariants}
              className="mt-12 text-center text-xs text-gray-500"
            >
              Last updated: {new Date(activity.lastUpdated).toLocaleDateString()}
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
};
