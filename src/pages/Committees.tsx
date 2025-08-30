import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { committeesAPI } from '../services/api';
import toast from 'react-hot-toast';

interface Committee {
  id: string;
  name: string;
  description: string;
  capacity: number;
  registered: number;
  topics: string[];
  chairs: string[];
  image: string;
}

const Committees: React.FC = () => {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const response = await committeesAPI.getAll();
        if (response.success) {
          setCommittees(response.data);
        } else {
          toast.error('Failed to load committees');
        }
      } catch (error) {
        console.error('Error fetching committees:', error);
        toast.error('Failed to load committees');
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading committees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#172d9d] via-[#797dfa] to-[#37c9ee] text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Committees</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore the diverse range of committees
            </p>
          </motion.div>
        </div>
      </section>

      {/* Committees Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🏛️</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{committee.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600">{committee.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Agenda</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>To be Announced</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div>
                        <span>Chairs: To be Announced</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Additional Committee Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: committees.length * 0.1 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🏛️</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Additional Committee 1</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">Committee description to be announced.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Agenda</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>To be Announced</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div>
                      <span>Chairs: To be Announced</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (committees.length + 1) * 0.1 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🏛️</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Additional Committee 2</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">Committee description to be announced.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Agenda</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>To be Announced</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div>
                      <span>Chairs: To be Announced</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-[#172d9d] to-[#797dfa] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join a Committee?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Register now and select your preferred committees during the registration process.
            </p>
            <a
              href="/register"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg inline-block"
            >
              Register Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Committees;