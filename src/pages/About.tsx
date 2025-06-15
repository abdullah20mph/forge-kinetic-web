
import React, { useEffect, useRef, useState } from 'react';
import { Zap, Layers, Brain } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const About = () => {
  const headlineRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            
            if (entry.target === valuesRef.current) {
              const cards = entry.target.querySelectorAll('.value-card');
              cards.forEach((card, index) => {
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

    [headlineRef, missionRef, valuesRef, founderRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Zap,
      title: "Speed",
      description: "Ship fast, iterate faster. Every day waiting is opportunity lost."
    },
    {
      icon: Layers,
      title: "Simplicity",
      description: "Complex problems need elegant solutions. We cut through the noise."
    },
    {
      icon: Brain,
      title: "Intelligence",
      description: "AI that thinks with you, not for you. Augment human creativity."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-50 rounded-full blur-2xl opacity-25 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <main className="relative z-10">
        {/* Headline Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div 
              ref={headlineRef}
              className="opacity-0 translate-y-8 scale-95"
            >
              <h1 className="text-6xl md:text-8xl font-serif font-light leading-tight text-gray-900 mb-8">
                We're building a world where{' '}
                <span className="italic text-blue-600">ideas</span>{' '}
                don't wait.
              </h1>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={missionRef}
              className="opacity-0 translate-y-12"
            >
              <p className="text-2xl md:text-3xl leading-relaxed text-gray-700 font-light">
                We believe speed is freedom. AI should be a launch tool, not a luxury. 
                We help early-stage builders go from idea to impact — fast, beautifully, 
                and without bottlenecks.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={valuesRef}
              className="grid md:grid-cols-3 gap-16"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="value-card opacity-0 translate-y-8 text-center group cursor-pointer"
                  >
                    <div className="mb-8 flex justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-600 transition-colors duration-300 relative">
                      {value.title}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Quote Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            <div 
              ref={founderRef}
              className="opacity-0 translate-y-8"
            >
              <blockquote className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-8 italic">
                "What if building didn't feel like waiting?"
              </blockquote>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  After watching countless brilliant ideas die in development hell, 
                  we knew there had to be a better way.
                </p>
                <p>
                  FastForge AI was born from the belief that creation should be as fast as inspiration. 
                  We're here to make that reality.
                </p>
              </div>
              <div className="mt-8 text-sm text-gray-500 font-medium">
                — The FastForge Team
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
