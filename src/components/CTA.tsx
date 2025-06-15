
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTA = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/fastforge-ai/discovery-call', '_blank');
  };

  const goToGetStarted = () => {
    window.location.href = '/get-started';
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-600/10"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6 sm:mb-8">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
          <span className="text-blue-400 text-xs sm:text-sm font-medium">Ready to Transform?</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-gray-100 to-blue-400 bg-clip-text text-transparent">
          Start Your AI Journey Today
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of companies already using FastForge AI to build the future. 
          Get started with a free consultation and see the possibilities.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Button 
            size="lg" 
            onClick={goToGetStarted}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={openCalendly}
            className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
