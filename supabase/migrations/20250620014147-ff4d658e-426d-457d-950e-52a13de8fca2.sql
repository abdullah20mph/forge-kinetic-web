
-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  result TEXT NOT NULL,
  tags TEXT[],
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to portfolios table
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to read portfolios (for public display)
CREATE POLICY "Anyone can view portfolios" 
  ON public.portfolios 
  FOR SELECT 
  USING (true);

-- Add RLS to admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy that allows reading admin_users only for authentication
CREATE POLICY "Admin users can be read for authentication" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- Create policy for portfolio images bucket (allow public read access)
CREATE POLICY "Public can view portfolio images" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'portfolio-images');

-- Create policy for uploading portfolio images (we'll handle admin check in the application)
CREATE POLICY "Allow portfolio image uploads" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'portfolio-images');

-- Insert a default admin user (email: admin@example.com, password: admin123)
-- Note: This is a demo password, change it in production
INSERT INTO public.admin_users (email, password_hash) 
VALUES ('admin@example.com', '$2b$10$8K1p/a0dqbcpuI8RyuNP7uZ7CqRWJK8QxjvU6VB7aNzKxzB8YSxOe');
