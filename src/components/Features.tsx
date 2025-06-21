import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  'Enterprise-grade security and compliance',
  'Real-time data processing and analysis',
  'Seamless integration with existing systems',
  'Scalable cloud infrastructure',
  '24/7 monitoring and support',
  'Custom AI model development',
];

export const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const elements = entry.target.querySelectorAll('.feature-item');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-fade-in');
              }, index * 150);
            });
            
            // Animate bars after text animations
            setTimeout(() => {
              setAnimatedBars(true);
            }, 800);
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

  return (
   <section id="features" ref={sectionRef} className="py-32 px-6 bg-black overflow-hidden">
  <div className="max-w-7xl mx-auto space-y-20">

    {/* Main Feature Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      
      {/* Left - Text Content */}
      <div className="lg:col-span-6">
        <h2 className={`text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Why Choose Agentum AI?
        </h2>
        <p className={`text-xl text-gray-400 mb-12 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We combine cutting-edge AI technology with enterprise reliability to deliver 
          solutions that drive real business outcomes.
        </p>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item opacity-0 translate-x-8 flex items-center group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all duration-300"
            >
              <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-lg">
                {feature}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-blue-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Right - Animated Bar Chart */}
      <div className="lg:col-span-6">
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl transition-all duration-1000 ${animatedBars ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}></div>
          <div className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 transition-all duration-1000 ${animatedBars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-6">
              <div className={`h-4 bg-gradient-to-r from-blue-500 to-transparent rounded-full transition-all duration-1500 ease-out ${animatedBars ? 'w-3/4 opacity-100' : 'w-0 opacity-50'}`} style={{transitionDelay: '200ms'}}></div>
              <div className={`h-4 bg-gradient-to-r from-purple-500 to-transparent rounded-full transition-all duration-1500 ease-out ${animatedBars ? 'w-1/2 opacity-100' : 'w-0 opacity-50'}`} style={{transitionDelay: '400ms'}}></div>
              <div className={`h-4 bg-gradient-to-r from-green-500 to-transparent rounded-full transition-all duration-1500 ease-out ${animatedBars ? 'w-5/6 opacity-100' : 'w-0 opacity-50'}`} style={{transitionDelay: '600ms'}}></div>
              <div className={`h-4 bg-gradient-to-r from-yellow-500 to-transparent rounded-full transition-all duration-1500 ease-out ${animatedBars ? 'w-2/3 opacity-100' : 'w-0 opacity-50'}`} style={{transitionDelay: '800ms'}}></div>
            </div>
            <div className={`mt-8 text-center transition-all duration-1000 ${animatedBars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '1000ms'}}>
              <div className="text-3xl font-bold text-white mb-2 animate-pulse">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom 2 Cards in Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

      {/* Box 1 - Stats Card */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl transition-all duration-1000 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '1200ms'}}></div>
        <div className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-center text-center transition-all duration-1000 hover:border-emerald-500/30 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1400ms'}}>
          <div className="text-4xl font-extrabold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
            <span className={`inline-block transition-all duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '1600ms'}}>
              85%
            </span>
          </div>
          <div className="text-gray-300 text-lg mb-2 group-hover:text-white transition-colors duration-300">Reduction in manual tasks</div>
          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
            Through our automation stack using GPT + Zapier + internal agents.
          </p>
        </div>
      </div>

      {/* Box 2 - Support Bot Card */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl transition-all duration-1000 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '1300ms'}}></div>
        <div className={`relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full transition-all duration-1000 hover:border-indigo-500/30 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '1500ms'}}>
          <h3 className="text-white text-xl font-bold mb-4 group-hover:text-indigo-200 transition-colors duration-300">GPT-Powered Support Bot</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[
              'Listens to user queries from live chat',
              'Parses intent using GPT-4o context window',
              'Sends back support answer in under 2s'
            ].map((item, index) => (
              <li key={index} className={`flex items-start gap-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`} style={{transitionDelay: `${1700 + index * 200}ms`}}>
                <span className="w-2 h-2 mt-1 bg-indigo-400 rounded-full group-hover:bg-indigo-300 transition-colors duration-300 animate-pulse"></span>
                <span className="group-hover:text-gray-300 transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className={`mt-6 text-right text-xs text-gray-500 italic group-hover:text-gray-400 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '2300ms'}}>
            Built using GPT-4o + Replit Functions
          </div>
        </div>
      </div>

    </div>
  </div>

  <style jsx>{`
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateX(0) !important;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .group:hover .animate-pulse {
      animation: float 2s ease-in-out infinite;
    }
  `}</style>
</section>

  );
};