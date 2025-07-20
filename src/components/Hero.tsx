import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 animate-pulse"></div>

        {/* Floating Shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* Headline */}
        <h1 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight sm:leading-snug">
          <span className="bg-gradient-to-r from-white via-gray-100 to-blue-400 bg-clip-text text-transparent block">
          Don’t Buy AI Tools. Hire AI Employees.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200 text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
        Agentum delivers plug-and-play AI workers — trained to handle support, sales, content, and ops. 24/7, zero overhead.        </p>

        {/* CTA Button */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-400">
          <Button
            onClick={() => window.open('https://calendly.com/abdullah30mph', '_blank')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
Hire Your First AI Employee          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2.5 sm:w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
