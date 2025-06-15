
import React, { useEffect, useRef } from 'react';

export const TrustStrip = () => {
  const stripRef = useRef<HTMLDivElement>(null);

  const logos = [
    "Startup Founder",
    "Creator Studio", 
    "Stealth Project",
    "Tech Ventures",
    "AI Labs",
    "Digital Agency"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const logos = entry.target.querySelectorAll('.logo-item');
            logos.forEach((logo, index) => {
              setTimeout(() => {
                logo.classList.add('animate-fade-in');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (stripRef.current) {
      observer.observe(stripRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={stripRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-gray-500 mb-8 font-medium">
          Trusted by forward-thinking companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="logo-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
            >
              <div className="text-gray-400 font-semibold text-lg md:text-xl tracking-wide hover:text-gray-600 transition-colors duration-300 cursor-default">
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
