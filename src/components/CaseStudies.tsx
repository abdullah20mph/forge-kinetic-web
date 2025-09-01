import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Animation styles for case study cards
const caseStudyAnimationStyles = `
  .animate-fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .case-study-card {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .case-study-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = caseStudyAnimationStyles;
  if (!document.head.querySelector('style[data-casestudies-animations]')) {
    styleSheet.setAttribute('data-casestudies-animations', 'true');
    document.head.appendChild(styleSheet);
  }
}

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  result: string;
  tags: string[];
  featured: boolean;
}

export const CaseStudies = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPortfolios = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPortfolios();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.case-study-card');

            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in', 'visible');
              }, index * 200);
            });
          }
        });
      },
      { 
        threshold: 0.1, // Lower threshold for smaller screens
        rootMargin: '50px' // Trigger earlier for mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: Show cards that are already in viewport
    const checkInitialVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          const cards = sectionRef.current.querySelectorAll('.case-study-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-fade-in', 'visible');
            }, index * 100);
          });
        }
      }
    };

    // Check visibility after portfolios load and DOM is ready
    setTimeout(checkInitialVisibility, 100);
    
    // Also check on resize for responsive behavior
    const handleResize = () => {
      setTimeout(checkInitialVisibility, 100);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [portfolios]);

  // Fallback data if no featured portfolios exist
  const fallbackCaseStudies = [
    {
      id: 'fallback-1',
      title: "AI-Powered E-commerce Platform",
      image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      result: "Built a GPT-based product recommendation engine in 10 days",
      description: "Revolutionary e-commerce solution",
      tags: ["AI", "E-commerce"],
      featured: true,
    },
    {
      id: 'fallback-2',
      title: "Smart HR Dashboard",
      image_url: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop",
      result: "Built a GPT-based HR bot in 13 days",
      description: "Intelligent HR management system",
      tags: ["AI", "HR"],
      featured: true,
    },
    {
      id: 'fallback-3',
      title: "Content Generation Suite",
      image_url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      result: "Built an AI content studio with 5 tools in 8 days",
      description: "Complete content creation platform",
      tags: ["AI", "Content"],
      featured: true,
    }
  ];

  const displayPortfolios = portfolios.length > 0 ? portfolios : fallbackCaseStudies;

  const handleCardClick = (portfolioId: string) => {
    navigate(`/case-study/${portfolioId}`);
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-white">Loading success stories...</div>
        </div>
      </section>
    );
  }
  /*
Real results from AI teammates handling real work — no dashboards, no burnout.

(Subhead)
These aren’t just use cases. They’re success stories from AI employees deployed inside fast-moving teams. */

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          AI Employees in Action          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          These aren’t just use cases. They’re success stories from AI employees deployed inside fast-moving teams.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 items-stretch">
          {displayPortfolios.map((study, index) => (
            <div
              key={study.id}
              onClick={() => handleCardClick(study.id)}
              className="case-study-card relative opacity-0 translate-y-8 group transition-all duration-500 hover:-translate-y-2 h-full flex flex-col cursor-pointer"
              style={{ minHeight: "400px" }}
            >
              {/* Outer glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl z-0"></div>

              {/* Card content wrapper */}
              <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">

                {/* Project Image */}
                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={study.image_url}
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
                  
                  {/* Click indicator */}
                  <div className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view case study →
                  </div>
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
See More Hires in Action            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
