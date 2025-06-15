
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    window.location.href = '/contact';
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
            FastForge AI
          </Link>
          
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
          
          <Button 
            onClick={handleGetStarted}
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
