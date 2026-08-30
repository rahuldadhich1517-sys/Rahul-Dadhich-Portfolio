import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <section
      id="resume"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          10 / RESUME
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
          PROFESSIONAL
          <br />
          CREDENTIALS
        </h2>

        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-12 max-w-2ul">
          View and download my professional resume with skills, experience, and achievements.
        </p>

        {/* Resume Card */}
        <div className="relative bg-[#F9F9F7] border border-[#111111] p-6 lg:p-12 rounded-none sharp-corners hover:bg-[#F5F5F5] transition-colors cursor-pointer">
          {/* Resume Header */}
          <div className="mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#CC0000] flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#111111] font-mono">
                  RAHUL DADHICH
                </h3>
                <p className="text-sm lg:text-base text-[#737373] font-mono tracking-wider">
                  FULL STACK × AI ENGINEER
                </p>
              </div>
            </div>
          </div>

          {/* Resume Summary */}
          <div className="mb-8 lg:mb-12 p-6 bg-[#F5F5F5] rounded-lg border border-[#111111]/20">
            <div className="space-y-3 text-[#737373]">
              <p>
                <span className="text-[#CC0000] font-mono">→</span> Full-stack engineer with expertise in modern web technologies
              </p>
              <p>
                <span className="text-[#CC0000] font-mono">→</span> Specialized in AI/ML integration and scalable architecture
              </p>
              <p>
                <span className="text-[#CC0000] font-mono">→</span> Proficient in TypeScript, React, Node.js, and cloud platforms
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* View Resume Button */}
            <button
              className="flex-1 bg-[#111111] text-[#F9F9F7] px-6 py-3 font-semibold uppercase tracking-widest rounded-none hover:bg-[#F9F9F7] hover:text-[#111111] hover:border-[#111111] transition-all duration-200"
              aria-label="View resume in new tab"
            >
              <Eye size={18} className="w-5 h-5" />
              <span className="hidden sm:inline">VIEW RESUME</span>
              <span className="sm:hidden">VIEW</span>
            </button>

            {/* Download Resume Button */}
            <button
              className="flex-1 bg-[#111111] text-[#F9F9F7] px-6 py-3 font-semibold uppercase tracking-widest rounded-none hover:bg-[#F9F9F7] hover:text-[#111111] hover:border-[#111111] transition-all duration-200"
              aria-label="Download resume as text file"
            >
              <Download size={18} className="w-5 h-5" />
              <span className="hidden sm:inline">DOWNLOAD</span>
              <span className="sm:hidden">DL</span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 lg:mt-8 pt-6 border-t border-[#111111]/20 text-center text-xs lg:text-sm text-[#737373]">
            <p>PDF • TXT • Last Updated: August 2026</p>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl text-[#CC0000] mb-3">⚡</div>
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Skills</h4>
            <p className="text-sm text-[#737373]">Full Stack, AI/ML, Architecture</p>
          </div>
          <div>
            <div className="text-3xl text-[#CC0000] mb-3">🎯</div>
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Expertise</h4>
            <p className="text-sm text-[#737373]">Architecture, Performance, UX</p>
          </div>
          <div>
            <div className="text-3xl text-[#CC0000] mb-3">🚀</div>
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Focus</h4>
            <p className="text-sm text-[#737373]">Innovation, Scalability, Quality</p>
          </div>
        </div>
      </div>
    </section>
  );
};