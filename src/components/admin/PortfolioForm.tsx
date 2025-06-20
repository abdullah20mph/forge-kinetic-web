
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Portfolio {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  result: string;
  tags: string[];
  featured: boolean;
}

interface PortfolioFormProps {
  portfolio?: Portfolio;
  onSave: () => void;
  onCancel: () => void;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
  portfolio,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Portfolio>({
    title: portfolio?.title || '',
    description: portfolio?.description || '',
    image_url: portfolio?.image_url || '',
    result: portfolio?.result || '',
    tags: portfolio?.tags || [],
    featured: portfolio?.featured || false,
  });
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (portfolio?.id) {
        // Update existing portfolio
        const { error } = await supabase
          .from('portfolios')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', portfolio.id);

        if (error) throw error;
      } else {
        // Create new portfolio
        const { error } = await supabase
          .from('portfolios')
          .insert([formData]);

        if (error) throw error;
      }

      onSave();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">
          {portfolio ? 'Edit Portfolio' : 'Add New Portfolio'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Result */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Result/Achievement *
            </label>
            <input
              type="text"
              value={formData.result}
              onChange={(e) => setFormData(prev => ({ ...prev, result: e.target.value }))}
              placeholder="e.g., Built in 10 days using GPT + Zapier"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Portfolio Image *
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </label>
                {formData.image_url && (
                  <span className="text-green-400 text-sm">Image uploaded</span>
                )}
              </div>
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded-md border border-gray-700"
                />
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="button" onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-blue-600 text-white flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-300">
              Display on homepage (featured portfolio)
            </label>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={saving || uploading || !formData.image_url}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? 'Saving...' : 'Save Portfolio'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
