import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isMobile = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // 3D tilt effect on desktop only (disabled on touch devices)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: none)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotationX = ((y - centerY) / centerY) * 3;
    const rotationY = ((centerX - x) / centerX) * 3;

    setTilt({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    },
  };

  const isAlternate = index % 2 === 1;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid gap-6 md:gap-10 items-center ${
        isAlternate ? 'md:grid-cols-2 md:[direction:rtl]' : 'md:grid-cols-2'
      }`}
    >
      {/* Content side */}
      <div className="flex flex-col justify-between">
        {/* Project number */}
        <div className="mb-6">
          <span className="text-6xl md:text-7xl font-bold text-[#00ff88]/20 leading-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold text-[#00ff88] border border-[#00ff88]/30"
              style={{ backgroundColor: 'rgba(0, 255, 136, 0.05)' }}
            >
              {project.category}
            </span>
            {project.year && (
              <span className="text-xs text-gray-400">{project.year}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-3 py-1 text-xs text-gray-400">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 flex-wrap">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00ff88] text-black font-semibold hover:bg-[#00ff88]/90 transition-all duration-300"
          >
            View Case Study
            <ArrowUpRight size={18} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#00ff88]/50 text-[#00ff88] font-semibold hover:border-[#00ff88] hover:bg-[#00ff88]/10 transition-all duration-300"
            >
              Live Demo
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Image side - with 3D tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-80 md:h-96 rounded-xl overflow-hidden group"
        style={{
          perspective: '1000px',
          transform: isMobile
            ? 'none'
            : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: !isMobile ? 'transform 0.1s ease-out' : 'none',
        }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 200, 0.05) 100%)`,
          }}
        />

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setIsImageLoaded(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />

        {/* Loading placeholder */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5 animate-pulse" />
        )}

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10"
          style={{
            boxShadow: 'inset 0 0 30px rgba(0, 255, 136, 0)',
          }}
        />

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-5"
          style={{
            boxShadow: 'inset 0 0 40px rgba(0, 255, 136, 0.1)',
          }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#00ff88]/20 border border-[#00ff88] rounded-full text-xs font-semibold text-[#00ff88] backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
