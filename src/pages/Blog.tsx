
import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogAdmin } from '../components/BlogAdmin';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
  read_time: string;
}

const Blog = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: blogPosts = [], refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      
      return data;
    }
  });

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const handleNewPost = async (newPost: Omit<BlogPost, 'id'>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([newPost]);
      
      if (error) {
        console.error('Error creating blog post:', error);
        throw error;
      }
      
      // Refetch the posts to update the list
      refetch();
    } catch (error) {
      console.error('Failed to create blog post:', error);
    }
  };

  if (showAdmin) {
    return <BlogAdmin onBack={() => setShowAdmin(false)} onNewPost={handleNewPost} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
              Blog &{' '}
              <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Latest thoughts on AI, development, and building fast.
            </p>
            <Button 
              onClick={() => setShowAdmin(true)}
              className="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Admin Panel
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 bg-gray-800 p-1 rounded-xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-0">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-400">{post.read_time}</span>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.published_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No blog posts found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
