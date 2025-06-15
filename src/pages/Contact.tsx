
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

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full blur-2xl opacity-25" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-bl from-purple-100 to-pink-100 rounded-full blur-xl opacity-20" />
      </div>

      <main className="relative z-10">
        {/* Page Title */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={titleRef}
              className="opacity-0 translate-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight text-gray-900 mb-6">
                Let's Build Something{' '}
                <span className="italic text-blue-600">Together.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light">
                Ready to move fast with AI? Fill the form or book a free discovery call.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div 
              ref={formRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="name" className="text-lg font-medium text-gray-700 mb-3 block">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="Tell us your name"
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="email" className="text-lg font-medium text-gray-700 mb-3 block">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Label htmlFor="message" className="text-lg font-medium text-gray-700 mb-3 block">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-32 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
                      placeholder="Tell us about your project, timeline, and goals..."
                      required
                    />
                  </div>

                  <div className="form-field opacity-0 translate-y-4">
                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl rounded-xl"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Alternate CTA Buttons */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              ref={ctaRef}
              className="opacity-0 translate-y-8"
            >
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book on Calendly
                </Button>
                
                <div className="text-gray-400 text-lg">or</div>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us Directly
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div 
              ref={contactRef}
              className="opacity-0 translate-y-8"
            >
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div>
                  <p className="text-lg text-gray-600 mb-2">Get in touch directly</p>
                  <a 
                    href="mailto:hello@fastforge.ai"
                    className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    hello@fastforge.ai
                  </a>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <a 
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Linkedin className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                  </a>
                  
                  <a 
                    href="#"
                    className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Instagram className="h-6 w-6 text-pink-600 group-hover:text-pink-700" />
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
