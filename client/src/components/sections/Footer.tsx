import React from 'react';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      label: 'Visit GitHub profile',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'Visit LinkedIn profile',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      label: 'Visit Instagram profile',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hello@rahuldadhich.dev',
      label: 'Send email',
    },
  ];

  return (
    <footer
      className="relative w-full bg-[#F9F9F7] border-t border-[#111111]"
    >
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px border-b border-[#111111]/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 lg:mb-16">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#111111] mb-1">
                RAHUL DADHICH
              </h3>
              <p className="text-sm lg:text-base text-[#737373] font-mono tracking-wider">
                FULL STACK × AI ENGINEER
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#111111] hover:bg-[#F5F5F5] text-[#CC0000] hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px border-b border-[#111111]/20 mb-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Tech Stack */}
          <p className="text-xs lg:text-sm text-[#737373] font-mono">
            Built with
            <span className="text-[#737373] font-mono">React + Node.js</span>
          </p>

          {/* Copyright */}
          <p className="text-xs lg:text-sm text-[#737373]">
            © 2026 Rahul Dadhich
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#111111] hover:bg-[#F5F5F5] transition-colors duration-200"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};