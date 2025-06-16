import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.case-study-card');

            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
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

  const caseStudies = [
    {
      title: "AI-Powered E-commerce Platform",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      result: "Built a GPT-based product recommendation engine in 10 days"
    },
    {
      title: "Smart HR Dashboard",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop",
      result: "Built a GPT-based HR bot in 13 days"
    },
    {
      title: "Content Generation Suite",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      result: "Built an AI content studio with 5 tools in 8 days"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Recent Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how we've helped startups and creators turn ideas into reality with AI-powered solutions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="case-study-card relative opacity-0 translate-y-8 group transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
              style={{ minHeight: "400px" }} // You can adjust this value as needed
            >
              {/* Outer glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl z-0"></div>

              {/* Card content wrapper */}
              <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">

                {/* Project Image */}
                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link to="/portfolio">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              See More Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
