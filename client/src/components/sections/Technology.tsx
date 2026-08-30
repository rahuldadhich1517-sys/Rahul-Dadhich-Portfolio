import React from 'react';
import SkillGrid from '../ui/SkillGrid';
import { skills } from '../../data/skills';

const Technology: React.FC = () => {

  return (
    <section
      id="technology"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          02 / THE ENGINE
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-8">
          TOOLS I BUILD WITH.
        </h2>

        {/* Skill Grid */}
        <SkillGrid skills={skills} />
      </div>
    </section>
  );
};

export default Technology;