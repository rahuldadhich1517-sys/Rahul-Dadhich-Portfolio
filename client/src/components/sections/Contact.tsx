import React from 'react';
import { Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-[#F9F9F7] overflow-hidden sharp-corners"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#111111]/20 bg-[#CC0000]/20 text-[#CC0000] tracking-widest uppercase text-xs mb-8">
          09 / CONTACT
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight mb-6">
          LET'S BUILD
          <br />
          SOMETHING
          <br />
          USEFUL.
        </h2>

        <p className="text-base md:text-lg text-[#737373] leading-relaxed mb-12 max-w-2xl">
          Have an idea? Let's talk.
        </p>

        {/* Form */}
        <form className="space-y-6 max-w-lg">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#737373] uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full border border-[#111111] bg-transparent px-3 py-2 text-[#111111] font-medium resize-none focus:outline-none focus:border-[#CC0000] transition-colors"
              placeholder="Tell me about your project or idea..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#111111] text-[#F9F9F7] px-6 py-3 font-semibold uppercase tracking-widest rounded-none hover:bg-[#F9F9F7] hover:text-[#111111] hover:border-[#111111] transition-all duration-200"
          >
            START A CONVERSATION
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 border-t border-[#111111]/20" />

        {/* Alternative Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#737373]">
            Or reach out directly:
          </p>
          <div className="mt-2 flex gap-2 justify-center">
            <Mail className="w-5 h-5 text-[#CC0000]" />
            <a href="mailto:hello@rahuldadhich.dev" className="text-[#CC0000] font-medium hover:underline">
              hello@rahuldadhich.dev
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};