
-- Add detailed case study fields to the portfolios table
ALTER TABLE public.portfolios 
ADD COLUMN IF NOT EXISTS case_study_content TEXT,
ADD COLUMN IF NOT EXISTS technologies_used TEXT[],
ADD COLUMN IF NOT EXISTS project_duration TEXT,
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS challenges_faced TEXT,
ADD COLUMN IF NOT EXISTS solutions_provided TEXT,
ADD COLUMN IF NOT EXISTS outcomes TEXT,
ADD COLUMN IF NOT EXISTS additional_images TEXT[];

-- Update the existing portfolio to have some sample data if needed
COMMENT ON COLUMN public.portfolios.case_study_content IS 'Detailed description of the case study process';
COMMENT ON COLUMN public.portfolios.technologies_used IS 'Array of technologies used in the project';
COMMENT ON COLUMN public.portfolios.project_duration IS 'Duration of the project (e.g., "2 weeks", "1 month")';
COMMENT ON COLUMN public.portfolios.client_name IS 'Name of the client (optional)';
COMMENT ON COLUMN public.portfolios.challenges_faced IS 'Description of challenges encountered';
COMMENT ON COLUMN public.portfolios.solutions_provided IS 'Solutions implemented to address challenges';
COMMENT ON COLUMN public.portfolios.outcomes IS 'Final outcomes and results achieved';
COMMENT ON COLUMN public.portfolios.additional_images IS 'Array of additional image URLs for the case study';
