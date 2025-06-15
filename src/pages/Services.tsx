
import React, { useEffect, useRef } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Zap, Video, Bot } from 'lucide-react';

const Services = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            
            if (entry.target === servicesRef.current) {
              const serviceCards = entry.target.querySelectorAll('.service-block');
              serviceCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-fade-up');
                }, index * 200);
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [titleRef, servicesRef, pricingRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Zap,
      title: "MVP Launchpad",
      description: "We build web apps, GPT agents, or dashboards in 2 weeks or less.",
      tools: "GPT-4o, Replit, Zapier",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "AI Content Studio",
      description: "We create reels, memes, newsletters, and videos using AI tooling.",
      tools: "Delivered fast, formatted for IG/LinkedIn",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Bot,
      title: "Automation Suite",
      description: "Internal bots, CRM cleanup, dashboard automation — all hands-free.",
      tools: "Custom integrations, workflow optimization",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background with Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div 
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-8">
                What We Deliver —{' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Fast</span>,{' '}
                <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">Smart</span>,{' '}
                <span className="bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent">Beautiful</span>.
              </h1>
            </div>
          </div>
        </section>

        {/* Service Blocks */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={servicesRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="service-block opacity-0 translate-y-8 group cursor-pointer"
                  >
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-white/20">
                      <div className="mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400 font-medium">
                          {service.tools}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Note */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={pricingRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
                <p className="text-2xl md:text-3xl text-white leading-relaxed">
                  Our productized services start from{' '}
                  <span className="font-semibold text-blue-400">$499</span>{' '}
                  and scale with complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={ctaRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Not sure what you need?{' '}
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Let's talk.</span>
                </h2>
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  Book Free Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
