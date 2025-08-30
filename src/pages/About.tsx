import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  BookOpen, 
  Target,
  Building,
  Calendar,
  MapPin
} from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Students', value: '15,000+' },
    { icon: Building, label: 'Departments', value: '20+' },
    { icon: Award, label: 'Years of Excellence', value: '25+' },
    { icon: Globe, label: 'Industry Partners', value: '500+' }
  ];

  const achievements = [
    'NAAC A+ Accredited Institution',
    'NBA Accredited Programs',
    'NIRF Ranked Engineering College',
    'ISO 9001:2015 Certified',
    'AICTE Approved Programs',
    'Anna University Affiliated'
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
             <p className="text-xl text-primary-100 max-w-3xl mx-auto">
               Discover the legacy of excellence
             </p>
          </motion.div>
        </div>
      </section>

      {/* About the Event */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Kumaraguru MUN 2025
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Kumaraguru Model United Nations 2025 is a premier diplomatic simulation that brings together 
                bright minds from across India to engage in meaningful discourse on global issues. Our conference 
                provides a platform for students to develop critical thinking, public speaking, and negotiation skills 
                while addressing real-world challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary-900" />
                  <span className="text-gray-700">March 15-17, 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary-900" />
                   <span className="text-gray-700">Kumaraguru Institutions, Coimbatore</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-900" />
                  <span className="text-gray-700">500+ Expected Delegates</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-primary-900" />
                  <span className="text-gray-700">15+ Specialized Committees</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="MUN Conference"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Club/Forum */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="MUN Club"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The MUN Society at KCT
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Model United Nations Society at Kumaraguru College of Technology is a vibrant 
                community of students passionate about international relations, diplomacy, and global affairs. 
                Established with the vision of fostering diplomatic skills and global awareness, our society 
                has been instrumental in shaping future leaders and global citizens.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-blue-800 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Mission</h3>
                    <p className="text-gray-600">To develop diplomatic skills, global awareness, and leadership qualities among students</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-blue-800 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Vision</h3>
                    <p className="text-gray-600">To create informed global citizens capable of addressing international challenges</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About the Institution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kumaraguru Institutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A premier institution of higher learning, fostering innovation, excellence, and holistic development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Excellence in Education</h3>
              <p className="text-lg text-gray-600 mb-6">
                Kumaraguru College of Technology, established in 1984, stands as a beacon of educational 
                excellence in South India. With over 25 years of commitment to quality education, KCT has 
                consistently ranked among the top engineering institutions in Tamil Nadu.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our institution is home to over 15,000 students across various undergraduate and postgraduate 
                programs, fostering an environment of academic rigor, innovation, and holistic development.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-800 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{achievement}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="KCT Campus"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-900 text-white rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Campus Life & Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience world-class infrastructure and vibrant campus life at KCT
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Library"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">State-of-the-Art Library</h3>
                <p className="text-gray-600">Modern library with extensive digital and physical resources</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Labs"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Laboratories</h3>
                <p className="text-gray-600">Cutting-edge labs equipped with latest technology</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sports"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sports & Recreation</h3>
                <p className="text-gray-600">Comprehensive sports facilities and recreational activities</p>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="https://kumaraguru.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-950 transition-colors inline-flex items-center"
            >
              View More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;