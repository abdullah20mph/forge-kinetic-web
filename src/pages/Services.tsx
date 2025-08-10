import React, { useEffect, useRef } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Zap, Video, Bot, Brain, Layers, BookOpen,Mail } from 'lucide-react';
import AutomationGuide from '@/components/AutomationGuide';
import { services } from '../data/services';

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
      { threshold: 0.1 }
    );

    [titleRef, servicesRef, pricingRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const openCalendly = () => {
    window.open('https://calendly.com/abdullah30mph', '_blank');
  };


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
      {/* What We Deliver — AI Employees Who Are Fast, Smart, and Scalable.
 */}

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div ref={titleRef} className="opacity-0 translate-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-6 sm:mb-8">
              What We Deliver — AI Employees Who Are { ' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Fast</span>,{' '}
                <span className="bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">Smart</span>,{' '}
                <span className="bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent">Scalable</span>.
              </h1>
            </div>
          </div>
        </section>

        {/* Service Blocks */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="service-block relative group opacity-0 translate-y-8 transition-all duration-500 transform hover:scale-[1.03] cursor-pointer"
                  >
                    {/* Glow background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`} />

                    {/* Card content */}
                    <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8 h-full transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                      {/* Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110 border border-white/10 bg-white/5 backdrop-blur-lg">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        {service.description}
                      </p>
                     
                      <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Use Cases:</p>
                        {service.useCases}
                      </p>

                      {/* Tools */}
                      <div className="border-t border-white/10 pt-3 sm:pt-4">
                        <p className="text-xs sm:text-sm text-gray-400 font-medium">{service.tools}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Automation Guide Box */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AutomationGuide />
          </div>
        </section>

        {/* Pricing Note */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div ref={pricingRef} className="opacity-0 translate-y-8">
              <div className="relative group transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 z-10">
                  <p className="text-xl sm:text-2xl md:text-3xl text-white leading-relaxed">
                    Our productized services start from{' '}
                    <span className="font-semibold text-blue-400">$499</span>{' '}
                    and scale with complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            <div ref={ctaRef} className="opacity-0 translate-y-8">
              {/* Animated glowing blur background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 z-0" />

              {/* CTA card */}
              <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 group transition-all duration-500 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                  Not sure what you need?{' '}
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Let's talk.</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  We'll help you scope the right solution — even if you're just getting started.
                </p>
                <Button
                  onClick={openCalendly}
                  className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                >
                  Book Free Strategy Call
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
