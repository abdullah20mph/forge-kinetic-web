
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
            
            if (quote) {
              setTimeout(() => {
                quote.classList.add('animate-zoom-fade-in');
              }, 300);
            }
            
            if (paragraph) {
              setTimeout(() => {
                paragraph.classList.add('animate-fade-in');
              }, 800);
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

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-gray-600/20 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Quote */}
        <blockquote className="quote-text opacity-0 scale-95 mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            "We're building a world where{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ideas don't wait.
            </span>
            "
          </h2>
        </blockquote>

        {/* Supporting Paragraph */}
        <div className="quote-paragraph opacity-0 translate-y-4">
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We believe speed is freedom. We use AI to help creators and startups ship MVPs fast, 
            tell better stories, and automate the boring parts.
          </p>
        </div>
      </div>
    </section>
  );
};
