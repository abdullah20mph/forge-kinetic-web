
import React, { useEffect, useState } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen, Star, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPortfolios: 0,
    featuredPortfolios: 0,
    recentPortfolios: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: portfolios } = await supabase
          .from('portfolios')
          .select('*');

        if (portfolios) {
          const now = new Date();
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

          setStats({
            totalPortfolios: portfolios.length,
            featuredPortfolios: portfolios.filter(p => p.featured).length,
            recentPortfolios: portfolios.filter(p => 
              new Date(p.created_at) >= oneWeekAgo
            ).length,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Portfolios',
      value: stats.totalPortfolios,
      icon: FolderOpen,
      color: 'text-blue-500',
    },
    {
      title: 'Featured Portfolios',
      value: stats.featuredPortfolios,
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      title: 'Recent (7 days)',
      value: stats.recentPortfolios,
      icon: Calendar,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <AdminNavigation />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="bg-gray-900 border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">
                      {loading ? '...' : stat.value}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gray-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/admin/portfolios"
                  className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-white font-medium">Manage Portfolios</h3>
                    <p className="text-gray-400 text-sm">Add, edit, or delete portfolio items</p>
                  </div>
                </a>
                <a
                  href="/"
                  target="_blank"
                  className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Star className="w-6 h-6 text-yellow-500" />
                  <div>
                    <h3 className="text-white font-medium">View Homepage</h3>
                    <p className="text-gray-400 text-sm">See how portfolios appear to visitors</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
