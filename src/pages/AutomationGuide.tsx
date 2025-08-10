import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import AutomationGuideBox from '@/components/AutomationGuide';

const AutomationGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <Navigation />
      <main className="relative z-10 py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              AI Automation Guide
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Tell us your industry and the manual work draining your time. We’ll return a delivery plan we can ship: timeline, cost, phases, and tools.
            </p>
          </div>
          <AutomationGuideBox />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AutomationGuidePage;


