
import React, { useEffect, useRef } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Portfolio = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');

            if (entry.target === gridRef.current) {
              const projectCards = entry.target.querySelectorAll('.project-card');
              projectCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-fade-up');
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [titleRef, gridRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const goToGetStarted = () => {
    window.location.href = '/get-started';
  };

 const projects = [
  {
    title: "Real Estate GPT Agent",
    result: "Built in 13 days using GPT + Zapier",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Bot", "Real Estate"]
  },
  {
    title: "E-commerce Dashboard",
    result: "Analytics platform delivered in 8 days",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["Dashboard", "Analytics"]
  },
  {
    title: "Content Generation Suite",
    result: "AI writing tools shipped in 11 days",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Bot", "Content"]
  },
  {
    title: "HR Automation Bot",
    result: "Employee onboarding automated in 9 days",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["Automation", "HR"]
  },
  {
    title: "Lead Scoring System",
    result: "CRM integration completed in 12 days",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["Automation", "CRM"]
  },
  {
    title: "Social Media Assistant",
    result: "Content scheduler built in 7 days",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    tags: ["AI Bot", "Social Media"]
  }
];


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <Navigation />

      {/* Glowing Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
      <div className="absolute inset-0">
        {[...Array(7)].map((_, i) => (
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
        {/* Title Section */}
        <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div ref={titleRef} className="opacity-0 translate-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-4 sm:mb-6">
                Recent Launches &{' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Case Studies</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
                MVPs, bots, dashboards, and automations — all shipped fast...
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-10 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-card opacity-0 translate-y-8 group cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-500 hover:-translate-y-2">
                    {/* Glow background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl opacity-0 group-hover:opacity-10 transition duration-500 rounded-2xl sm:rounded-3xl z-0" />

                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden z-10 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-6 relative z-10">
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-white/10 text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 transition-colors border-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Result without green box */}
                      <p className="text-sm text-gray-400 font-medium">
                        {project.result}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            <div ref={ctaRef} className="opacity-0 translate-y-8">
              <div className="relative group transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 z-0" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 z-10">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                    Want your AI project{' '}
                    <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">featured here next?</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 px-2">
                    Launch your idea with us and go from concept to case study — fast.
                  </p>
                  <Button
                    onClick={goToGetStarted}
                    className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                  >
                    Let's Build Something
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
