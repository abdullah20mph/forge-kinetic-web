import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Portfolio {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  result: string;
  tags: string[];
  featured: boolean;
  case_study_content?: string;
  technologies_used?: string[];
  project_duration?: string;
  client_name?: string;
  challenges_faced?: string;
  solutions_provided?: string;
  outcomes?: string;
  additional_images?: string[];
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
  const { toast } = useToast();
  const [formData, setFormData] = useState<Portfolio>({
    title: portfolio?.title || '',
    description: portfolio?.description || '',
    image_url: portfolio?.image_url || '',
    result: portfolio?.result || '',
    tags: portfolio?.tags || [],
    featured: portfolio?.featured || false,
    case_study_content: portfolio?.case_study_content || '',
    technologies_used: portfolio?.technologies_used || [],
    project_duration: portfolio?.project_duration || '',
    client_name: portfolio?.client_name || '',
    challenges_faced: portfolio?.challenges_faced || '',
    solutions_provided: portfolio?.solutions_provided || '',
    outcomes: portfolio?.outcomes || '',
    additional_images: portfolio?.additional_images || [],
  });
  const [newTag, setNewTag] = useState('');
  const [newTech, setNewTech] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Starting image upload...', file.name);
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      
      console.log('Uploading to storage bucket...', fileName);
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Upload Failed",
          description: uploadError.message,
          variant: "destructive",
        });
        throw uploadError;
      }

      console.log('Getting public URL...');
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      console.log('Public URL:', publicUrl);
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      
      toast({
        title: "Image Uploaded",
        description: "Portfolio image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Starting additional image upload...', file.name);
    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `additional_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Upload Failed",
          description: uploadError.message,
          variant: "destructive",
        });
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ 
        ...prev, 
        additional_images: [...(prev.additional_images || []), publicUrl]
      }));
      
      toast({
        title: "Image Uploaded",
        description: "Additional image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading additional image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
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

  const addTechnology = () => {
    if (newTech.trim() && !(formData.technologies_used || []).includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies_used: [...(prev.technologies_used || []), newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies_used: (prev.technologies_used || []).filter(tech => tech !== techToRemove)
    }));
  };

  const removeAdditionalImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      additional_images: (prev.additional_images || []).filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started...', formData);
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a description",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.result.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a result/achievement",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.image_url) {
      toast({
        title: "Validation Error",
        description: "Please upload an image",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const portfolioData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        result: formData.result,
        tags: formData.tags,
        featured: formData.featured,
        case_study_content: formData.case_study_content || null,
        technologies_used: formData.technologies_used || null,
        project_duration: formData.project_duration || null,
        client_name: formData.client_name || null,
        challenges_faced: formData.challenges_faced || null,
        solutions_provided: formData.solutions_provided || null,
        outcomes: formData.outcomes || null,
        additional_images: formData.additional_images || null,
      };

      if (portfolio?.id) {
        console.log('Updating existing portfolio...', portfolio.id);
        // Update existing portfolio
        const { error } = await supabase
          .from('portfolios')
          .update({
            ...portfolioData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', portfolio.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        
        console.log('Portfolio updated successfully');
        toast({
          title: "Success",
          description: "Portfolio updated successfully",
        });
      } else {
        console.log('Creating new portfolio...');
        // Create new portfolio
        const { error } = await supabase
          .from('portfolios')
          .insert([portfolioData]);

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        
        console.log('Portfolio created successfully');
        toast({
          title: "Success",
          description: "Portfolio created successfully",
        });
      }

      onSave();
    } catch (error: any) {
      console.error('Error saving portfolio:', error);
      toast({
        title: "Save Error",
        description: error.message || "Failed to save portfolio. Please try again.",
        variant: "destructive",
      });
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
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                </label>
                {formData.image_url && (
                  <span className="text-green-400 text-sm">✓ Image uploaded</span>
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

          {/* Case Study Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Case Study Content
            </label>
            <Textarea
              value={formData.case_study_content || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, case_study_content: e.target.value }))}
              rows={6}
              placeholder="Detailed description of how you worked on this project..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Technologies Used */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies Used
            </label>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  placeholder="Add a technology"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="button" onClick={addTechnology} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.technologies_used || []).map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-green-600 text-white flex items-center space-x-1"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:bg-green-700 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Project Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Duration
            </label>
            <input
              type="text"
              value={formData.project_duration || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, project_duration: e.target.value }))}
              placeholder="e.g., 2 weeks, 1 month"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Client Name (Optional)
            </label>
            <input
              type="text"
              value={formData.client_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
              placeholder="Client or company name"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Challenges Faced */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Challenges Faced
            </label>
            <Textarea
              value={formData.challenges_faced || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, challenges_faced: e.target.value }))}
              rows={4}
              placeholder="What challenges did you encounter during this project?"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Solutions Provided */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Solutions Provided
            </label>
            <Textarea
              value={formData.solutions_provided || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, solutions_provided: e.target.value }))}
              rows={4}
              placeholder="How did you solve the challenges?"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Outcomes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Outcomes & Results
            </label>
            <Textarea
              value={formData.outcomes || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, outcomes: e.target.value }))}
              rows={4}
              placeholder="What were the final outcomes and results?"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Images (Optional)
            </label>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImageUpload}
                  className="hidden"
                  id="additional-image-upload"
                />
                <label
                  htmlFor="additional-image-upload"
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Add Image'}</span>
                </label>
              </div>
              {(formData.additional_images || []).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(formData.additional_images || []).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
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
              disabled={saving || uploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
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
