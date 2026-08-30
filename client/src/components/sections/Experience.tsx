import React from 'react';
import { experiences } from '../../data/experience';

const Experience: React.FC = () => {

  return (
    <section
      id="experience"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          05 / EXPERIENCE
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-8">
          THE PATH SO FAR.
        </h2>

        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-12 max-w-2ul">
          A journey through roles, projects, and continuous learning.
        </p>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-[#111111] rounded-none p-6 lg:p-12 hover:bg-[#F5F5F5] transition-colors sharp-corners"
            >
              <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">
                {exp.role}
              </h3>
              <p className="text-sm text-[#737373] mb-3">
                {exp.company}
              </p>
              <p className="text-sm text-[#737373]">
                {exp.duration || 'Ongoing'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;