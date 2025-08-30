import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Gallery: React.FC = () => {
  const committees = [
    {
      id: 1,
      name: 'United Nations Security Council',
      shortName: 'UNSC',
      image: 'https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'The Security Council has primary responsibility for the maintenance of international peace and security.'
    },
    {
      id: 2,
      name: 'General Assembly First Committee',
      shortName: 'GA1',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Deals with disarmament, global challenges and threats to peace that affect the international community.'
    },
    {
      id: 3,
      name: 'Economic and Social Council',
      shortName: 'ECOSOC',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Coordinates economic and social work of the UN and its specialized agencies.'
    },
    {
      id: 4,
      name: 'Human Rights Council',
      shortName: 'HRC',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Responsible for promoting and protecting human rights around the globe.'
    },
    {
      id: 5,
      name: 'International Court of Justice',
      shortName: 'ICJ',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'The principal judicial organ of the United Nations.'
    },
    {
      id: 6,
      name: 'World Health Organization',
      shortName: 'WHO',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Directing and coordinating authority on international health within the UN system.'
    },
    {
      id: 7,
      name: 'General Assembly Second Committee',
      shortName: 'GA2',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Economic and Financial Committee dealing with sustainable development and economic cooperation.'
    },
    {
      id: 8,
      name: 'General Assembly Third Committee',
      shortName: 'GA3',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Social, Humanitarian and Cultural Committee focusing on human rights and social development.'
    },
    {
      id: 9,
      name: 'General Assembly Fourth Committee',
      shortName: 'GA4',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Special Political and Decolonization Committee addressing political and decolonization issues.'
    },
    {
      id: 10,
      name: 'General Assembly Fifth Committee',
      shortName: 'GA5',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Administrative and Budgetary Committee dealing with UN budget and administrative matters.'
    },
    {
      id: 11,
      name: 'General Assembly Sixth Committee',
      shortName: 'GA6',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Legal Committee focusing on international law and legal matters.'
    },
    {
      id: 12,
      name: 'United Nations Environment Programme',
      shortName: 'UNEP',
      image: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Leading global environmental authority setting the global environmental agenda.'
    }
  ];

  const conferenceHighlights = [
    {
      id: 1,
      title: 'K-MUN 2024 Opening Ceremony',
      description: 'Highlights from the grand opening ceremony of Kumaraguru MUN 2024',
      image: 'https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Committee Sessions 2024',
      description: 'Exclusive footage from various committee sessions and debates',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Award Ceremony 2024',
      description: 'Celebrating excellence at the K-MUN 2024 award ceremony',
      image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Cultural Night 2024',
      description: 'A spectacular evening of cultural performances and celebrations',
      image: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

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

      {/* Committees Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Some Portraits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={committee.image}
                    alt={committee.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{committee.shortName}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{committee.name}</h3>
                  <p className="text-gray-600 text-sm">{committee.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Relive the memorable moments from previous K-MUN conferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {conferenceHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleVideoClick(highlight.videoUrl)}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <Play className="w-8 h-8" fill="currentColor" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                    <p className="text-sm text-blue-200">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;