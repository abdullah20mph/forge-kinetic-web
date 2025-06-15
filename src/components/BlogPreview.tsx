
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

export const BlogPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.blog-card');
            
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-slide-up');
              }, index * 150);
            });
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

  const blogPosts = [
    {
      title: "Top 5 AI Tools for Small Teams",
      preview: "Discover the essential AI tools that can 10x your team's productivity. From automation to content creation, these tools are game-changers.",
      tag: "Tools",
      category: "Tools"
    },
    {
      title: "How We Built an MVP in 7 Days",
      preview: "The complete playbook for rapid prototyping with AI. Learn our exact process for validating ideas and shipping fast.",
      tag: "Founder's Voice",
      category: "Founder"
    },
    {
      title: "Case Study: AI-Powered E-commerce Success",
      preview: "From idea to $50K MRR in 3 months. See how one startup used AI to transform their business and scale rapidly.",
      tag: "Case Study",
      category: "Case Study"
    }
  ];

  const filters = ['All', 'Tools', 'Founder', 'Case Study'];

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with our latest thoughts on AI, startups, and building fast.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-black text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={index}
              className="blog-card opacity-0 translate-y-8 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 group cursor-pointer"
            >
              {/* Tag */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                  #{post.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {post.title}
              </h3>

              {/* Preview */}
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {post.preview}
              </p>

              {/* Read More Button */}
              <Button 
                variant="outline" 
                className="w-full border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Read More
              </Button>
            </article>
          ))}
        </div>

        {/* View All Blog Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};
