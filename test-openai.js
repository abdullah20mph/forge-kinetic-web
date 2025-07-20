import OpenAI from 'openai';

const apiKey = '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';

async function testOpenAI() {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const prompt = "Say hello in a fun way!";
    
    console.log('Testing OpenAI API...');
    console.log('Prompt:', prompt);
    
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      
    const reply = completion.choices[0].message.content;
    console.log('OpenAI API reply:', reply);
    console.log('✅ OpenAI API is working!');
    
  } catch (err) {
    console.error('❌ OpenAI API error:', err);
    
    if (err.status === 401) {
      console.error('Invalid API key. Please check your OPENAI_API_KEY.');
    } else if (err.status === 429) {
      console.error('Rate limit exceeded. Please try again later.');
    } else if (err.status === 500) {
      console.error('OpenAI server error. Please try again.');
    }
  }
}

testOpenAI(); 