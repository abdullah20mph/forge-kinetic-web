
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
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            const elements = entry.target.querySelectorAll('.feature-item');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-scan-reveal');
                element.classList.remove('opacity-0', 'translate-x-8');
              }, index * 150);
            });

            // Animate progress bars
            setTimeout(() => {
              setProgressValues([85, 92, 78, 95]);
            }, 800);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
   <section id="features" ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
     {/* Animated background grid */}
     <div className="absolute inset-0 opacity-10">
       <div className="absolute inset-0" style={{
         backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
         backgroundSize: '50px 50px',
         animation: 'float 10s ease-in-out infinite'
       }}></div>
     </div>

     {/* Floating connection lines */}
     <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 1 }}>
       <defs>
         <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
           <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
           <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
         </linearGradient>
       </defs>
       <path
         d="M 100 200 Q 300 100 500 200 T 900 200"
         stroke="url(#connection-gradient)"
         strokeWidth="1"
         fill="none"
         className="animate-data-flow"
       />
       <path
         d="M 200 600 Q 400 500 600 600 T 1000 600"
         stroke="url(#connection-gradient)"
         strokeWidth="1"
         fill="none"
         className="animate-data-flow"
         style={{ animationDelay: '1s' }}
       />
     </svg>

  <div className="max-w-7xl mx-auto space-y-20 relative z-10">

    {/* Main Feature Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      
      {/* Left - Text Content */}
      <div className="lg:col-span-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent relative">
          <span className="relative">
            Why Choose Agentum AI?
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-spotlight opacity-0" />
          </span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed animate-fade-up">
          We combine cutting-edge AI technology with enterprise reliability to deliver 
          solutions that drive real business outcomes.
        </p>

        <div className="space-y-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item opacity-0 translate-x-8 flex items-center group cursor-pointer relative"
            >
              {/* Animated check circle */}
              <div className="relative">
                <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-all duration-300 relative z-10" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-md"></div>
              </div>
              
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300 flex-1 relative">
                {feature}
                {/* Hover underline */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
              </span>
              
              {/* Animated arrow */}
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-blue-400" />
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Enhanced Animated Visualization */}
      <div className="lg:col-span-6">
        <div className="relative">
          {/* Main glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl animate-pulse-glow"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 overflow-hidden">
            {/* Animated progress bars */}
            <div className="space-y-6 mb-8">
              {[
                { label: 'Performance', value: progressValues[0], color: 'blue' },
                { label: 'Reliability', value: progressValues[1], color: 'purple' },
                { label: 'Innovation', value: progressValues[2], color: 'green' },
                { label: 'Support', value: progressValues[3], color: 'yellow' }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{item.label}</span>
                    <span className="text-white font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full transition-all duration-2000 ease-out relative`}
                      style={{ width: isVisible ? `${item.value}%` : '0%' }}
                    >
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-spotlight"></div>
                    </div>
                    {/* Particle trail */}
                    {isVisible && (
                      <div className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"
                           style={{ left: `${item.value}%`, animationDelay: `${index * 0.2}s` }}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Enhanced uptime display */}
            <div className="text-center relative">
              <div className="text-3xl font-bold text-white mb-2 relative">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-gradient-wave" style={{ backgroundSize: '200% 200%' }}>
                  99.9%
                </span>
                {/* Floating particles around the number */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-green-400 rounded-full animate-particle-float opacity-60"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-400 relative">
                <span className="relative">
                  Uptime Guarantee
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-spotlight opacity-0"></div>
                </span>
              </div>
            </div>

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-spotlight"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Enhanced Bottom Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

      {/* Enhanced Box 1 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-center text-center overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500">
          {/* Animated percentage */}
          <div className="text-4xl font-extrabold text-emerald-400 mb-2 relative">
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent animate-gradient-wave" style={{ backgroundSize: '200% 200%' }}>
              85%
            </span>
            {/* Pulsing dot */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-gray-300 text-lg mt-2 mb-4">Reduction in manual tasks</div>
          <p className="text-sm text-gray-500 mt-2 relative">
            Through our automation stack using GPT + Zapier + internal agents.
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-spotlight opacity-0 group-hover:opacity-100"></div>
          </p>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border border-emerald-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border border-emerald-500/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Enhanced Box 2 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full overflow-hidden group-hover:border-indigo-500/30 transition-all duration-500">
          <h3 className="text-white text-xl font-bold mb-4 relative">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              GPT-Powered Support Bot
            </span>
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[
              'Listens to user queries from live chat',
              'Parses intent using GPT-4o context window',
              'Sends back support answer in under 2s'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2 relative group/item">
                <span className="w-2 h-2 mt-1 bg-indigo-400 rounded-full animate-pulse flex-shrink-0" style={{ animationDelay: `${index * 0.3}s` }}></span>
                <span className="group-hover/item:text-gray-300 transition-colors duration-300">{item}</span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-indigo-500/5 rounded opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 -z-10"></div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right text-xs text-gray-500 italic relative">
            Built using GPT-4o + Replit Functions
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/10 to-transparent animate-spotlight opacity-0 group-hover:opacity-100"></div>
          </div>
          
          {/* Tech stack indicators */}
          <div className="absolute top-4 right-4 flex space-x-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

  );
};
