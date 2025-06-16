import React, { useEffect, useRef } from 'react';

export const TrustStrip = () => {
  const stripRef = useRef<HTMLDivElement>(null);

  const logos = [
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Apple",
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Amazon",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Tesla",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
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
    <section ref={stripRef} className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm text-gray-400 mb-8 font-medium">
          Trusted by forward-thinking companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="logo-item opacity-0 translate-y-4 transition-all duration-700 ease-out"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                style={{ maxWidth: 120 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
