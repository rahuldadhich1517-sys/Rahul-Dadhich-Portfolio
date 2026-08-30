import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
}

const DESKTOP_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#technology' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#engineering' },
];

const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#technology' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#engineering' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Handle smooth scroll to section
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Keyboard accessibility for mobile menu
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="navbar"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo" aria-label="Rahul Dadhich - Home">
            <span className="navbar__logo-text">RD.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="navbar__desktop-nav" aria-hidden={isMobileMenuOpen}>
            <ul className="navbar__list" role="menubar">
              {DESKTOP_NAV_ITEMS.map((item, index) => (
                <li key={item.label} role="none">
                  <motion.a
                    href={item.href}
                    className="navbar__link"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop CTA */}
          <div className="navbar__cta desktop-only" aria-hidden={isMobileMenuOpen}>
            <motion.a
              href="#resume"
              className="btn btn--primary btn--sm navbar__btn"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#resume');
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Resume</span>
              <ArrowRight className="navbar__btn-icon" aria-hidden="true" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar__mobile-toggle mobile-only"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }
            }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="navbar__mobile-icon" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="navbar__mobile-icon" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="navbar__mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              className="navbar__mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              onKeyDown={handleKeyDown}
            >
              <div className="navbar__mobile-content">
                <div className="navbar__mobile-header">
                  <a href="/" className="navbar__logo" aria-label="Rahul Dadhich - Home">
                    <span className="navbar__logo-text">RD.</span>
                  </a>
                </div>

                <ul className="navbar__mobile-list" role="menu">
                  {MOBILE_NAV_ITEMS.map((item, index) => (
                    <li key={item.label} role="none">
                      <motion.a
                        href={item.href}
                        className="navbar__mobile-link"
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                      >
                        {item.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>

                <div className="navbar__mobile-cta">
                  <motion.a
                    href="#resume"
                    className="btn btn--primary btn--lg navbar__mobile-btn"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#resume');
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Resume</span>
                    <ArrowRight className="navbar__btn-icon" aria-hidden="true" />
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="btn btn--secondary btn--lg navbar__mobile-btn"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Contact</span>
                    <ArrowRight className="navbar__btn-icon" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}