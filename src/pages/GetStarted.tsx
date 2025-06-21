import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const GetStarted = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Animate steps sequentially
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(stepInterval);
  }, []);

  const openCalendly = () => {
    window.open('https://calendly.com/abdullah30mph', '_blank');
  };

  const goToContact = () => {
    window.location.href = '/contact';
  };

  const goToHome = () => {
    window.location.href = '/';
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 animate-pulse z-0" />
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 pt-16 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Animated Back Button */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <button
              onClick={goToHome}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 group transition-all duration-300 hover:translate-x-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
          </div>

          {/* Animated Header */}
          <div className={`text-center mb-20 transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              Get Started with{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Agentum AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From idea to launch in weeks, not months. Here's how we make it happen.
            </p>
          </div>

          {/* Animated Process Steps */}
          <section className={`mb-32 transition-all duration-1000 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center group transition-all duration-700 transform hover:scale-110 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    } ${activeStep === index ? 'scale-105' : ''}`}
                  style={{ transitionDelay: `${400 + index * 200}ms` }}
                >
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-white/10 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-white transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-500/20 group-hover:border-blue-400/30 ${activeStep === index ? 'bg-blue-500/30 border-blue-400/50 scale-110 shadow-lg shadow-blue-500/20' : ''
                      }`}>
                      {step.number}
                    </div>
                    {/* Connection Line */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-8 left-20 w-full h-0.5 bg-white/20">
                        <div className={`h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 ${activeStep > index ? 'w-full' : 'w-0'
                          }`} />
                      </div>
                    )}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${activeStep === index ? 'text-blue-400' : 'text-white'
                    }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-2 transition-all duration-300 group-hover:text-gray-300">
                    {step.description}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`bg-blue-500/20 text-blue-400 border-0 transition-all duration-300 ${activeStep === index ? 'bg-blue-500/40 scale-105' : ''
                      }`}
                  >
                    {step.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Animated Pricing Packages */}
          <section className={`mb-32 transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your Package
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative group bg-gradient-to-br from-gray-900 to-black border rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${pkg.recommended
                      ? 'border-blue-500 shadow-lg hover:shadow-blue-500/20 scale-105'
                      : 'border-white/10 hover:shadow-lg hover:shadow-white/10 hover:border-white/20'
                    } transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  {pkg.recommended && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white animate-bounce">
                      Recommended
                    </Badge>
                  )}

                  {/* Animated Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {pkg.name}
                      </h3>
                      <div className="text-4xl font-bold text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {pkg.price}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={`flex items-center transition-all duration-300 transform hover:translate-x-2 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                            }`}
                          style={{ transitionDelay: `${600 + index * 200 + featureIndex * 100}ms` }}
                        >
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors duration-300" />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={openCalendly}
                      className={`w-full transition-all duration-300 hover:scale-105 ${pkg.recommended
                          ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30'
                          : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
                        }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Animated CTA Section */}
          <section className={`text-center transition-all duration-1000 delay-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative group transition-all duration-700 hover:scale-[1.02] hover:-translate-y-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl rounded-3xl opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse" />

              <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-white/10 rounded-3xl p-12 z-10 group-hover:border-white/20 transition-all duration-500">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                  Ready to build the future?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto group-hover:text-white transition-colors duration-300">
                  Join companies already using FastForge AI to ship faster and smarter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={openCalendly}
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;