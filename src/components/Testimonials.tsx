
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechCorp',
    content: 'Our AI support rep from Agentum reduced ticket response time by over 80%. No onboarding, no fatigue — just nonstop output.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'VP Engineering, InnovateLabs',
    content: 'We hired an AI lead gen assistant from Agentum and saw a 3x increase in qualified leads. It runs daily without needing supervision.',
    rating: 5,
  },
  {
    name: 'Emily Johnson',
    role: 'Head of AI, FutureTech',
    content: 'Agentum’s AI writer is now publishing 90% of our content. Our human team reviews, tweaks, and ships — that’s it. Total game-changer.',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          What Leaders Say About Their AI Hires          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Trusted by Founders. Backed by Results.

</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-gray-400 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
