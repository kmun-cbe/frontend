import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  BookOpen, 
  Video,
  Calendar,
  Eye
} from 'lucide-react';

const Resources: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'guides', label: 'Background Guides' },
    { id: 'rules', label: 'Rules & Procedures' },
    { id: 'templates', label: 'Templates' },
    { id: 'videos', label: 'Videos' }
  ];

  const resources = [
    {
      id: 1,
      title: 'UNSC Background Guide',
      description: 'Comprehensive guide for the United Nations Security Council committee',
      type: 'guides',
      format: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-12-15',
      downloads: 245,
      url: '/resources/unsc-bg.pdf'
    },
    {
      id: 2,
      title: 'General Assembly Rules of Procedure',
      description: 'Official rules and procedures for General Assembly committees',
      type: 'rules',
      format: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-12-10',
      downloads: 189,
      url: '/resources/ga-rules.pdf'
    },
    {
      id: 3,
      title: 'Position Paper Template',
      description: 'Standard template for writing position papers',
      type: 'templates',
      format: 'DOCX',
      size: '0.5 MB',
      uploadDate: '2024-12-08',
      downloads: 156,
      url: '/resources/position-paper-template.docx'
    },
    {
      id: 4,
      title: 'MUN Training Video Series',
      description: 'Complete video series on MUN procedures and best practices',
      type: 'videos',
      format: 'MP4',
      size: '150 MB',
      uploadDate: '2024-12-05',
      downloads: 98,
      url: '/resources/mun-training.mp4'
    },
    {
      id: 5,
      title: 'ECOSOC Background Guide',
      description: 'Economic and Social Council committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-12-12',
      downloads: 134,
      url: '/resources/ecosoc-bg.pdf'
    },
    {
      id: 6,
      title: 'Resolution Template',
      description: 'Standard format for drafting resolutions',
      type: 'templates',
      format: 'DOCX',
      size: '0.3 MB',
      uploadDate: '2024-12-07',
      downloads: 167,
      url: '/resources/resolution-template.docx'
    },
    {
      id: 7,
      title: 'HRC Background Guide',
      description: 'Human Rights Council committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.3 MB',
      uploadDate: '2024-12-14',
      downloads: 112,
      url: '/resources/hrc-bg.pdf'
    },
    {
      id: 8,
      title: 'ICJ Background Guide',
      description: 'International Court of Justice committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.0 MB',
      uploadDate: '2024-12-13',
      downloads: 98,
      url: '/resources/icj-bg.pdf'
    },
    {
      id: 9,
      title: 'WHO Background Guide',
      description: 'World Health Organization committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.2 MB',
      uploadDate: '2024-12-12',
      downloads: 145,
      url: '/resources/who-bg.pdf'
    },
    {
      id: 10,
      title: 'GA1 Background Guide',
      description: 'General Assembly First Committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-12-11',
      downloads: 134,
      url: '/resources/ga1-bg.pdf'
    },
    {
      id: 11,
      title: 'Delegate Guidelines',
      description: 'Comprehensive guidelines for delegates participating in K-MUN 2025',
      type: 'rules',
      format: 'PDF',
      size: '1.5 MB',
      uploadDate: '2024-12-09',
      downloads: 203,
      url: '/resources/delegate-guidelines.pdf'
    },
    {
      id: 12,
      title: 'Event Brochure',
      description: 'Official event brochure with complete information about K-MUN 2025',
      type: 'templates',
      format: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-12-06',
      downloads: 89,
      url: '/resources/event-brochure.pdf'
    },
    {
      id: 13,
      title: 'GA2 Background Guide',
      description: 'General Assembly Second Committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.0 MB',
      uploadDate: '2024-12-10',
      downloads: 87,
      url: '/resources/ga2-bg.pdf'
    },
    {
      id: 14,
      title: 'GA3 Background Guide',
      description: 'General Assembly Third Committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.1 MB',
      uploadDate: '2024-12-09',
      downloads: 92,
      url: '/resources/ga3-bg.pdf'
    },
    {
      id: 15,
      title: 'GA4 Background Guide',
      description: 'General Assembly Fourth Committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.2 MB',
      uploadDate: '2024-12-08',
      downloads: 78,
      url: '/resources/ga4-bg.pdf'
    },
    {
      id: 16,
      title: 'GA6 Background Guide',
      description: 'General Assembly Sixth Committee background guide',
      type: 'guides',
      format: 'PDF',
      size: '2.0 MB',
      uploadDate: '2024-12-07',
      downloads: 85,
      url: '/resources/ga6-bg.pdf'
    }
  ];

  const filteredResources = resources.filter(resource => {
    return activeFilter === 'all' || resource.type === activeFilter;
  });

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-600" />;
      case 'docx':
        return <BookOpen className="w-8 h-8 text-blue-600" />;
      case 'mp4':
        return <Video className="w-8 h-8 text-purple-600" />;
      default:
        return <FileText className="w-8 h-8 text-gray-600" />;
    }
  };

  const handleDownload = (resource: any) => {
    console.log('Downloading:', resource.title);
    // Implement download logic
  };

  const handleWatch = (resource: any) => {
    // Open video URL in new tab
    if (resource.type === 'videos' && resource.url) {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Resources</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Access all the essential documents, guides, and videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-primary-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(resource.format)}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.format} • {resource.size}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{resource.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(resource.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <span>{resource.downloads} downloads</span>
                  </div>

                  <div className="flex gap-2">
                    {resource.type === 'videos' ? (
                      <button
                        onClick={() => handleWatch(resource)}
                        className="w-full bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-950 transition-colors flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Watch
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(resource)}
                        className="w-full bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-950 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Resources;