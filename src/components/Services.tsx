import React, { useEffect, useRef } from 'react';
import { Zap, Video, Bot } from 'lucide-react';
const services = [{
  icon: Zap,
  title: 'MVP Launchpad',
  description: 'Build AI apps, sites, dashboards in 2 weeks',
  gradient: 'from-blue-500 to-cyan-500',
  glowColor: 'blue-500/20'
}, {
  icon: Video,
  title: 'AI Content Studio',
  description: 'Reels, memes, newsletters using AI',
  gradient: 'from-purple-500 to-pink-500',
  glowColor: 'purple-500/20'
}, {
  icon: Bot,
  title: 'Automation Suite',
  description: 'CRM bots, dashboards, lead gen',
  gradient: 'from-green-500 to-emerald-500',
  glowColor: 'green-500/20'
}];
export const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.service-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-slide-up');
            }, index * 200);
          });
        }
      });
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return <section id="services" ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
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
          {services.map((service, index) => {
          const IconComponent = service.icon;
          return <div key={index} className="service-card opacity-0 translate-y-8 group bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden">
                {/* Animated background glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                
                {/* Floating animation background */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Animated icon container */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-${service.glowColor} group-hover:shadow-2xl animate-pulse`}>
                    <IconComponent strokeWidth={2.5} className="w-8 h-8 text-white group-hover:animate-pulse group-hover:scale-110 transition-all duration-300 mx-[90px]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6">
                    {service.description}
                  </p>
                  
                  <p className="text-sm text-gray-500 font-medium group-hover:text-gray-400 transition-colors duration-300">
                    From $499
                  </p>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" />
              </div>;
        })}
        </div>
      </div>
    </section>;
};