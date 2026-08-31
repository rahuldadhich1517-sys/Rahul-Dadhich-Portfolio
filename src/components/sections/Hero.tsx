import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen bg-background text-foreground overflow-hidden sharp-corners"
      style={{ paddingTop: '74px' }}
    >
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Main Column */}
          <div className="md:col-span-7 py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 border-r border-border-primary md:border-r">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Kicker */}
              <div className="section-kicker mb-8 md:mb-12">
                <span>Issue 01 / 2026</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-snug font-bold mb-6 md:mb-8">
                Building Digital Experiences
              </h1>

              {/* Subhead */}
              <p className="font-mono text-xs md:text-sm tracking-widest text-text-muted mb-6 uppercase">
                Software Developer • AI Engineer • Content Creator
              </p>

              {/* Introduction */}
              <p className="text-base md:text-lg leading-relaxed text-text-muted max-w-md mb-8 md:mb-12">
                I craft scalable web applications, thoughtful interfaces, and intelligent systems. Currently exploring the intersection of AI and product design.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16">
                <a href="#projects" className="btn btn--primary">
                  View Work <ArrowRight className="btn__icon" aria-hidden="true" />
                </a>
                <a href="#contact" className="btn btn--secondary">
                  Get In Touch
                </a>
              </div>

              {/* Availability Badge */}
              <div className="border border-border-primary p-4 md:p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-block w-2 h-2 bg-accent"></span>
                  <span className="font-mono text-xs tracking-widest text-accent uppercase">Available for projects</span>
                </div>
                <p className="text-sm text-text-muted">
                  Open to freelance, contract, and full-time opportunities in web development, AI integration, and product design.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats/Quick Info */}
          <div className="md:col-span-5 hidden md:flex items-center justify-center py-24 lg:py-32 px-8 bg-surface border-l border-border-primary">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="space-y-12 text-center md:text-left">
                <div className="border-b border-border-subtle pb-8">
                  <div className="text-4xl font-bold font-serif text-accent mb-2">50+</div>
                  <p className="text-sm text-text-muted tracking-wide">Projects Delivered</p>
                </div>
                <div className="border-b border-border-subtle pb-8">
                  <div className="text-4xl font-bold font-serif text-accent mb-2">8+</div>
                  <p className="text-sm text-text-muted tracking-wide">Years Experience</p>
                </div>
                <div>
                  <div className="text-4xl font-bold font-serif text-accent mb-2">10+</div>
                  <p className="text-sm text-text-muted tracking-wide">Technologies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Scroll to explore</p>
          <ChevronDown size={20} className="mx-auto text-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
