-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS public.job_applications CASCADE;
DROP TABLE IF EXISTS public.job_postings CASCADE;

-- Create job postings table
CREATE TABLE public.job_postings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'Agentum',
  location TEXT,
  type TEXT NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  department TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  salary_range TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  application_deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create job applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_posting_id UUID NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_job_postings_active ON public.job_postings(is_active);
CREATE INDEX idx_job_postings_featured ON public.job_postings(is_featured);
CREATE INDEX idx_job_postings_type ON public.job_postings(type);
CREATE INDEX idx_job_postings_department ON public.job_postings(department);
CREATE INDEX idx_job_applications_job_id ON public.job_applications(job_posting_id);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);
CREATE INDEX idx_job_applications_email ON public.job_applications(applicant_email);

-- Enable Row Level Security
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for job_postings
CREATE POLICY "Anyone can view active job postings" 
  ON public.job_postings 
  FOR SELECT 
  TO public
  USING (is_active = true);

CREATE POLICY "Admin can manage all job postings" 
  ON public.job_postings 
  FOR ALL 
  TO authenticated
  USING (true);

-- Policies for job_applications
CREATE POLICY "Anyone can submit job applications" 
  ON public.job_applications 
  FOR INSERT 
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can view all job applications" 
  ON public.job_applications 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update job applications" 
  ON public.job_applications 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE public.job_postings IS 'Stores job posting information';
COMMENT ON TABLE public.job_applications IS 'Stores job applications submitted by candidates';
COMMENT ON COLUMN public.job_postings.type IS 'Employment type: full-time, part-time, contract, internship';
COMMENT ON COLUMN public.job_applications.status IS 'Application status: pending, reviewed, shortlisted, rejected, hired'; 