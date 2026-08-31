import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experiences } from "../../data/experience";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          04 / EXPERIENCE
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
          THE PATH SO FAR.
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-12 max-w-2xl">
          A journey through roles, projects, and continuous learning.
        </p>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="group border border-[#111111] p-6 sm:p-8 lg:p-10 hover:bg-[#F5F5F5] transition-colors duration-300 sharp-corners"
            >
              {/* Top Section */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                
                {/* Role & Company */}
                <div>
                  <div className="flex items-center gap-2 text-[#CC0000] mb-4">
                    <Briefcase className="w-5 h-5" />

                    <span className="text-xs font-semibold uppercase tracking-widest">
                      Work Experience
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mb-2">
                    {exp.role}
                  </h3>

                  <p className="text-base sm:text-lg font-medium text-[#737373]">
                    {exp.company}
                  </p>
                </div>

                {/* Duration & Location */}
                <div className="flex flex-col gap-3 text-sm text-[#737373] lg:items-end">
                  
                  {exp.duration && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#CC0000]" />

                      <span>{exp.duration}</span>
                    </div>
                  )}

                  {exp.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#CC0000]" />

                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-[#111111]/20" />

              {/* Description */}
              <p className="text-sm sm:text-base text-[#737373] leading-relaxed mb-8 max-w-4xl">
                {exp.description}
              </p>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">
                  Technologies & Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-[#111111]/30 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#111111] hover:border-[#CC0000] hover:text-[#CC0000] transition-colors"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
