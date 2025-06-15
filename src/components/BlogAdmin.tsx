
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Navigation } from './Navigation';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  published_at: string;
  read_time: string;
}

interface BlogAdminProps {
  onBack: () => void;
  onNewPost: (post: BlogPost) => void;
}

export const BlogAdmin = ({ onBack, onNewPost }: BlogAdminProps) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BlogPost>({
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: 'FastForge Team',
      published_at: new Date().toISOString().split('T')[0],
      read_time: '5 min read'
    }
  });

  const onSubmit = async (data: BlogPost) => {
    setIsSubmitting(true);
    try {
      await onNewPost(data);
      form.reset({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        author: 'FastForge Team',
        published_at: new Date().toISOString().split('T')[0],
        read_time: '5 min read'
      });
      setShowForm(false);
      toast({
        title: "Success!",
        description: "Blog post created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-gray-300 hover:border-blue-500 hover:text-blue-400"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
            <h1 className="text-3xl font-bold text-white">Blog Admin</h1>
          </div>

          {!showForm ? (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Blog Management
                  <Button 
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus size={16} className="mr-2" />
                    New Post
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Manage your blog posts here. Click "New Post" to create a new blog entry.
                </p>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">
                    <strong>Connected to Supabase!</strong> Your blog posts are now stored persistently in the database.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Create New Blog Post
                  <Button 
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-white/20 text-gray-300 hover:border-red-500 hover:text-red-400"
                  >
                    Cancel
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Title</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800 border-white/20 text-white"
                              placeholder="Enter blog post title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      rules={{ required: "Excerpt is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Excerpt</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-gray-800 border-white/20 text-white"
                              placeholder="Brief description of the post"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      rules={{ required: "Content is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Content</FormLabel>
                          <FormControl>
                            <textarea 
                              {...field} 
                              className="w-full min-h-[200px] bg-gray-800 border border-white/20 text-white rounded-md px-3 py-2"
                              placeholder="Write your blog post content here..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="bg-gray-800 border-white/20 text-white"
                                placeholder="e.g., AI, Development"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Author</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="bg-gray-800 border-white/20 text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="read_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Read Time</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="bg-gray-800 border-white/20 text-white"
                                placeholder="e.g., 5 min read"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Post'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
