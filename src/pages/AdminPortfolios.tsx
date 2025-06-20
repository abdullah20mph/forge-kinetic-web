
import React, { useEffect, useState } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { PortfolioForm } from '@/components/admin/PortfolioForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Portfolio {
  id: string;
  title: string;
  description: string;
  image_url: string;
  result: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

const AdminPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolios(data || []);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchPortfolios();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('Failed to delete portfolio');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ featured: !featured })
        .eq('id', id);

      if (error) throw error;
      fetchPortfolios();
    } catch (error) {
      console.error('Error updating portfolio:', error);
      alert('Failed to update portfolio');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPortfolio(null);
    fetchPortfolios();
  };

  if (showForm || editingPortfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <AdminNavigation />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <PortfolioForm
              portfolio={editingPortfolio || undefined}
              onSave={handleFormClose}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <AdminNavigation />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Portfolio Management</h1>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Portfolio
            </Button>
          </div>

          {loading ? (
            <div className="text-center text-white">Loading portfolios...</div>
          ) : portfolios.length === 0 ? (
            <Card className="bg-gray-900 border-white/10">
              <CardContent className="text-center py-12">
                <p className="text-gray-400 mb-4">No portfolios found</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Portfolio
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <Card key={portfolio.id} className="bg-gray-900 border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white text-lg line-clamp-2">
                        {portfolio.title}
                      </CardTitle>
                      <button
                        onClick={() => toggleFeatured(portfolio.id, portfolio.featured)}
                        className={`p-1 rounded ${
                          portfolio.featured
                            ? 'text-yellow-500 hover:text-yellow-400'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${portfolio.featured ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={portfolio.image_url}
                      alt={portfolio.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {portfolio.description}
                    </p>
                    <p className="text-blue-400 text-sm font-medium">
                      {portfolio.result}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {portfolio.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="text-xs bg-gray-700 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setEditingPortfolio(portfolio)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(portfolio.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolios;
