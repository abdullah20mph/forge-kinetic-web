
-- Add INSERT policy to allow portfolio creation
CREATE POLICY "Allow portfolio creation" 
  ON public.portfolios 
  FOR INSERT 
  WITH CHECK (true);

-- Add UPDATE policy to allow portfolio editing
CREATE POLICY "Allow portfolio updates" 
  ON public.portfolios 
  FOR UPDATE 
  USING (true);

-- Add DELETE policy to allow portfolio removal
CREATE POLICY "Allow portfolio deletion" 
  ON public.portfolios 
  FOR DELETE 
  USING (true);
