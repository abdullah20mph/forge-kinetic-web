-- Create chatbot conversations table
CREATE TABLE public.chatbot_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  bot_response TEXT NOT NULL,
  model_used TEXT,
  response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on session_id for faster queries
CREATE INDEX idx_chatbot_conversations_session_id ON public.chatbot_conversations(session_id);

-- Create an index on created_at for time-based queries
CREATE INDEX idx_chatbot_conversations_created_at ON public.chatbot_conversations(created_at);

-- Enable Row Level Security
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert access (for storing conversations)
CREATE POLICY "Anyone can insert chatbot conversations" 
  ON public.chatbot_conversations 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create policy to allow public read access (for viewing conversation history)
CREATE POLICY "Anyone can view chatbot conversations" 
  ON public.chatbot_conversations 
  FOR SELECT 
  TO public
  USING (true);

-- Add comments for documentation
COMMENT ON TABLE public.chatbot_conversations IS 'Stores chatbot conversation history';
COMMENT ON COLUMN public.chatbot_conversations.session_id IS 'Unique identifier for a conversation session';
COMMENT ON COLUMN public.chatbot_conversations.user_message IS 'The message sent by the user';
COMMENT ON COLUMN public.chatbot_conversations.bot_response IS 'The response from the chatbot';
COMMENT ON COLUMN public.chatbot_conversations.model_used IS 'The AI model used (e.g., gemini-1.5-flash, fallback)';
COMMENT ON COLUMN public.chatbot_conversations.response_time_ms IS 'Response time in milliseconds'; 