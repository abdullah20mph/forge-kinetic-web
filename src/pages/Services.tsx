
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
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-40 left-32 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-green-50 rounded-full blur-2xl opacity-25" />
      </div>

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div 
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight text-gray-900 mb-8">
                What We Deliver —{' '}
                <span className="italic text-blue-600">Fast</span>,{' '}
                <span className="italic text-purple-600">Smart</span>,{' '}
                <span className="italic text-green-600">Beautiful</span>.
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
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-300">
                      <div className="mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm text-gray-500 font-medium">
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
              <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100">
                <p className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed">
                  Our productized services start from{' '}
                  <span className="font-semibold text-blue-600">$499</span>{' '}
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
                <h2 className="text-3xl md:text-4xl font-light mb-6">
                  Not sure what you need?{' '}
                  <span className="italic">Let's talk.</span>
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
