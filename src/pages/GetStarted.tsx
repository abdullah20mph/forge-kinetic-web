
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Zap, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/fastforge-ai/discovery-call', '_blank');
  };

  const goToContact = () => {
    window.location.href = '/contact';
  };

  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "We understand your vision and requirements",
      duration: "30 minutes"
    },
    {
      number: "02", 
      title: "Project Planning",
      description: "We create a detailed roadmap and timeline",
      duration: "24 hours"
    },
    {
      number: "03",
      title: "Fast Development",
      description: "We build your AI solution using proven tools",
      duration: "1-2 weeks"
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "We deploy and provide ongoing support",
      duration: "Ongoing"
    }
  ];

  const packages = [
    {
      name: "MVP Starter",
      price: "$499",
      features: [
        "Simple web app or dashboard",
        "Basic AI integration",
        "2-week delivery",
        "1 revision round"
      ],
      recommended: false
    },
    {
      name: "Business Solution",
      price: "$1,499",
      features: [
        "Full-featured web application",
        "Advanced AI capabilities",
        "Custom integrations",
        "3 revision rounds",
        "30-day support"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Complex AI systems",
        "Multiple integrations",
        "Custom workflows",
        "Unlimited revisions",
        "Ongoing support"
      ],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              Get Started with{' '}
              <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">FastForge AI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From idea to launch in weeks, not months. Here's how we make it happen.
            </p>
          </div>

          {/* Process Steps */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                      {step.number}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-16 w-24 h-0.5 bg-blue-500/30"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 mb-2">{step.description}</p>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-0">
                    {step.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Packages */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Package</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div key={index} className={`relative bg-white/5 backdrop-blur-lg border rounded-3xl p-8 ${
                  pkg.recommended ? 'border-blue-500 scale-105' : 'border-white/10'
                }`}>
                  {pkg.recommended && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                      Recommended
                    </Badge>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-blue-400 mb-4">{pkg.price}</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={openCalendly}
                    className={`w-full ${
                      pkg.recommended 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to build the future?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join hundreds of companies already using FastForge AI to build faster and smarter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={openCalendly}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Schedule Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={goToContact}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetStarted;
