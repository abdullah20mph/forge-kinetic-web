import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the same values as server.js
const supabaseUrl = "https://gymsiiymqometjnfqsxy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXNpaXltcW9tZXRqbmZxc3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTgzOTQsImV4cCI6MjA2NTU5NDM5NH0.SLJZP8Il9Y9u_nEkUwoSSIMHj4ayfQZ1EYqozQcqtpI";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test 1: Check if table exists by trying to select from it
    console.log('\n1. Testing table access...');
    const { data: testData, error: testError } = await supabase
      .from('chatbot_conversations')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.error('❌ Table access error:', testError);
      return;
    }
    
    console.log('✅ Table exists and is accessible');
    console.log('Current records:', testData?.length || 0);
    
    // Test 2: Try to insert a test record
    console.log('\n2. Testing insert...');
    const testRecord = {
      session_id: 'test_session_' + Date.now(),
      user_message: 'Test message',
      bot_response: 'Test response',
      model_used: 'test',
      response_time_ms: 100
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('chatbot_conversations')
      .insert(testRecord)
      .select();
    
    if (insertError) {
      console.error('❌ Insert error:', insertError);
      return;
    }
    
    console.log('✅ Insert successful:', insertData);
    
    // Test 3: Clean up test record
    console.log('\n3. Cleaning up test record...');
    const { error: deleteError } = await supabase
      .from('chatbot_conversations')
      .delete()
      .eq('session_id', testRecord.session_id);
    
    if (deleteError) {
      console.error('❌ Delete error:', deleteError);
    } else {
      console.log('✅ Test record cleaned up');
    }
    
    console.log('\n🎉 All tests passed! Supabase is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSupabase(); 