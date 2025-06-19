
import React, { useEffect, useRef } from 'react';

export const Quote = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const quote = entry.target.querySelector('.quote-text');
            const paragraph = entry.target.querySelector('.quote-paragraph');
            const words = entry.target.querySelectorAll('.word-reveal');
            
            if (quote) {
              setTimeout(() => {
                quote.classList.add('animate-zoom-fade-in');
              }, 300);
            }
            
            // Staggered word reveal
            words.forEach((word, index) => {
              setTimeout(() => {
                word.classList.add('animate-fade-up');
                word.classList.remove('opacity-0', 'translate-y-4');
              }, 500 + index * 100);
            });
            
            if (paragraph) {
              setTimeout(() => {
                paragraph.classList.add('animate-fade-in');
              }, 1200);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quoteWords = "We're building a world where ideas don't wait.".split(' ');

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Enhanced animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-gray-600/20 to-blue-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Parallax particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Enhanced Main Quote with word-by-word reveal */}
        <blockquote className="quote-text opacity-0 scale-95 mb-12 relative">
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            <span className="inline-block">"</span>
            {quoteWords.slice(0, -3).map((word, index) => (
              <span 
                key={index}
                className="word-reveal opacity-0 translate-y-4 transition-all duration-500 inline-block mr-2"
              >
                {word}
              </span>
            ))}
            <span className="relative inline-block">
              {quoteWords.slice(-3).map((word, index) => (
                <span 
                  key={index}
                  className="word-reveal opacity-0 translate-y-4 transition-all duration-500 inline-block mr-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-wave"
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  {word}
                </span>
              ))}
              <span className="inline-block">"</span>
              
              {/* Spotlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spotlight opacity-0 group-hover:opacity-100" />
            </span>
          </h2>
          
          {/* Quote decoration */}
          <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-blue-500/30 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 border-r-4 border-b-4 border-blue-500/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </blockquote>

        {/* Enhanced Supporting Paragraph */}
        <div className="quote-paragraph opacity-0 translate-y-4 relative">
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed relative">
            <span className="relative">
              We believe speed is freedom. We use AI to help creators and startups ship MVPs fast, 
              tell better stories, and automate the boring parts.
              
              {/* Text highlight effect */}
              <div className="absolute inset-0">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-spotlight opacity-0" />
              </div>
            </span>
          </p>
          
          {/* Underline animation */}
          <div className="mx-auto mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 transition-transform duration-1000 delay-1000" 
               style={{ animation: 'scale-in 1s ease-out 2s forwards' }}></div>
        </div>

        {/* Floating elements around the quote */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-40"></div>
          <div className="absolute top-3/4 right-10 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-50" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </section>
  );
};
