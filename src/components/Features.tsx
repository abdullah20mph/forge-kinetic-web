
import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-item');
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add('animate-fade-in');
              }, index * 100);
            });
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
   <section id="features" ref={sectionRef} className="py-32 px-6 bg-black">
  <div className="max-w-7xl mx-auto space-y-20">

    {/* Main Feature Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      
      {/* Left - Text Content */}
      <div className="lg:col-span-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Why Choose Agentum AI?
        </h2>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          We combine cutting-edge AI technology with enterprise reliability to deliver 
          solutions that drive real business outcomes.
        </p>

        <div className="space-y-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item opacity-0 translate-x-8 flex items-center group cursor-pointer"
            >
              <CheckCircle className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {feature}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Right - Animated Bar Chart */}
      <div className="lg:col-span-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10">
            <div className="space-y-6">
              <div className="h-4 bg-gradient-to-r from-blue-500 to-transparent rounded-full w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-purple-500 to-transparent rounded-full w-1/2"></div>
              <div className="h-4 bg-gradient-to-r from-green-500 to-transparent rounded-full w-5/6"></div>
              <div className="h-4 bg-gradient-to-r from-yellow-500 to-transparent rounded-full w-2/3"></div>
            </div>
            <div className="mt-8 text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom 2 Cards in Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">

      {/* Box 1 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full flex flex-col justify-center text-center">
          <div className="text-4xl font-extrabold text-emerald-400">85%</div>
          <div className="text-gray-300 text-lg mt-2">Reduction in manual tasks</div>
          <p className="text-sm text-gray-500 mt-2">
            Through our automation stack using GPT + Zapier + internal agents.
          </p>
        </div>
      </div>

      {/* Box 2 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-white/10 h-full">
          <h3 className="text-white text-xl font-bold mb-4">GPT-Powered Support Bot</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 mt-1 bg-indigo-400 rounded-full"></span>
              Listens to user queries from live chat
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 mt-1 bg-indigo-400 rounded-full"></span>
              Parses intent using GPT-4o context window
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 mt-1 bg-indigo-400 rounded-full"></span>
              Sends back support answer in under 2s
            </li>
          </ul>
          <div className="mt-6 text-right text-xs text-gray-500 italic">
            Built using GPT-4o + Replit Functions
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

  );
};
