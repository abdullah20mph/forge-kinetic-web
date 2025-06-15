
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

  const projects = [
    {
      title: "Real Estate GPT Agent",
      result: "Built in 13 days using GPT + Zapier",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      tags: ["AI Bot", "Real Estate"],
      category: "bot"
    },
    {
      title: "E-commerce Dashboard",
      result: "Analytics platform delivered in 8 days",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["Dashboard", "Analytics"],
      category: "dashboard"
    },
    {
      title: "Content Generation Suite",
      result: "AI writing tools shipped in 11 days",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      tags: ["AI Bot", "Content"],
      category: "bot"
    },
    {
      title: "HR Automation Bot",
      result: "Employee onboarding automated in 9 days",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
      tags: ["Automation", "HR"],
      category: "automation"
    },
    {
      title: "Lead Scoring System",
      result: "CRM integration completed in 12 days",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["Automation", "CRM"],
      category: "automation"
    },
    {
      title: "Social Media Assistant",
      result: "Content scheduler built in 7 days",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["AI Bot", "Social Media"],
      category: "bot"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-15" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-50 rounded-full blur-2xl opacity-20" />
      </div>

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div 
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight text-gray-900 mb-6">
                Recent Launches &{' '}
                <span className="italic text-blue-600">Case Studies</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                MVPs, bots, dashboards, and automations — all shipped fast.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div 
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-card opacity-0 translate-y-8 group cursor-pointer"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 font-medium text-sm">
                          ✅ {project.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={ctaRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-light mb-6">
                  Want your AI project{' '}
                  <span className="italic">featured here next?</span>
                </h2>
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold"
                >
                  Let's Build Something
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

export default Portfolio;
