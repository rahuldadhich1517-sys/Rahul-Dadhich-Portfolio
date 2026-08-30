import React, { useRef, useEffect } from 'react';

interface HeroBackgroundProps {
  scrollProgress?: number;
}

const HeroBackground: React.FC<HeroBackgroundProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get CSS variable values for colors
    const getColorVars = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      return {
        bgPrimary: rootStyles.getPropertyValue('--color-bg-primary').trim() || '#050505',
        accentSecondary: rootStyles.getPropertyValue('--color-accent-secondary').trim() || '#22d3ee',
      };
    };

    let colors = getColorVars();

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation state
    let time = 0;

    const animate = () => {
      time += 0.0005;

      // Clear canvas
      ctx.fillStyle = colors.bgPrimary;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle gradient lines
      ctx.strokeStyle = `${colors.accentSecondary}08`; // ~3% opacity
      ctx.lineWidth = 1;

      for (let i = 0; i < 3; i++) {
        const offset = time * 50 + i * 200;
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset - canvas.height * 0.5, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(offset + 400, 0);
        ctx.lineTo(offset + 400 - canvas.height * 0.5, canvas.height);
        ctx.stroke();
      }

      // Draw subtle grid
      ctx.strokeStyle = `${colors.accentSecondary}03`; // ~1% opacity
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw corner accents
      ctx.strokeStyle = `${colors.accentSecondary}1A`; // ~10% opacity
      ctx.lineWidth = 2;

      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(80, 30);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(30, 80);
      ctx.stroke();

      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 30, 30);
      ctx.lineTo(canvas.width - 80, 30);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width - 30, 30);
      ctx.lineTo(canvas.width - 30, 80);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.5,
      }}
    />
  );
};

export default HeroBackground;
