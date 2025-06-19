
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const words = ['speed', 'magic', 'efficiency', 'execution', 'innovation'];
  const currentWord = words[currentWordIndex];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Fade out current word
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
      
      // Fade in new word
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 4000); // Longer display time for each word

    return () => clearInterval(interval);
  }, []);

  // Particle system
  const particles = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle-float opacity-60"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 animate-pulse"></div>

        {/* Enhanced Floating Shapes */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Particle System */}
        <div className="absolute inset-0 overflow-hidden">
          {particles}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto px-2 sm:px-4">
        {/* Enhanced Headline with Smooth Text Morphing */}
        <h1 className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight sm:leading-snug">
          <span className="bg-gradient-to-r from-white via-gray-100 to-blue-400 bg-clip-text text-transparent block">
            Ideas deserve{' '}
            <span className="relative inline-block min-w-[200px] sm:min-w-[300px] md:min-w-[400px]">
              <span 
                className={`absolute inset-0 transition-all duration-300 ${
                  isTransitioning 
                    ? 'opacity-0 scale-95 blur-sm' 
                    : 'opacity-100 scale-100 blur-0'
                }`}
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
                  backgroundSize: '200% 200%',
                  animation: isTransitioning 
                    ? 'none' 
                    : 'gradient-wave 3s ease-in-out infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {currentWord}
              </span>
              
              {/* Glitch overlay during transition */}
              {isTransitioning && (
                <span 
                  className="absolute inset-0 text-blue-400 opacity-50 animate-pulse"
                  style={{
                    textShadow: '2px 0 #ff0000, -2px 0 #00ff00',
                    animation: 'glitch 0.3s ease-in-out'
                  }}
                >
                  {currentWord}
                </span>
              )}
              
              {/* Particle burst on word change */}
              {isTransitioning && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-particle-burst"
                      style={{
                        left: `${30 + Math.random() * 40}%`,
                        top: `${30 + Math.random() * 40}%`,
                        animationDelay: `${Math.random() * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </span>
            .
          </span>
          <span className="text-white block mt-4">
            <span 
              className="inline-block animate-typewriter-complete"
              style={{
                animationDelay: '1.5s',
                animationFillMode: 'both'
              }}
            >
              Execution should feel like magic.
            </span>
          </span>
        </h1>

        {/* Enhanced Subheadline */}
        <p className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200 text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-16 max-w-3xl mx-auto leading-relaxed relative">
          <span className="relative">
            We build AI MVPs, content, and automations in 2 weeks or less.
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-spotlight" />
          </span>
        </p>

        {/* Enhanced CTA Button */}
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-400">
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/30 rounded-xl animate-pulse-glow relative overflow-hidden group"
          >
            <span className="relative z-10">Book a Free Discovery Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
          <div className="w-1 h-2.5 sm:w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
