import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Lightbulb,
  BookOpen,
  Users,
  Heart,
  MessageSquare,
  Calendar,
  MapPin
} from 'lucide-react';
import { pricingAPI, committeesAPI } from '../services/api';
import Popup from '../components/Common/Popup';

interface Pricing {
  internalDelegate: number;
  externalDelegate: number;
  accommodationCharge: number;
  earlyBirdDiscount: number;
  groupDiscount: number;
}

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

const Home: React.FC = () => {
  const [pricing, setPricing] = useState<Pricing>({
    internalDelegate: 2500,
    externalDelegate: 3500,
    accommodationCharge: 1500,
    earlyBirdDiscount: 500,
    groupDiscount: 200
  });
  const [featuredCommittees, setFeaturedCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pricing data
        const pricingData = await pricingAPI.get();
        if (pricingData.success) {
          setPricing(pricingData.data);
        }

        // Fetch featured committees
        const committeesData = await committeesAPI.getAll();
        if (committeesData.success) {
          setFeaturedCommittees(committeesData.data.slice(0, 3)); // Get first 3 committees
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use default data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const whyKmunFeatures = [
    { icon: Lightbulb, label: 'SKILLS REQUIRED' },
    { icon: BookOpen, label: 'LEADERSHIP TRAINING' },
    { icon: Users, label: 'CREATIVE SKILLS' },
    { icon: Heart, label: 'BUILDING RELATIONSHIPS' },
    { icon: MessageSquare, label: 'NEGOTIATION SKILLS' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-poppins">
      <Popup />
      {/* Hero Section */}
      <section className="relative bg-[#172d9d] text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/dome 2.png" 
            alt="Temple Dome" 
            className="absolute right-[-10%] top-0 h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                KUMARAGURU
                <br />
                MODEL UNITED NATIONS
              </h1>
              
              <p className="text-2xl md:text-3xl font-bold mb-8 text-[#37c9ee]">
                26, 27 & 28 SEPTEMBER
              </p>
              
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-200 max-w-lg">
                KMUN is the flagship event of the Kumaraguru Model United Nations Society, designed to connect student leaders from institutions across India. Each year, it brings together 300+ young minds to explore innovative solutions for pressing global challenges through dialogue and debate. The first edition in 2023 began as an intra-institutional conference, expanding in 2024 to welcome participants from schools and colleges. Now in its third edition, KMUN 2025 promises an even more enriching and dynamic MUN experience. This year, we aim to elevate discussions while broadening our reach nationwide, strengthening the impact and presence of our society.
              </p>
              
              <Link
                to="/register"
                className="inline-block bg-[#37c9ee] text-[#172d9d] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#2bb8d9] transition-colors"
                onClick={() => toast.success('Welcome to K-MUN 2025 Registration!')}
              >
                REGISTER NOW
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-[#37c9ee] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">250</div>
              <div className="text-sm md:text-base">Expected Delegates</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
              <div className="text-sm md:text-base">Committees</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base">Countries</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">3</div>
              <div className="text-sm md:text-base">Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Committees */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#172d9d] mb-6">
              FEATURED COMMITTEES
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience diverse committees covering critical global issues from security to sustainable development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCommittees.map((committee, index) => (
              <motion.div
                key={committee.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-[#172d9d] to-[#797dfa] flex items-center justify-center">
                  <div className="text-6xl text-white opacity-80">🏛️</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#172d9d] mb-3">
                    {committee.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {committee.description}
                  </p>
                  <Link
                    to="/committees"
                    className="inline-block bg-[#37c9ee] text-white px-4 py-2 rounded-lg hover:bg-[#1ba1c4] transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ABOUT KMUN 2025
            </h2>
            <p className="text-lg max-w-4xl mx-auto leading-relaxed">
              Kumaraguru Model United Nations 2025 is the premier MUN conference in South India, bringing together students from across the globe to simulate the United Nations. Our conference provides a unique platform for young leaders to develop their diplomatic skills, engage in meaningful debates, and build lasting international friendships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Kumaraguru MUN */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#172d9d] mb-6">
              WHY KUMARAGURU MUN
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {whyKmunFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-[#37c9ee]/10 p-6 rounded-lg"
              >
                <div className="w-16 h-16 bg-[#37c9ee] rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-[#172d9d]">
                  {feature.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#172d9d] mb-6">
              REGISTRATION FEES
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Affordable pricing for an unforgettable MUN experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-[#37c9ee] rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#172d9d] mb-4">Internal Delegate</h3>
              <div className="text-4xl font-bold text-[#37c9ee] mb-6">
                ₹{pricing.internalDelegate}
              </div>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>Conference Access</li>
                <li>Delegate Kit</li>
                <li>Certificate</li>
                <li>Networking Events</li>
              </ul>
              <Link
                to="/register"
                className="inline-block bg-[#37c9ee] text-white px-6 py-3 rounded-lg hover:bg-[#1ba1c4] transition-colors"
              >
                Register Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-[#37c9ee] rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#172d9d] mb-4">External Delegate</h3>
              <div className="text-4xl font-bold text-[#172d9d] mb-6">
                ₹{pricing.externalDelegate}
              </div>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>Conference Access</li>
                <li>Delegate Kit</li>
                <li>Certificate</li>
                <li>Networking Events</li>
                <li>International Experience</li>
              </ul>
              <Link
                to="/register"
                className="inline-block bg-[#172d9d] text-white px-6 py-3 rounded-lg hover:bg-[#0f1a4a] transition-colors"
              >
                Register Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border-2 border-[#37c9ee] rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#172d9d] mb-4">Accommodation</h3>
              <div className="text-4xl font-bold text-[#37c9ee] mb-6">
                ₹{pricing.accommodationCharge}
              </div>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>3 Nights Stay</li>
                <li>Breakfast & Dinner</li>
                <li>Transportation</li>
                <li>24/7 Support</li>
              </ul>
              <Link
                to="/register"
                className="inline-block bg-[#37c9ee] text-white px-6 py-3 rounded-lg hover:bg-[#1ba1c4] transition-colors"
              >
                Add Accommodation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#172d9d] to-[#797dfa] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              READY TO MAKE A DIFFERENCE?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us for three days of intense debate, diplomacy, and international cooperation. 
              Register now and secure your spot at K-MUN 2025!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-block bg-white text-[#172d9d] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                REGISTER NOW
              </Link>
              <Link
                to="/committees"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#172d9d] transition-colors"
              >
                VIEW COMMITTEES
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
