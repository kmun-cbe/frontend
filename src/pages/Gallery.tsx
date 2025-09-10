import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Video } from 'lucide-react';
import { galleryAPI } from '@/services/api';
import { GalleryItem } from '@/types';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const comingSoon = true;

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

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
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const category = selectedCategory === 'all' ? undefined : selectedCategory;
      const response = await galleryAPI.getAll(category);
      
      if (response.success) {
        setGalleryItems(response.data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Temporarily show "Available soon" notice and suppress grid/filter rendering
  if (comingSoon) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Gallery will be available soon. Stay tuned for updates!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Coming Soon Message */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-6">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">Available soon</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">We are curating the best moments</h2>
            <p className="text-gray-600">
              Our team is putting together highlights and media from Kumaraguru MUN. Please check back later to explore the full gallery.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore the highlights from previous Kumaraguru MUNs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <ImageIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                {selectedCategory === 'all' 
                  ? 'No gallery items available yet.' 
                  : `No items found in the "${selectedCategory}" category.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Type Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`p-2 rounded-full ${
                        item.type === 'video' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        {item.type === 'video' ? (
                          <Video className="w-4 h-4" />
                        ) : (
                          <ImageIcon className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Video Play Button Overlay */}
                    {item.type === 'video' && item.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleVideoClick(item.videoUrl!)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <Play className="w-6 h-6" fill="currentColor" />
                        </button>
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-blue-200 text-xs mt-1 capitalize">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;