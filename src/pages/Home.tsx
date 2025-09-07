import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Lightbulb,
  BookOpen,
  Users,
  Heart,
  MessageSquare
} from 'lucide-react';
import { pricingAPI, committeesAPI } from '../services/api';
import Popup from '../components/Common/Popup';
import { getImageUrl } from '../utils/images';

interface Pricing {
  internalDelegate: number;
  externalDelegate: number;
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
  institutionType: 'school' | 'college' | 'both';
}

const Home: React.FC = () => {
  const [pricing, setPricing] = useState<Pricing>({
    internalDelegate: 2500,
    externalDelegate: 3500
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

        // Fetch featured committees (first 2)
        const committeesData = await committeesAPI.getFeatured();
        if (committeesData.success) {
          setFeaturedCommittees(committeesData.data);
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
    { icon: Lightbulb, label: 'TEAM BUILDING' },
    { icon: BookOpen, label: 'SHARPENING LEADERSHIP SKILLS' },
    { icon: Users, label: 'ENHANCED CREATIVE THINKING' },
    { icon: Heart, label: 'NETWORKING' },
    { icon: MessageSquare, label: 'NEGOTIATION PROFICIENCY' }
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
            src={getImageUrl('dome', '/images/dome-2.png')} 
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
                26, 27 & 28 SEPTEMBER 2025
                

              </p>
              
              <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-200 max-w-lg">
                Kumaraguru Model United Nations (KMUN) 2025
The flagship conference of the Kumaraguru Model United Nations Society, KMUN is a platform where young leaders and changemakers converge to debate, deliberate, and design solutions for today’s most pressing global challenges.

What began in 2023 as a campus initiative has rapidly grown into a nationwide dialogue. By 2024, KMUN welcomed delegates from schools and colleges across India, establishing itself as a hub for meaningful political discourse and diplomacy-driven collaboration.

Now entering its third edition, KMUN 2025 sets the stage for 300+ bright minds to engage in compelling discussions, challenge perspectives, and sharpen the art of negotiation. This year, we are committed to elevating debates, broadening participation, and strengthening the voice of youth in shaping conversations that matter.

 Step into KMUN 2025 — where ideas meet action, and student leaders shape tomorrow’s politics.
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
            Kumaraguru Model United Nations 2025 is one of South India's premier MUN conferences, hosted by Kumaraguru Institutions. Bringing together delegates from across the globe, the conference provides a distinguished platform to simulate the workings of the United Nations. Through structured debates, negotiations, and resolution drafting, KMUN fosters diplomatic skill, critical thinking, and cross-cultural understanding. Beyond discourse, it encourages collaboration and leadership, enabling students to engage with pressing global issues while building lasting international connections. KMUN 2025 aspires to inspire young minds to become thoughtful, responsible, and impactful global citizens.
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

      {/* Letter from Secretariat */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#172d9d] mb-6">
              LETTER FROM SECRETARIAT
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Column - Letter Content */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                    Dear Delegates,
                    </p>
                    <p>
                    It gives us immense pleasure to welcome you to this year’s edition of Kumaraguru Model United Nations. As the Secretariat, we are committed to ensuring that every delegate experiences the true essence of Model United Nations — diplomacy, dialogue, and the spirit of international cooperation.

                    </p>
                    <p>
                    This conference is not only an opportunity to debate and deliberate but also a platform to broaden your perspective, develop your research, and refine your skills in negotiation and leadership. Each committee has been designed to challenge you to think critically, articulate your stance, and most importantly, to listen and learn from diverse viewpoints.

                    </p>
                    <p>
                    We strongly encourage you to actively engage with the background guides provided, conduct independent research, and come prepared with innovative ideas and thoughtful contributions. Remember, MUN is not solely about resolutions or outcomes — it is about the process of collaboration, understanding global issues, and embracing the values of respect and inclusivity.

                    </p>
                    <p>On behalf of the entire Secretariat, we extend our warmest wishes to you for a fruitful, inspiring, and memorable conference. We look forward to witnessing your enthusiasm and dedication as you step into the shoes of global leaders.
Happy MUNning!
</p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-700">
                      <span className="font-semibold">Sincerely,</span><br />
                      <span className="font-bold text-[#172d9d]">The Secretariat</span><br />
                      <span className="font-bold text-[#172d9d]">Kumaraguru MUN 2025 </span><br />
                      
                      
                      
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Secretary-General Photo */}
              <div className="bg-gray-50 flex items-center justify-center p-8 lg:p-12">
                <div className="relative">
                  <img 
                    src="/images/logo.png" 
                    alt="Secretariat pic" 
                    className="w-full max-w-sm h-auto rounded-lg shadow-lg object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="hidden w-full max-w-sm h-96 bg-gradient-to-br from-[#172d9d] to-[#37c9ee] rounded-lg shadow-lg flex items-center justify-center"
                  >
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">👤</div>
                      <p className="text-lg font-semibold">Secretariat pic</p>
                      <p className="text-sm opacity-80"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#172d9d]">
                      {committee.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      committee.institutionType === 'school' 
                        ? 'bg-green-100 text-green-800' 
                        : committee.institutionType === 'college'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {committee.institutionType === 'both' ? 'School & College' : committee.institutionType.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    {committee.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* See More Committees Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/committees"
              className="inline-block bg-[#172d9d] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1a2a8a] transition-colors"
            >
              See More Committees
            </Link>
          </motion.div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 border-[#37c9ee] rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-[#172d9d] mb-4">Kumaraguru Delegate</h3>
              <div className="text-4xl font-bold text-[#37c9ee] mb-6">
                ₹{pricing.internalDelegate}
              </div>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>Conference Access</li>
                <li>Delegate Package</li>
                <li>Participation Certificate</li>
                <li>Professional Networking opportunities</li>
                <li>Lunch and Refreshments</li>
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
              <div className="text-4xl font-bold text-[#37c9ee] mb-6">
                ₹{pricing.externalDelegate}
              </div>
              <ul className="text-gray-600 mb-8 space-y-2">
              <li>Conference Access</li>
                <li>Delegate Package</li>
                <li>Participation Certificate</li>
                <li>Professional Networking opportunities</li>
                <li>Lunch and Refreshments</li>
                
                
              </ul>
              <Link
                to="/register"
                className="inline-block bg-[#37c9ee] text-white px-6 py-3 rounded-lg hover:bg-[#1ba1c4] transition-colors"
              >
                Register Now
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
