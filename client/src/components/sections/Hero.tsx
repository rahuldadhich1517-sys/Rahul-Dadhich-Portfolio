// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768);
    });
    return () => window.removeEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative h-full w-full flex items-center">
        <div className={`${isMobile ? 'w-full px-4 sm:px-6 text-center' : 'w-1/2 px-8 md:px-12'} flex flex-col justify-center relative z-10`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#F9F9F7]/backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-#CC0000 animate-pulse" />
            <span className="text-sm font-medium text-#CC0000 tracking-wider">01 / BUILDING</span>
          </div>

          <div className="mb-6 mt-4">
            {['BUILDING', 'DIGITAL', 'EXPERIENCES.'].map((word, index) => (
              <div
                key={index}
                className="text-5xl sm:text-6xl lg:text-9xl font-serif text-[#111111] leading-[0.9] tracking-tighter break-words"
              >
                {word}
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#737373] max-w-sm sm:max-w-md mb-8 leading-relaxed">
            I build scalable web applications, modern interfaces and intelligent AI-powered systems.
          </p>

          <div className="flex gap-4 flex-col sm:flex-row">
            <a href="#projects" className="btn btn--primary">
              Explore My Work <ArrowRight className="btn__icon" aria-hidden="true" />
            </a>
            <a href="#resume" className="btn btn--secondary">View Resume</a>
          </div>
        </div>

        <div className="w-1/2 h-full flex items-center justify-center relative">
          Resume section content area
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[#CC0000] text-sm"
        variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } } }}
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className="font-medium tracking-widest">01</span>
        <span>SCROLL TO EXPLORE →</span>
      </motion.div>
    </section>
  );
};

export default Hero;