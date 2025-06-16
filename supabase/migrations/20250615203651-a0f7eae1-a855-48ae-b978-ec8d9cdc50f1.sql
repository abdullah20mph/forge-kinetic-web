
-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Agentum Team',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read_time TEXT NOT NULL DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  TO public
  USING (true);

-- Create policy to allow insert (you can restrict this later with authentication)
CREATE POLICY "Anyone can insert blog posts" 
  ON public.blog_posts 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow updates
CREATE POLICY "Anyone can update blog posts" 
  ON public.blog_posts 
  FOR UPDATE 
  TO public
  USING (true);

-- Create policy to allow deletes
CREATE POLICY "Anyone can delete blog posts" 
  ON public.blog_posts 
  FOR DELETE 
  TO public
  USING (true);
