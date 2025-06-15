
import React from 'react';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { Quote } from '../components/Quote';
import { Services } from '../components/Services';
import { CaseStudies } from '../components/CaseStudies';
import { BlogPreview } from '../components/BlogPreview';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <TrustStrip />
      <Quote />
      <Services />
      <CaseStudies />
      <BlogPreview />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
