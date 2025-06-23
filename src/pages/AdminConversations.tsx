import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, Clock, Zap, MessageSquare, User, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = "https://gymsiiymqometjnfqsxy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXNpaXltcW9tZXRqbmZxc3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTgzOTQsImV4cCI6MjA2NTU5NDM5NH0.SLJZP8Il9Y9u_nEkUwoSSIMHj4ayfQZ1EYqozQcqtpI";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Conversation {
  id: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  model_used: string;
  response_time_ms: number;
  created_at: string;
}

export default function AdminConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [sessionConversations, setSessionConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbot_conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching conversations:', error);
      } else {
        setConversations(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionConversations = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chatbot_conversations')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching session conversations:', error);
      } else {
        setSessionConversations(data || []);
        setSelectedSession(sessionId);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getUniqueSessions = () => {
    const sessions = new Set(conversations.map(c => c.session_id));
    return Array.from(sessions);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (selectedSession) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/conversations" 
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                onClick={() => setSelectedSession(null)}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to All Sessions</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Session: {selectedSession}</h1>
          </div>

          {/* Session Conversations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 space-y-4">
              {sessionConversations.map((conv, index) => (
                <div key={conv.id} className="space-y-3">
                  {/* User Message */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">{conv.user_message}</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-700" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900 mb-2">{conv.bot_response}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(conv.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span className={`px-1.5 py-0.5 rounded ${
                            conv.model_used === 'gemini-1.5-flash' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {conv.model_used === 'gemini-1.5-flash' ? 'Gemini' : 'Fallback'}
                          </span>
                        </div>
                        <span>{conv.response_time_ms}ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chatbot Conversations</h1>
            <p className="text-gray-600 mt-1">View and analyze chatbot interactions</p>
          </div>
          <Link 
            to="/admin" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Admin</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Unique Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{getUniqueSessions().length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {conversations.length > 0 
                    ? Math.round(conversations.reduce((sum, c) => sum + c.response_time_ms, 0) / conversations.length)
                    : 0}ms
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Gemini Usage</p>
                <p className="text-2xl font-bold text-gray-900">
                  {conversations.filter(c => c.model_used === 'gemini-1.5-flash').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {getUniqueSessions().slice(0, 20).map((sessionId) => {
              const sessionConvs = conversations.filter(c => c.session_id === sessionId);
              const firstConv = sessionConvs[0];
              const lastConv = sessionConvs[sessionConvs.length - 1];
              
              return (
                <div 
                  key={sessionId} 
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => fetchSessionConversations(sessionId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {sessionConvs.length} messages
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {formatTime(firstConv.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {firstConv.user_message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lastConv.model_used === 'gemini-1.5-flash' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {lastConv.model_used === 'gemini-1.5-flash' ? 'Gemini' : 'Fallback'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {lastConv.response_time_ms}ms
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 