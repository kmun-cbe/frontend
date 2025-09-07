import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Video,
  Play,
  Save,
  X,
  Upload
} from 'lucide-react';
import { galleryAPI } from '../../services/api';
import { GalleryItem } from '../../types';
import toast from 'react-hot-toast';
import { useFormOpenScroll } from '../../hooks/useScrollToTop';

const GalleryManager: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    imageUrl: '',
    videoUrl: '',
    category: ''
  });

  useEffect(() => {
    fetchGalleryData();
  }, []);

  // Scroll to top when form is opened
  useFormOpenScroll(showAddForm, '.gallery-form-container');

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse] = await Promise.all([
        galleryAPI.getAll(),
        galleryAPI.getCategories()
      ]);

      if (itemsResponse.success) {
        setGalleryItems(itemsResponse.data);
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      toast.error('Failed to load gallery data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.imageUrl || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.type === 'video' && !formData.videoUrl) {
      toast.error('Video URL is required for video type');
      return;
    }
    
    try {
      setSaving(true);
      const itemData = {
        title: formData.title,
        type: formData.type,
        imageUrl: formData.imageUrl,
        videoUrl: formData.type === 'video' ? formData.videoUrl : undefined,
        category: formData.category
      };

      let response;
      if (editingItem) {
        response = await galleryAPI.update(editingItem.id, itemData);
        if (response.success) {
          toast.success('Gallery item updated successfully');
        }
      } else {
        response = await galleryAPI.create(itemData);
        if (response.success) {
          toast.success('Gallery item created successfully');
        }
      }
      
      if (response.success) {
        setShowAddForm(false);
        setEditingItem(null);
        resetForm();
        fetchGalleryData();
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error(editingItem ? 'Failed to update gallery item' : 'Failed to create gallery item');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl || '',
      category: item.category
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) {
      return;
    }

    try {
      setSaving(true);
      const response = await galleryAPI.delete(id);
      if (response.success) {
        toast.success('Gallery item deleted successfully');
        fetchGalleryData();
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'image',
      imageUrl: '',
      videoUrl: '',
      category: ''
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Gallery Manager</h3>
          <p className="text-gray-600">Manage gallery images and videos</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Items
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
              placeholder="Search by title..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 gallery-form-container">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">
              {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h4>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                  placeholder="Enter item title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'image' | 'video'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                  required
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Thumbnail for videos) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="Enter image URL"
                required
              />
            </div>

            {formData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="Enter category (e.g., portraits, highlights, events)"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? 'Update' : 'Add'} Item</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold text-gray-900">Gallery Items</h5>
            <div className="text-sm text-gray-500">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h6 className="text-lg font-medium text-gray-900 mb-2">No items found</h6>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== 'all' 
                  ? 'No items match your current filters.' 
                  : 'No gallery items available yet.'
                }
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Item</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Type Indicator */}
                    <div className="absolute top-2 right-2">
                      <div className={`p-1.5 rounded-full ${
                        item.type === 'video' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {item.type === 'video' ? (
                          <Video className="w-3 h-3" />
                        ) : (
                          <ImageIcon className="w-3 h-3" />
                        )}
                      </div>
                    </div>

                    {/* Video Play Button */}
                    {item.type === 'video' && item.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleVideoClick(item.videoUrl!)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Play className="w-4 h-4" fill="currentColor" />
                        </button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-2 left-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        title="Edit item"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h6 className="text-white font-medium text-xs line-clamp-2">
                        {item.title}
                      </h6>
                      <p className="text-blue-200 text-xs mt-1 capitalize">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;


