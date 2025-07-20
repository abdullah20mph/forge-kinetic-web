
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

  // const values = [
  //   {
  //     icon: Zap,
  //     title: "Speed",
  //     description: "Ship fast, iterate faster. Every day waiting is opportunity lost."
  //   },
  //   {
  //     icon: Layers,
  //     title: "Simplicity",
  //     description: "Complex problems need elegant solutions. We cut through the noise."
  //   },
  //   {
  //     icon: Brain,
  //     title: "Intelligence",
  //     description: "AI that thinks with you, not for you. Augment human creativity."
  //   }
  // ];
  const values = [
    {
      icon: Zap,
      title: "Execution",
      description: "Our AI employees don’t just assist — they deliver real business results, fast."
    },
    {
      icon: Layers,
      title: "Autonomy",
      description: "Every AI teammate runs independently, integrated with your tools and logic."
    },
    {
      icon: Brain,
      title: "Intelligence",
      description: "Trained on your systems, powered by GPT-4o and agent frameworks — always learning."
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
        {/* Headline Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div
              ref={headlineRef}
              className="opacity-0 translate-y-8 scale-95"
            >
              <h1 className="text-6xl md:text-8xl font-bold leading-tight text-white mb-8">
                We're building a world where{' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">every team</span>{' '}
                has AI employees.
              </h1>

            </div>
          </div>
        </section>
        {/* <p className="text-2xl md:text-3xl leading-relaxed text-gray-300">
  Agentum helps startups hire AI teammates — not software. From support reps to content creators,
  we deploy AI employees trained on your workflow in under 7 days. No bloat. Just output.
</p>
 */}
        {/* Mission Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div
              ref={missionRef}
              className="opacity-0 translate-y-12"
            >
              <p className="text-2xl md:text-3xl leading-relaxed text-gray-300">
                Agentum helps startups hire AI teammates — not software. From support reps to content creators,
                we deploy AI employees trained on your workflow in under 7 days. No bloat. Just output.
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
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                        <Icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300 relative">
                      {value.title}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Quote Section */}
      {/* Founder Quote Section */}
<section className="py-32 px-6">
  <div className="max-w-4xl mx-auto text-center relative">
    <div
      ref={founderRef}
      className="opacity-0 translate-y-8"
    >
      <blockquote className="text-4xl md:text-5xl font-bold text-white mb-8">
        "What if hiring didn’t require humans?"
      </blockquote>
      <div className="space-y-4 text-lg text-gray-300">
        <p>
          We’ve seen startups spend months building systems and scaling teams — only to burn out chasing tasks.
        </p>
        <p>
          Agentum was built to change that. We provide AI employees who join your team in days,
          work 24/7, and deliver output from Day 1.
        </p>
      </div>
      <div className="mt-8 text-sm text-gray-400 font-medium">
        — The Agentum Team
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
