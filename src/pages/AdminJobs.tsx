import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  MapPin, 
  Clock, 
  Building, 
  Calendar,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock as ClockIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
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
  id: string;
  job_posting_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes: string;
  created_at: string;
  job_title?: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Job form
  const [jobForm, setJobForm] = useState<Partial<JobPosting>>({
    title: '',
    company: 'Agentum',
    location: '',
    type: 'full-time',
    department: '',
    description: '',
    requirements: '',
    benefits: '',
    salary_range: '',
    is_active: true,
    is_featured: false,
    application_deadline: ''
  });

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_postings(title)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
      } else {
        const appsWithJobTitle = (data || []).map(app => ({
          ...app,
          job_title: app.job_postings?.title
        }));
        setApplications(appsWithJobTitle);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = () => {
    setSelectedJob(null);
    setJobForm({
      title: '',
      company: 'Agentum',
      location: '',
      type: 'full-time',
      department: '',
      description: '',
      requirements: '',
      benefits: '',
      salary_range: '',
      is_active: true,
      is_featured: false,
      application_deadline: ''
    });
    setJobDialogOpen(true);
  };

  const handleEditJob = (job: JobPosting) => {
    setSelectedJob(job);
    setJobForm(job);
    setJobDialogOpen(true);
  };

  const handleSaveJob = async () => {
    if (!jobForm.title || !jobForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and description",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      if (selectedJob) {
        // Update existing job
        const { error } = await supabase
          .from('job_postings')
          .update(jobForm)
          .eq('id', selectedJob.id);

        if (error) {
          console.error('Error updating job:', error);
          toast({
            title: "Error",
            description: "Failed to update job posting",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Job posting updated successfully",
          });
          setJobDialogOpen(false);
          fetchJobs();
        }
      } else {
        // Create new job
        const { error } = await supabase
          .from('job_postings')
          .insert([jobForm]);

        if (error) {
          console.error('Error creating job:', error);
          toast({
            title: "Error",
            description: "Failed to create job posting",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Job posting created successfully",
          });
          setJobDialogOpen(false);
          fetchJobs();
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save job posting",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Error deleting job:', error);
        toast({
          title: "Error",
          description: "Failed to delete job posting",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Job posting deleted successfully",
        });
        fetchJobs();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) {
        console.error('Error updating application:', error);
        toast({
          title: "Error",
          description: "Failed to update application status",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Application status updated",
        });
        fetchApplications();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'internship': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <AdminNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <AdminNavigation />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Job Management</h1>
              <p className="text-gray-400">Manage job postings and applications</p>
            </div>
            <Button onClick={handleCreateJob} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Job Posting
            </Button>
          </div>

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Job Postings ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Applications ({applications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-6">
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <Card key={job.id} className="bg-gray-900 border-white/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-white text-xl">{job.title}</CardTitle>
                            {job.is_featured && (
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            )}
                            {!job.is_active && (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">
                                Inactive
                              </Badge>
                            )}
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
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {job.department}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditJob(job)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteJob(job.id)}
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 line-clamp-2 mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          {job.salary_range && (
                            <span>Salary: {job.salary_range}</span>
                          )}
                          {job.application_deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Deadline: {formatDate(job.application_deadline)}</span>
                            </div>
                          )}
                        </div>
                        <span>Created: {formatDate(job.created_at)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="grid gap-6">
                {applications.map((application) => (
                  <Card key={application.id} className="bg-gray-900 border-white/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg mb-2">
                            {application.applicant_name}
                          </CardTitle>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{application.job_title}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{application.applicant_email}</span>
                            </div>
                            {application.applicant_phone && (
                              <div className="flex items-center gap-1">
                                <span>{application.applicant_phone}</span>
                              </div>
                            )}
                            <Badge variant="secondary" className={getStatusColor(application.status)}>
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setApplicationDialogOpen(true);
                            }}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Status:</span>
                          <Select
                            value={application.status}
                            onValueChange={(value) => handleUpdateApplicationStatus(application.id, value)}
                          >
                            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="reviewed">Reviewed</SelectItem>
                              <SelectItem value="shortlisted">Shortlisted</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <span className="text-sm text-gray-400">
                          Applied: {formatDate(application.created_at)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Job Form Dialog */}
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedJob ? 'Edit Job Posting' : 'Create New Job Posting'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <Input
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  placeholder="e.g., Senior React Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <Input
                  value={jobForm.company}
                  onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={jobForm.location}
                  onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                  placeholder="e.g., Remote, New York, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Job Type</label>
                <Select value={jobForm.type} onValueChange={(value) => setJobForm({...jobForm, type: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <Input
                  value={jobForm.department}
                  onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                  placeholder="e.g., Engineering, Marketing"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                value={jobForm.description}
                onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                placeholder="Detailed job description..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Requirements</label>
                <Textarea
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                  placeholder="Required skills and experience..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Benefits</label>
                <Textarea
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                  placeholder="Benefits and perks..."
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Salary Range</label>
                <Input
                  value={jobForm.salary_range}
                  onChange={(e) => setJobForm({...jobForm, salary_range: e.target.value})}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Application Deadline</label>
                <Input
                  type="date"
                  value={jobForm.application_deadline}
                  onChange={(e) => setJobForm({...jobForm, application_deadline: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={jobForm.is_active}
                    onCheckedChange={(checked) => setJobForm({...jobForm, is_active: checked})}
                  />
                  <label className="text-sm font-medium">Active</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={jobForm.is_featured}
                    onCheckedChange={(checked) => setJobForm({...jobForm, is_featured: checked})}
                  />
                  <label className="text-sm font-medium">Featured</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setJobDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveJob} disabled={saving}>
                {saving ? 'Saving...' : (selectedJob ? 'Update Job' : 'Create Job')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Applicant Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedApplication.applicant_name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedApplication.applicant_email}
                    </div>
                    {selectedApplication.applicant_phone && (
                      <div>
                        <span className="font-medium">Phone:</span> {selectedApplication.applicant_phone}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Applied for:</span> {selectedApplication.job_title}
                    </div>
                    <div>
                      <span className="font-medium">Applied on:</span> {formatDate(selectedApplication.created_at)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedApplication.resume_url && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Resume</h3>
                    <a 
                      href={selectedApplication.resume_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  </CardContent>
                </Card>
              )}

              {selectedApplication.cover_letter && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Cover Letter</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {selectedApplication.cover_letter}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setApplicationDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 