
import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Linkedin, Instagram, Calendar, Send } from 'lucide-react';

const Contact = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            
            if (entry.target === formRef.current) {
              const formFields = entry.target.querySelectorAll('.form-field');
              formFields.forEach((field, index) => {
                setTimeout(() => {
                  field.classList.add('animate-fade-up');
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    [titleRef, formRef, ctaRef, contactRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const openCalendly = () => {
    window.open('https://calendly.com/fastforge-ai/discovery-call', '_blank');
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent('New Project Inquiry');
    const body = encodeURIComponent(`Hi FastForge Team,\n\nI'm interested in discussing a project with you.\n\nBest regards,\n${formData.name || '[Your Name]'}`);
    window.open(`mailto:hello@fastforge.ai?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background with Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 animate-pulse"></div>
      
      {/* Floating Shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Together.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                Ready to move fast with AI? Fill the form or book a free discovery call.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div 
              ref={formRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="name" className="text-base sm:text-lg font-medium text-white mb-3 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12 sm:h-14 text-base sm:text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="Tell us your name"
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="email" className="text-base sm:text-lg font-medium text-white mb-3 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 sm:h-14 text-base sm:text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="message" className="text-base sm:text-lg font-medium text-white mb-3 block">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-32 text-base sm:text-lg bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
                      placeholder="Tell us about your project, timeline, and goals..."
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full h-12 sm:h-14 text-base sm:text-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl"
                    >
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Alternate CTA Buttons */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              ref={ctaRef}
              className="opacity-0 translate-y-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={openCalendly}
                  className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Book on Calendly
                </Button>
                
                <div className="text-gray-400 text-base sm:text-lg">or</div>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={openEmailClient}
                  className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl bg-transparent"
                >
                  <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Email Us Directly
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div 
              ref={contactRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <p className="text-base sm:text-lg text-gray-300 mb-2">Get in touch directly</p>
                  <a 
                    href="mailto:hello@fastforge.ai"
                    className="text-lg sm:text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    hello@fastforge.ai
                  </a>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://linkedin.com/company/fastforge-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:text-blue-300" />
                  </a>
                  
                  <a 
                    href="https://instagram.com/fastforge.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:text-blue-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
