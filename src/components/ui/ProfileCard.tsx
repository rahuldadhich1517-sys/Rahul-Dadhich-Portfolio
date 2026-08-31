import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  isMobile?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isMobile = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Get design system colors
  const getColorVars = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    return {
      accentPrimary: rootStyles.getPropertyValue('--color-accent-primary').trim() || '#c084fc',
      accentPrimaryGlow: rootStyles.getPropertyValue('--color-accent-primary-glow').trim() || 'rgba(192, 132, 252, 0.4)',
      accentSecondary: rootStyles.getPropertyValue('--color-accent-secondary').trim() || '#22d3ee',
      textPrimary: rootStyles.getPropertyValue('--color-text-primary').trim() || '#f5f5f5',
      textSecondary: rootStyles.getPropertyValue('--color-text-secondary').trim() || '#a1a1aa',
      textMuted: rootStyles.getPropertyValue('--color-text-muted').trim() || '#71717a',
      bgPrimary: rootStyles.getPropertyValue('--color-bg-primary').trim() || '#050505',
    };
  };

  let colors = getColorVars();

  // Animated gradient background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Refresh colors in case they changed
    colors = getColorVars();

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.002;

      // Clear canvas
      ctx.fillStyle = 'rgba(5, 5, 5, 0.5)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw animated orb particles using design system accent primary
      for (let i = 0; i < 5; i++) {
        const x = Math.cos(time + i) * 80 + 100;
        const y = Math.sin(time * 0.7 + i) * 60 + 80;
        const radius = 2 + Math.sin(time * 2 + i) * 1.5;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, `${colors.accentPrimary}66`); // 40% opacity
        gradient.addColorStop(1, `${colors.accentPrimary}00`); // 0% opacity

        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius * 3, y - radius * 3, radius * 6, radius * 6);

        // Draw core
        ctx.fillStyle = `${colors.accentPrimary}CC`; // 80% opacity
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;

      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="w-full max-w-sm"
      style={{
        transform: isMobile
          ? 'none'
          : `perspective(1000px) rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * -5}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="relative">
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accentPrimary}1A 0%, ${colors.accentSecondary}0D 100%)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${colors.accentPrimary}33`,
          }}
        />

        {/* Animated background canvas */}
        {!isMobile && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-2xl"
            style={{ opacity: 0.5 }}
          />
        )}

        {/* Content */}
        {/* Content — 3D video intro */}
        <div className="relative p-8 md:p-10 flex flex-col items-center">

          {/* 3D model video */}
          <div
            className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.accentPrimary}33 0%, ${colors.accentSecondary}1A 100%)`,
              border: `2px solid ${colors.accentPrimary}4D`,
            }}
          >
            <video
              src="/rahul-3d.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Soft vignette so the video blends into the card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: `inset 0 0 60px ${colors.bgPrimary}40`,
              }}
            />
          </div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 20px ${colors.accentPrimary}1A`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileCard;
