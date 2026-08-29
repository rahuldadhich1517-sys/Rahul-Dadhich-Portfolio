import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  isMobile?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ isMobile = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animated gradient background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

      // Draw animated orb particles
      for (let i = 0; i < 5; i++) {
        const x = Math.cos(time + i) * 80 + 100;
        const y = Math.sin(time * 0.7 + i) * 60 + 80;
        const radius = 2 + Math.sin(time * 2 + i) * 1.5;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius * 3, y - radius * 3, radius * 6, radius * 6);

        // Draw core
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
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
            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
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
        <div className="relative p-8 md:p-10">
          {/* Profile image placeholder */}
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-xl mb-6 mx-auto overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 255, 0.1) 100%)',
              border: '2px solid rgba(0, 255, 136, 0.3)',
            }}
          >
            {/* Placeholder avatar */}
            <div className="w-full h-full flex items-center justify-center text-[#00ff88] font-bold text-3xl md:text-4xl">
              RD
            </div>
          </div>

          {/* Name */}
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Rahul Dadhich
          </h3>

          {/* Title */}
          <p className="text-base md:text-lg text-[#00ff88] font-semibold text-center mb-4">
            Full Stack × AI
          </p>

          {/* Divider */}
          <div
            className="h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent mb-4"
          />

          {/* Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <span className="text-sm">📍 Jaipur / India</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-sm text-gray-300">Open to opportunities</span>
            </div>
          </div>

          {/* Social or CTA - optional */}
          <div
            className="pt-4 border-t"
            style={{
              borderColor: 'rgba(0, 255, 136, 0.1)',
            }}
          >
            <p className="text-xs text-gray-400 text-center">
              Let's build something amazing together
            </p>
          </div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 255, 136, 0.1)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProfileCard;
