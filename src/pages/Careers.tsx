import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  Calendar,
  Search,
  Star,
  X,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { toast } from '@/hooks/use-toast';

// Initialize Supabase client
const supabaseUrl = "https://gymsiiymqometjnfqsxy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXNpaXltcW9tZXRqbmZxc3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTgzOTQsImV4cCI6MjA2NTU5NDM5NH0.SLJZP8Il9Y9u_nEkUwoSSIMHj4ayfQZ1EYqozQcqtpI";
const supabase = createClient(supabaseUrl, supabaseKey);

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  department: string;
  description: string;
  requirements: string;
  benefits: string;
  salary_range: string;
  is_active: boolean;
  is_featured: boolean;
  application_deadline: string;
  created_at: string;
}

interface JobApplication {
  job_posting_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter: string;
}

export default function Careers() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Application form
  const [application, setApplication] = useState<JobApplication>({
    job_posting_id: '',
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    resume_url: '',
    cover_letter: ''
  });
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, typeFilter, departmentFilter, locationFilter]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to load job postings",
          variant: "destructive",
        });
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(job => job.department === departmentFilter);
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(job => job.location === locationFilter);
    }

    setFilteredJobs(filtered);
  };

  const getUniqueDepartments = () => {
    const departments = jobs.map(job => job.department).filter(Boolean);
    return [...new Set(departments)];
  };

  const getUniqueLocations = () => {
    const locations = jobs.map(job => job.location).filter(Boolean);
    return [...new Set(locations)];
  };

  const handleApply = (job: JobPosting) => {
    setSelectedJob(job);
    setApplication({
      ...application,
      job_posting_id: job.id
    });
    setApplicationOpen(true);
  };

  const handleSubmitApplication = async () => {
    if (!application.applicant_name || !application.applicant_email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email",
        variant: "destructive",
      });
      return;
    }

    setApplying(true);
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert([application]);

      if (error) {
        console.error('Error submitting application:', error);
        toast({
          title: "Error",
          description: "Failed to submit application",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully!",
        });
        setApplicationOpen(false);
        setApplication({
          job_posting_id: '',
          applicant_name: '',
          applicant_email: '',
          applicant_phone: '',
          resume_url: '',
          cover_letter: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-500/10 text-green-400';
      case 'part-time': return 'bg-blue-500/10 text-blue-400';
      case 'contract': return 'bg-purple-500/10 text-purple-400';
      case 'internship': return 'bg-orange-500/10 text-orange-400';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  // Animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (quoteRef.current) observer.observe(quoteRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Quote animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const quote = entry.target.querySelector('.quote-text');
            const paragraph = entry.target.querySelector('.quote-paragraph');

            if (quote) {
              setTimeout(() => {
                quote.classList.add('animate-zoom-fade-in');
              }, 300);
            }

            if (paragraph) {
              setTimeout(() => {
                paragraph.classList.add('animate-fade-in');
              }, 800);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      <Navigation />

      {/* Quote Section */}
      <section
        ref={quoteRef}
        className="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-blue-950 relative overflow-hidden"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-gray-600/20 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Main Quote */}
          <blockquote className=" opacity-100 scale-100 mb-10 transition-all duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold text-white ">
              Careers at{' '}
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Agentum AI
              </span>
            </h2>
          </blockquote>

          {/* Supporting Paragraph */}
          <div className=" opacity-100 mb-8">
            <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto ">
              Join a team that values innovation, collaboration, and impact. We're looking for passionate individuals
              who want to shape the future of AI and digital transformation.
            </p>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap justify-center gap-6 text-base font-medium mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span>Remote-first culture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span>Competitive benefits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span>Growth opportunities</span>
            </div>
          </div>
        </div>
      </section>

    

      {/* Job Listings */}
      <section className="pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Open Positions
            </h2>
            <span className="text-gray-400">{filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.length === 0 ? (
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl text-center py-16">
                <CardContent>
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No jobs found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or check back later for new opportunities.</p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300">
                        {job.title}
                      </CardTitle>
                      {job.is_featured && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span>{job.company}</span>
                      </div>
                      {job.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <Badge variant="secondary" className={getTypeColor(job.type)}>
                          {job.type.replace('-', ' ')}
                        </Badge>
                      </div>
                      {job.department && (
                        <Badge variant="outline" className="border-white/10 text-gray-300">
                          {job.department}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-gray-300 line-clamp-3">
                        {job.description}
                      </p>

                      {job.salary_range && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="font-medium">Salary:</span>
                          <span>{job.salary_range}</span>
                        </div>
                      )}

                      {job.application_deadline && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Application deadline: {formatDate(job.application_deadline)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <Button variant="outline" className="border border-white/10 text-blue-400 hover:bg-blue-500/10 hover:text-white" onClick={() => handleApply(job)}>
                        View Details & Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Job Details */}
            {selectedJob && (
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Job Details</h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{selectedJob.company}</span>
                    </div>
                    {selectedJob.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedJob.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <Badge variant="secondary" className={getTypeColor(selectedJob.type)}>
                        {selectedJob.type.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    value={application.applicant_name}
                    onChange={(e) => setApplication({ ...application, applicant_name: e.target.value })}
                    placeholder="Your full name"
                    className="bg-gray-800 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={application.applicant_email}
                    onChange={(e) => setApplication({ ...application, applicant_email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-gray-800 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  value={application.applicant_phone}
                  onChange={(e) => setApplication({ ...application, applicant_phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="bg-gray-800 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resume URL</label>
                <Input
                  value={application.resume_url}
                  onChange={(e) => setApplication({ ...application, resume_url: e.target.value })}
                  placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                  className="bg-gray-800 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cover Letter</label>
                <Textarea
                  value={application.cover_letter}
                  onChange={(e) => setApplication({ ...application, cover_letter: e.target.value })}
                  placeholder="Tell us why you're interested in this position..."
                  rows={4}
                  className="bg-gray-800 border border-white/10 text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border border-white/10 text-gray-300 hover:text-white hover:bg-gray-800" onClick={() => setApplicationOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmitApplication} disabled={applying}>
                {applying ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
} 