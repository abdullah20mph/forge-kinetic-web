
import React, { useEffect, useRef } from 'react';

const services = [
  {
    icon: '⚡',
    title: 'MVP Launchpad',
    description: 'Build AI apps, sites, dashboards in 2 weeks',
  },
  {
    icon: '📹',
    title: 'AI Content Studio',
    description: 'Reels, memes, newsletters using AI',
  },
  {
    icon: '🤖',
    title: 'Automation Suite',
    description: 'CRM bots, dashboards, lead gen',
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-slide-up');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive AI solutions designed to accelerate your digital transformation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card opacity-0 translate-y-8 group bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl group-hover:animate-pulse">{service.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6">
                {service.description}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                From $499
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
