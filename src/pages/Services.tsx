import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Headphones, Briefcase, BarChart3, TrendingUp, Building, Check, ArrowRight } from 'lucide-react';
import AutomationGuide from '@/components/AutomationGuide';

// Animation styles for fade-up animation
const animationStyles = `
  .animate-fade-up {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .employee-card {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .tab-transition {
    transition: all 0.3s ease-in-out;
  }
`;

// Inject styles into head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animationStyles;
  if (!document.head.querySelector('style[data-services-animations]')) {
    styleSheet.setAttribute('data-services-animations', 'true');
    document.head.appendChild(styleSheet);
  }
}

// Complete AI Employees data structure
const aiEmployees = {
  popular: [
    {
      name: "AI Receptionist",
      icon: "📞",
      trending: true,
      tagline: "Your front desk that never sleeps and never puts customers on hold",
      features: ["24/7 call answering", "Appointment booking", "Call routing & spam blocking", "Professional customer service"],
      industries: ["Healthcare", "Legal", "Beauty Salons", "Small Business"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Customer Support Rep",
      icon: "🎧",
      trending: false,
      tagline: "Like having a customer service rep who never sleeps",
      features: ["Live chat support", "Email responses", "Ticket routing", "FAQ handling"],
      industries: ["E-commerce", "SaaS", "Retail", "Telecommunications"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI Voice Sales Agent",
      icon: "🎤",
      trending: true,
      tagline: "Your relentless sales closer that never stops dialing",
      features: ["Outbound lead calling", "Appointment setting", "Objection handling", "CRM integration"],
      industries: ["Real Estate", "Insurance", "Medical Practices", "B2B Services"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Sales Assistant",
      icon: "💼",
      trending: true,
      tagline: "Your personal sales team that never misses a follow-up",
      features: ["Lead qualification", "Email sequences", "Appointment booking", "CRM updates"],
      industries: ["Real Estate", "Insurance", "B2B Services", "Automotive"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Bookkeeper",
      icon: "📊",
      trending: true,
      tagline: "Your accountant who processes every receipt instantly",
      features: ["Expense tracking", "Invoice processing", "Financial reporting", "Tax prep"],
      industries: ["Small Business", "Startups", "Contractors", "E-commerce"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Marketing Manager",
      icon: "📈",
      trending: false,
      tagline: "Your marketing team that never runs out of content ideas",
      features: ["Content creation", "Social media management", "Campaign optimization"],
      industries: ["Small Business", "Agencies", "E-commerce", "Restaurants"],
      gradient: "from-red-500 to-orange-400"
    },
    {
      name: "AI Medical Practice Manager",
      icon: "🏥",
      trending: true,
      tagline: "Your medical front office that handles HIPAA compliance automatically",
      features: ["Patient scheduling", "Insurance verification", "Intake forms", "Compliance"],
      industries: ["Medical Practices", "Dental Offices", "Mental Health Clinics"],
      gradient: "from-cyan-500 to-blue-400"
    }
  ],
  healthcare: [
    {
      name: "AI Medical Practice Manager",
      icon: "🏥",
      trending: true,
      tagline: "Your medical front office that handles HIPAA compliance automatically",
      features: ["Patient scheduling", "Insurance verification", "Intake forms", "Compliance monitoring"],
      industries: ["Medical Practices", "Dental Offices", "Mental Health Clinics"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Medical Receptionist",
      icon: "📞",
      trending: false,
      tagline: "Handle patient calls with medical expertise and empathy",
      features: ["Appointment scheduling", "Prescription refills", "Insurance inquiries", "Emergency routing"],
      industries: ["Hospitals", "Clinics", "Telehealth", "Specialist Practices"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Patient Care Coordinator",
      icon: "👩‍⚕️",
      trending: false,
      tagline: "Never miss a follow-up or lose track of patient care",
      features: ["Treatment reminders", "Care plan management", "Medication tracking", "Follow-up scheduling"],
      industries: ["Chronic Care", "Rehabilitation", "Home Health", "Wellness Centers"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI Medical Billing Specialist",
      icon: "💳",
      trending: false,
      tagline: "Get paid faster with automated medical billing that never makes coding errors",
      features: ["Claims processing", "Insurance verification", "Billing code automation", "Payment follow-up"],
      industries: ["Medical Practices", "Billing Companies", "Healthcare Systems"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Telehealth Assistant",
      icon: "💻",
      trending: false,
      tagline: "Streamline virtual care from scheduling to follow-up",
      features: ["Virtual appointment management", "Tech support", "Documentation", "Patient onboarding"],
      industries: ["Telehealth Platforms", "Remote Care", "Digital Health"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Pharmacy Assistant",
      icon: "💊",
      trending: false,
      tagline: "Manage prescriptions, inventory, and customer queries seamlessly",
      features: ["Prescription management", "Inventory tracking", "Customer consultations", "Insurance processing"],
      industries: ["Pharmacies", "Healthcare Systems", "Retail Pharmacy"],
      gradient: "from-red-500 to-orange-400"
    }
  ],
  realEstate: [
    {
      name: "AI Real Estate Sales Assistant",
      icon: "🏠",
      trending: true,
      tagline: "Never lose a lead and always follow up at the perfect time",
      features: ["Lead nurturing", "Property matching", "Showing scheduling", "Market analysis"],
      industries: ["Residential Real Estate", "Commercial Real Estate", "Property Management"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Voice Sales Agent",
      icon: "🎤",
      trending: true,
      tagline: "Your relentless sales closer that never stops dialing",
      features: ["Outbound lead calling", "Appointment setting", "Objection handling", "Follow-up sequences"],
      industries: ["Real Estate Agencies", "Insurance Brokers", "Solar Companies"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Property Manager",
      icon: "🏢",
      trending: false,
      tagline: "Manage hundreds of properties like you have a full-time team",
      features: ["Tenant screening", "Rent collection", "Maintenance coordination", "Lease management"],
      industries: ["Property Management", "Real Estate Investment", "Rental Properties"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI Mortgage Assistant",
      icon: "🏦",
      trending: false,
      tagline: "Guide clients through mortgage applications without the paperwork headaches",
      features: ["Application processing", "Document collection", "Status updates", "Compliance checking"],
      industries: ["Mortgage Brokers", "Banks", "Credit Unions", "Lending Companies"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Transaction Coordinator",
      icon: "📋",
      trending: false,
      tagline: "Never miss a deadline or document in your real estate transactions",
      features: ["Document management", "Deadline tracking", "Communication coordination", "Compliance monitoring"],
      industries: ["Real Estate Brokerages", "Title Companies", "Real Estate Teams"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Real Estate Marketing Manager",
      icon: "📱",
      trending: false,
      tagline: "Create stunning property marketing that sells faster",
      features: ["Property listings", "Social media marketing", "Email campaigns", "Virtual tours"],
      industries: ["Real Estate Agents", "Property Developers", "Marketing Agencies"],
      gradient: "from-red-500 to-orange-400"
    }
  ],
  smallBusiness: [
    {
      name: "AI Business Operations Manager",
      icon: "⚙️",
      trending: false,
      tagline: "Run your entire back office with one AI employee",
      features: ["Task automation", "Process optimization", "Team coordination", "Performance tracking"],
      industries: ["Local Services", "Retail", "Restaurants", "Professional Services"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Inventory Manager",
      icon: "📦",
      trending: false,
      tagline: "Never run out of stock or overorder inventory again",
      features: ["Stock tracking", "Automated reordering", "Demand forecasting", "Supplier management"],
      industries: ["Retail", "E-commerce", "Restaurants", "Manufacturing"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Social Media Manager",
      icon: "📱",
      trending: true,
      tagline: "Keep your social media active and engaging 24/7",
      features: ["Content creation", "Post scheduling", "Community management", "Analytics reporting"],
      industries: ["Local Business", "Restaurants", "Retail", "Service Providers"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI HR Assistant",
      icon: "👥",
      trending: false,
      tagline: "Handle hiring, onboarding, and HR tasks without the HR department",
      features: ["Recruitment screening", "Employee onboarding", "Benefits management", "Performance tracking"],
      industries: ["Growing Companies", "Startups", "Professional Services", "Technology"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Local SEO Specialist",
      icon: "🎯",
      trending: false,
      tagline: "Get found by local customers searching for your services",
      features: ["Local SEO optimization", "Review management", "Citation building", "Google My Business"],
      industries: ["Local Services", "Restaurants", "Medical Practices", "Legal Firms"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Appointment Scheduler",
      icon: "📅",
      trending: false,
      tagline: "Fill your calendar with qualified appointments automatically",
      features: ["Online booking", "Calendar optimization", "Reminder automation", "Waitlist management"],
      industries: ["Service Businesses", "Consultants", "Health & Wellness", "Beauty Salons"],
      gradient: "from-red-500 to-orange-400"
    }
  ],
  professionalServices: [
    {
      name: "AI Legal Assistant",
      icon: "⚖️",
      trending: true,
      tagline: "Your paralegal that works 24/7 and never misses a deadline",
      features: ["Document review", "Contract analysis", "Legal research", "Compliance monitoring"],
      industries: ["Law Firms", "Corporate Legal", "Compliance Departments"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Accounting Assistant",
      icon: "🧮",
      trending: false,
      tagline: "Handle complex accounting tasks with precision and speed",
      features: ["Advanced reporting", "Audit preparation", "Tax planning", "Financial analysis"],
      industries: ["Accounting Firms", "Tax Preparers", "Financial Advisors"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Consulting Assistant",
      icon: "💡",
      trending: false,
      tagline: "Research, analyze, and prepare consulting deliverables faster",
      features: ["Market research", "Data analysis", "Report generation", "Client communication"],
      industries: ["Management Consulting", "Business Advisory", "Strategy Firms"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI Project Manager",
      icon: "📊",
      trending: false,
      tagline: "Keep every project on time, on budget, and on track",
      features: ["Project planning", "Resource allocation", "Progress tracking", "Risk management"],
      industries: ["Consulting", "Engineering", "Architecture", "Technology Services"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Proposal Writer",
      icon: "📝",
      trending: false,
      tagline: "Win more business with compelling proposals written in minutes",
      features: ["Proposal automation", "Template management", "Pricing optimization", "Follow-up sequences"],
      industries: ["Professional Services", "Agencies", "B2B Services", "Contractors"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Client Relations Manager",
      icon: "🤝",
      trending: false,
      tagline: "Nurture client relationships and never miss an important touchpoint",
      features: ["Relationship tracking", "Communication automation", "Satisfaction monitoring", "Upsell identification"],
      industries: ["Professional Services", "Agencies", "Consulting", "B2B Services"],
      gradient: "from-red-500 to-orange-400"
    }
  ],
  ecommerce: [
    {
      name: "AI E-commerce Manager",
      icon: "🛍️",
      trending: true,
      tagline: "Your complete online store manager that never sleeps",
      features: ["Product optimization", "Order processing", "Customer service", "Inventory management"],
      industries: ["Online Retail", "Dropshipping", "Marketplaces", "D2C Brands"],
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      name: "AI Product Research Specialist",
      icon: "🔍",
      trending: false,
      tagline: "Find winning products and profitable niches before your competitors",
      features: ["Market analysis", "Trend identification", "Competition analysis", "Profit forecasting"],
      industries: ["E-commerce", "Dropshipping", "Amazon Sellers", "Product Developers"],
      gradient: "from-green-500 to-emerald-400"
    },
    {
      name: "AI Amazon Store Manager",
      icon: "📦",
      trending: false,
      tagline: "Optimize your Amazon business for maximum sales and rankings",
      features: ["Listing optimization", "PPC management", "Inventory planning", "Review monitoring"],
      industries: ["Amazon Sellers", "FBA Businesses", "Private Label Brands"],
      gradient: "from-purple-500 to-pink-400"
    },
    {
      name: "AI Customer Retention Specialist",
      icon: "💕",
      trending: false,
      tagline: "Turn one-time buyers into loyal customers for life",
      features: ["Email marketing", "Loyalty programs", "Personalization", "Churn prevention"],
      industries: ["E-commerce", "Subscription Boxes", "SaaS", "Online Services"],
      gradient: "from-orange-500 to-red-400"
    },
    {
      name: "AI Logistics Coordinator",
      icon: "🚚",
      trending: false,
      tagline: "Streamline your shipping and never have fulfillment headaches",
      features: ["Shipping optimization", "Carrier management", "Tracking automation", "Returns processing"],
      industries: ["E-commerce", "Fulfillment Centers", "Distribution", "Logistics"],
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      name: "AI Conversion Optimizer",
      icon: "📈",
      trending: false,
      tagline: "Turn more visitors into customers with AI-powered optimization",
      features: ["A/B testing", "UX analysis", "Conversion tracking", "Revenue optimization"],
      industries: ["E-commerce", "SaaS", "Online Services", "Digital Products"],
      gradient: "from-red-500 to-orange-400"
    }
  ]
};

const tabLabels = {
  popular: 'Popular',
  healthcare: 'Healthcare',
  realEstate: 'Real Estate',
  smallBusiness: 'Small Business',
  professionalServices: 'Professional Services',
  ecommerce: 'E-commerce'
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');

            if (entry.target === cardsRef.current) {
              const serviceCards = entry.target.querySelectorAll('.employee-card');
              serviceCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-fade-up');
                }, index * 150);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    [titleRef, tabsRef, cardsRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Trigger initial animations for elements already in view
    setTimeout(() => {
      [titleRef, tabsRef, cardsRef, ctaRef].forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            ref.current.classList.add('animate-fade-up');
            
            if (ref.current === cardsRef.current) {
              const serviceCards = ref.current.querySelectorAll('.employee-card');
              serviceCards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-fade-up');
                }, index * 150);
              });
            }
          }
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, [activeTab]);

  const handleTabSwitch = (tab: string) => {
    if (tab === activeTab) return;
    
    setIsAnimating(true);
    // Remove animation from current cards
    const currentCards = cardsRef.current?.querySelectorAll('.employee-card');
    currentCards?.forEach(card => {
      card.classList.remove('animate-fade-up');
      card.classList.add('opacity-0', 'translate-y-8');
    });
    
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
      
      // Re-trigger animations for new cards
      setTimeout(() => {
        const newCards = cardsRef.current?.querySelectorAll('.employee-card');
        newCards?.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-fade-up');
          }, index * 100);
        });
      }, 50);
    }, 300);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/agentumai-support/30min', '_blank');
  };

  const handleCardClick = (employeeName: string) => {
    // You can add analytics tracking here if needed
    console.log(`Card clicked: ${employeeName}`);
    openCalendly();
  };

  const handleLearnMore = (employeeName: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click
    // For now, scroll to automation guide or show more details
    const automationSection = document.querySelector('#automation-guide');
    if (automationSection) {
      automationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentEmployees = aiEmployees[activeTab as keyof typeof aiEmployees] || aiEmployees.popular;

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
        {/* Hero Section */}
        <section className="pt-20 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div ref={titleRef} className="opacity-0 translate-y-8">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight text-white mb-6 sm:mb-8">
                Hire Your{' '}
                <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Digital Workforce</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                AI Employees that work 24/7, never call in sick, and get better every day
              </p>
              
              <Button
                onClick={openCalendly}
                className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Industry Tab Navigation */}
        <section className="pb-8 sm:pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div ref={tabsRef} className="opacity-0 translate-y-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
                {Object.entries(tabLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => handleTabSwitch(key)}
                    disabled={isAnimating}
                    className={`tab-transition px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      activeTab === key
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 transform scale-105'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Employees Cards Grid */}
        <section className="py-8 sm:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div 
              ref={cardsRef} 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-opacity duration-300 ${
                isAnimating ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {currentEmployees.map((employee, index) => (
                <div
                  key={`${activeTab}-${employee.name}`}
                  className="employee-card relative group opacity-0 translate-y-8 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleCardClick(employee.name)}
                >
                  {/* Glow background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${employee.gradient} blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`} />

                  {/* Card content */}
                  <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-6 sm:p-8 h-full transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/10 group-hover:border-white/20">
                    
                    {/* Trending Badge */}
                    {employee.trending && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        🔥 Trending
                      </div>
                    )}

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform transition-transform duration-300 group-hover:scale-110 border border-white/10 bg-white/5 backdrop-blur-lg text-3xl">
                      {employee.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {employee.name}
                      {employee.trending && <span className="ml-2">🔥</span>}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm sm:text-base text-gray-400 italic mb-4 sm:mb-6 leading-relaxed">
                      "{employee.tagline}"
                    </p>

                    {/* Features */}
                    <div className="mb-4 sm:mb-6">
                      {employee.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 mb-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Industries */}
                    <div className="mb-6 sm:mb-8">
                      <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2">Perfect for:</p>
                      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                        {employee.industries.join(', ')}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCalendly();
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/25"
                      >
                        Get Started
                      </Button>
                      {/* <Button
                        variant="outline"
                        onClick={(e) => handleLearnMore(employee.name, e)}
                        className="flex-1 border-white/20 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      >
                        Learn More
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Guide Box */}
        {/* <section id="automation-guide" className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <AutomationGuide />
          </div>
        </section> */}

        {/* Pricing Note */}
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="opacity-0 translate-y-8 animate-fade-up">
              <div className="relative group transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500" />
                <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-white/10 rounded-3xl p-8 sm:p-12 z-10">
                  <p className="text-xl sm:text-2xl md:text-3xl text-white leading-relaxed">
                    AI Employee solutions start from{' '}
                    <span className="font-semibold text-blue-400">$999</span>{' '}
                    and scale with your business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center relative">
            <div ref={ctaRef} className="opacity-0 translate-y-8">
              <div className="relative group transition-all duration-500 transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 z-0" />
                
                <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 group transition-all duration-500 shadow-lg hover:shadow-blue-500/10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                    Ready to hire your{' '}
                    <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">AI workforce?</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    Book a free consultation to discuss which AI employees are right for your business.
                  </p>
                  <Button
                    onClick={openCalendly}
                    className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                  >
                    Schedule Free Consultation
                  </Button>
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

export default Services;