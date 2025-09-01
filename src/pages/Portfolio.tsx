import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

// Animation styles for cards
const animationStyles = `
  .animate-fade-up {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .project-card {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .project-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animationStyles;
  if (!document.head.querySelector('style[data-portfolio-animations]')) {
    styleSheet.setAttribute('data-portfolio-animations', 'true');
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

const Portfolio = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPortfolios(data || []);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
        // Keep fallback data if fetch fails
        setPortfolios(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

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
                  card.classList.add('animate-fade-up', 'visible');
                }, index * 100);
              });
            }
          }
        });
      },
      { 
        threshold: 0.1, // Lower threshold for smaller screens
        rootMargin: '50px' // Trigger earlier for better mobile experience
      }
    );

    [titleRef, gridRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Fallback: Show elements that are already in viewport
    const checkInitialVisibility = () => {
      [titleRef, gridRef, ctaRef].forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          
          if (isVisible) {
            ref.current.classList.add('animate-fade-up');
            
            if (ref.current === gridRef.current) {
              const projectCards = ref.current.querySelectorAll('.project-card');
              projectCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-fade-up', 'visible');
                }, index * 100);
              });
            }
          }
        }
      });
    };

    // Check visibility after a short delay to ensure DOM is ready
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

  const goToGetStarted = () => {
    window.location.href = '/get-started';
  };

  const goToCaseStudy = (portfolioId: string) => {
    window.location.href = `/case-study/${portfolioId}`;
  };

  // Fallback data in case no portfolios are found
  const fallbackProjects = [
    {
      id: 'fallback-1',
      title: "Real Estate GPT Agent",
      result: "Built in 13 days using GPT + Zapier",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["AI Bot", "Real Estate"],
      description: "AI-powered real estate assistant",
      featured: false,
    },
    {
      id: 'fallback-2',
      title: "E-commerce Dashboard",
      result: "Analytics platform delivered in 8 days",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["Dashboard", "Analytics"],
      description: "Complete analytics solution",
      featured: false,
    },
    {
      id: 'fallback-3',
      title: "Content Generation Suite",
      result: "AI writing tools shipped in 11 days",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["AI Bot", "Content"],
      description: "AI content creation platform",
      featured: false,
    },
    {
      id: 'fallback-4',
      title: "HR Automation Bot",
      result: "Employee onboarding automated in 9 days",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["Automation", "HR"],
      description: "HR process automation",
      featured: false,
    },
    {
      id: 'fallback-5',
      title: "Lead Scoring System",
      result: "CRM integration completed in 12 days",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["Automation", "CRM"],
      description: "Smart lead management",
      featured: false,
    },
    {
      id: 'fallback-6',
      title: "Social Media Assistant",
      result: "Content scheduler built in 7 days",
      image_url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      tags: ["AI Bot", "Social Media"],
      description: "Social media automation",
      featured: false,
    }
  ];

  const displayProjects = portfolios.length > 0 ? portfolios : fallbackProjects;

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
        {/* <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6">
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
        </section> */}
        <section className="pt-24 sm:pt-32 pb-8 sm:pb-16 px-4 sm:px-6">
  <div className="max-w-7xl mx-auto text-center">
    <div ref={titleRef} className="opacity-0 translate-y-8">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-4 sm:mb-6">
        AI Employees in{' '}
        <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Action</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
        Support reps, content creators, and ops assistants — hired, trained, and deployed into real teams.
      </p>
    </div>
  </div>
</section>


        {/* Projects Grid */}
        <section className="py-10 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-300 py-20">
                <div className="text-lg">Loading portfolio projects...</div>
              </div>
            ) : (
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                {displayProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="project-card opacity-0 translate-y-8 group cursor-pointer"
                    onClick={() => goToCaseStudy(project.id)}
                  >
                    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden transition-all duration-500 hover:-translate-y-2">
                      {/* Glow background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl opacity-0 group-hover:opacity-10 transition duration-500 rounded-2xl sm:rounded-3xl z-0" />

                      {/* Project Image */}
                      <div className="aspect-video overflow-hidden z-10 relative">
                        <img
                          src={project.image_url}
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

                        {/* Click indicator */}
                        <div className="mt-3 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to view case study →
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-16 sm:py-32 px-4 sm:px-6">
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
        </section> */}
        <section className="py-16 sm:py-32 px-4 sm:px-6">
  <div className="max-w-4xl mx-auto text-center relative">
    <div ref={ctaRef} className="opacity-0 translate-y-8">
      <div className="relative group transition-all duration-500 transform hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 z-0" />
        <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Want your AI employee{' '}
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">featured here next?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 px-2">
            Launch your AI support rep, sales assistant, or content producer with Agentum — and turn work into a case study in 7 days.
          </p>
          <Button
            onClick={goToGetStarted}
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            Hire Your AI Employee
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
