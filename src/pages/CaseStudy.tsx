
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Calendar, User, Target, Lightbulb, CheckCircle } from 'lucide-react';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  result: string;
  tags: string[];
  featured: boolean;
  case_study_content: string;
  technologies_used: string[];
  project_duration: string;
  client_name: string;
  challenges_faced: string;
  solutions_provided: string;
  outcomes: string;
  additional_images: string[];
}

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Navigation />
        <div className="pt-32 text-center">
          <div className="text-lg">Loading case study...</div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Navigation />
        <div className="pt-32 text-center">
          <div className="text-lg">Case study not found</div>
          <Button onClick={() => navigate('/portfolio')} className="mt-4">
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Back Button */}
        <div className="px-6 mb-8">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={() => navigate('/portfolio')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-6 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {portfolio.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              {portfolio.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {portfolio.description}
            </p>

            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {portfolio.project_duration && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="text-white font-medium">{portfolio.project_duration}</div>
                  </div>
                </div>
              )}
              
              {portfolio.client_name && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-400">Client</div>
                    <div className="text-white font-medium">{portfolio.client_name}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-sm text-gray-400">Result</div>
                  <div className="text-white font-medium">{portfolio.result}</div>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-video rounded-2xl overflow-hidden mb-12">
              <img
                src={portfolio.image_url}
                alt={portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Case Study Content */}
        <section className="px-6 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              
              {/* Technologies Used */}
              {portfolio.technologies_used && portfolio.technologies_used.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {portfolio.technologies_used.map((tech, index) => (
                      <Badge
                        key={index}
                        className="bg-gray-800 text-gray-300 px-4 py-2 text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study Content */}
              {portfolio.case_study_content && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Case Study</h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {portfolio.case_study_content}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {portfolio.challenges_faced && (
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white">Challenges Faced</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {portfolio.challenges_faced}
                  </div>
                </div>
              )}

              {/* Solutions */}
              {portfolio.solutions_provided && (
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <Target className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Solutions Provided</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {portfolio.solutions_provided}
                  </div>
                </div>
              )}

              {/* Outcomes */}
              {portfolio.outcomes && (
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">Outcomes & Results</h2>
                  </div>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {portfolio.outcomes}
                  </div>
                </div>
              )}

              {/* Additional Images */}
              {portfolio.additional_images && portfolio.additional_images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Project Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolio.additional_images.map((image, index) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${portfolio.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 mb-6">
                Let's build something amazing together, just like this project.
              </p>
              <Button
                onClick={() => navigate('/get-started')}
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
