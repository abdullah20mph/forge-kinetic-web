import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // optional: lucide icons for menu toggle

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleGetStarted = () => {
    window.location.href = '/get-started';
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="relative z-10 text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-105 hover:from-blue-200 hover:to-blue-300 active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Agentum AI
          </Link>

          {/* Desktop nav items */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white/80 hover:text-white transition-colors duration-300 relative group text-sm lg:text-base"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Get Started button */}
          <div className="hidden md:block">
            <Button 
              onClick={handleGetStarted}
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white/90 hover:text-blue-400 transition-colors duration-300 text-base"
              >
                {item.name}
              </Link>
            ))}
            <Button 
              onClick={handleGetStarted}
              className="mt-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-sm"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
