
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscoveryCall = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/fastforge-ai/discovery-call', '_blank');
  };

  const features = [
    {
      icon: Calendar,
      title: "Free 30-minute consultation",
      description: "No commitment, just insights"
    },
    {
      icon: Clock,
      title: "Same-day response",
      description: "We'll get back to you within hours"
    },
    {
      icon: Users,
      title: "Expert guidance",
      description: "Direct access to our AI specialists"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              Book Your Free{' '}
              <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Discovery Call</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your AI project and see how we can help you build it fast.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Schedule a free discovery call to discuss your project requirements and see how FastForge AI can help you build faster.
              </p>
              <Button 
                size="lg"
                onClick={openCalendly}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Schedule Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiscoveryCall;
