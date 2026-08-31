import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectBySlug, projects } from '../../data/projects';
import ArchitectureFlow from '../ui/ArchitectureFlow';

const ProjectCaseStudy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      const index = projects.findIndex((p) => p.slug === slug);
      setCurrentIndex(index);
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6" style={{ backgroundColor: '#050505' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#050505' }}>
      {/* Hero Header */}
      <div className="relative py-12 md:py-20 px-6 md:px-12 border-b border-[#00ff88]/20">
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-[#00ff88] hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Project number and category */}
            <motion.div variants={itemVariants} className="mb-4 flex items-center gap-4">
              <span className="text-sm font-mono text-gray-400 tracking-widest uppercase">
                PROJECT / {String(currentIndex + 1).padStart(2, '0')}
              </span>
              {project.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#00ff88] border border-[#00ff88]/30 bg-[#00ff88]/5">
                  {project.category}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {project.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed"
            >
              {project.longDescription || project.description}
            </motion.p>

            {/* Technologies */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black border border-[#00ff88]/50 text-[#00ff88] font-semibold rounded-lg hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-all"
                >
                  <Github size={18} />
                  View Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-all"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </motion.div>

            {/* Meta information */}
            {(project.year || project.role || project.team) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 md:gap-12 pt-8 mt-8 border-t border-[#00ff88]/20"
              >
                {project.year && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Year
                    </p>
                    <p className="text-lg font-semibold text-white">{project.year}</p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Role
                    </p>
                    <p className="text-lg font-semibold text-white">{project.role}</p>
                  </div>
                )}
                {project.team && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                      Team
                    </p>
                    <p className="text-lg font-semibold text-white">{project.team}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-[#00ff88]/20 h-96 md:h-[500px]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* The Problem Section */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  THE PROBLEM
                </h2>
                <div className="h-1 w-16 bg-[#00ff88]" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5"
                  >
                    <div className="flex gap-4">
                      <span className="text-[#00ff88] font-bold flex-shrink-0 text-xl">
                        ●
                      </span>
                      <p className="text-gray-300 leading-relaxed">{challenge}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* The Solution Section */}
          {project.solutions && project.solutions.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  THE SOLUTION
                </h2>
                <div className="h-1 w-16 bg-[#00ff88]" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {project.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5"
                  >
                    <div className="flex gap-4">
                      <span className="text-[#00ff88] font-bold flex-shrink-0 text-xl">
                        ✓
                      </span>
                      <p className="text-gray-300 leading-relaxed">{solution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Architecture Section */}
          {project.architecture && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  ARCHITECTURE
                </h2>
                <div className="h-1 w-16 bg-[#00ff88]" />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 rounded-xl border border-[#00ff88]/20 bg-gradient-to-br from-[#00ff88]/5 to-[#00ff88]/0"
              >
                <p className="text-gray-300 leading-relaxed mb-8">
                  {project.architecture}
                </p>

                {/* Architecture Flow Visualization */}
                <ArchitectureFlow project={project} />
              </motion.div>
            </motion.section>
          )}

          {/* Technology Stack Section */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  TECHNOLOGY STACK
                </h2>
                <div className="h-1 w-16 bg-[#00ff88]" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 text-center hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10 transition-all"
                  >
                    <p className="text-sm font-semibold text-[#00ff88]">{tech}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Results Section */}
          {project.results && project.results.length > 0 && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  RESULTS
                </h2>
                <div className="h-1 w-16 bg-[#00ff88]" />
              </div>

              <div className="p-8 rounded-xl border border-[#00ff88]/30 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5">
                <div className="grid md:grid-cols-2 gap-6">
                  {project.results.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start"
                    >
                      <span className="text-[#00ff88] font-bold text-2xl flex-shrink-0 mt-1">
                        ✓
                      </span>
                      <p className="text-gray-300 text-lg">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* External Links */}
          {(project.liveUrl || project.githubUrl) && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4 pt-8 border-t border-[#00ff88]/20"
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black border border-[#00ff88]/50 text-[#00ff88] font-semibold rounded-lg hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-all"
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff88] text-black font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-all"
                >
                  <ExternalLink size={18} />
                  Visit Live Project
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Project Navigation */}
      <div className="border-t border-[#00ff88]/20 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Previous Project */}
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group p-6 rounded-lg border border-[#00ff88]/20 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <ChevronLeft
                    size={20}
                    className="text-[#00ff88] group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    Previous Project
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
                  {prevProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}

            {/* Next Project */}
            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group p-6 rounded-lg border border-[#00ff88]/20 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5 transition-all text-right"
              >
                <div className="flex items-center justify-end gap-3 mb-3">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    Next Project
                  </span>
                  <ChevronRight
                    size={20}
                    className="text-[#00ff88] group-hover:translate-x-1 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00ff88] transition-colors">
                  {nextProject.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
