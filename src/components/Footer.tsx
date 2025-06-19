import React from 'react';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const services = [
    { name: 'MVP Launchpad', path: '/services' },
    { name: 'AI Content Studio', path: '/services' },
    { name: 'Automation Suite', path: '/services' },
  ];

  const company = [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const socials = [
    { 
      name: 'Github', 
      icon: Github, 
      href: 'https://github.com/agentum-ai', 
      hoverColor: 'hover:text-gray-300' 
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      href: 'https://twitter.com/agentum_ai', 
      hoverColor: 'hover:text-blue-400' 
    },
    { 
      name: 'Linkedin', 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/agentum-ai', 
      hoverColor: 'hover:text-blue-600' 
    },
    { 
      name: 'Mail', 
      icon: Mail, 
      href: 'mailto:contact@agentum.ai', 
      hoverColor: 'hover:text-red-400' 
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/agentumai/',
      hoverColor: 'hover:text-pink-500'
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent mb-4">
              Agentum AI
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Empowering businesses with next-generation AI solutions. 
              Build the future with intelligent automation and machine learning.
            </p>
            <div className="flex space-x-4 mt-6">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full border border-white/10 transition-all duration-300 ${social.hoverColor} hover:border-current`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Agentum AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
