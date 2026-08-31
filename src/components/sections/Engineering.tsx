import React from 'react';

const Engineering: React.FC = () => {

  return (
    <section
      id="engineering"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          03 / ENGINEERING
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-8">
          HOW I BUILD
          <span className="block">SYSTEMS.</span>
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-8 max-w-2xl">
          A modern, scalable architecture designed for performance, reliability, and maintainability. Built with TypeScript end-to-end for type safety and developer experience. The system separates concerns cleanly: frontend UI, API gateway, backend business logic, persistent storage, and optional services like caching and AI integration.
        </p>

        {/* Key Principles */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="p-6 border border-[#111111] hover:bg-[#F5F5F5] transition-colors">
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Scalability</h4>
            <p className="text-sm text-[#737373]">Designed to handle growth from hundreds to millions of users with horizontal scaling.</p>
          </div>
          <div className="p-6 border border-[#111111] hover:bg-[#F5F5F5] transition-colors">
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Security</h4>
            <p className="text-sm text-[#737373]">Authentication, authorization, encryption, and secure API design throughout.</p>
          </div>
          <div className="p-6 border border-[#111111] hover:bg-[#F5F5F5] transition-colors">
            <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Reliability</h4>
            <p className="text-sm text-[#737373]">Error handling, logging, monitoring, and graceful degradation on failures.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Engineering;