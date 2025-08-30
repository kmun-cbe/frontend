import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, RefreshCw, Mail, Globe, Users, BookOpen, Award } from 'lucide-react';

const Maintenance: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-800 to-orange-700 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 120, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"
        />
      </div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-full flex items-center justify-center border-2 border-yellow-400/30"
              >
                <Wrench className="w-16 h-16 text-yellow-300" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent"
          >
            Under Maintenance
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-semibold mb-6 text-yellow-200"
          >
            We're enhancing K-MUN 2025 for you!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto"
          >
            Our diplomatic team is working tirelessly to improve your Model United Nations experience. 
            We're adding new features, enhancing performance, and ensuring everything runs smoothly for K-MUN 2025.
          </motion.p>
        </motion.div>

        {/* What we're working on */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <div className="flex justify-center mb-4">
              <Clock className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="font-semibold mb-2">Estimated Time</h3>
            <p className="text-sm text-orange-100">2-3 hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <div className="flex justify-center mb-4">
              <Wrench className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="font-semibold mb-2">Improvements</h3>
            <p className="text-sm text-orange-100">Performance & features</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <div className="flex justify-center mb-4">
              <Globe className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="font-semibold mb-2">Global Access</h3>
            <p className="text-sm text-orange-100">Enhanced connectivity</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
          >
            <div className="flex justify-center mb-4">
              <Award className="w-8 h-8 text-yellow-300" />
            </div>
            <h3 className="font-semibold mb-2">Quality</h3>
            <p className="text-sm text-orange-100">Premium experience</p>
          </motion.div>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Registration</h3>
            <p className="text-sm text-orange-200">Join K-MUN 2025</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <BookOpen className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Resources</h3>
            <p className="text-sm text-orange-200">Access materials</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Mail className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Contact</h3>
            <p className="text-sm text-orange-200">Get in touch</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleRefresh}
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Check Again
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 text-orange-200 text-sm"
        >
          <p>For urgent inquiries, contact us at support@kmun2025.com</p>
          <p className="mt-2">Follow us on Instagram and Twitter for live updates</p>
          <p className="mt-1">"Empowering Voices, Embracing change !"</p>
        </motion.div>

        {/* Animated progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8"
        >
          <div className="mx-auto h-3 bg-white/20 rounded-full overflow-hidden max-w-md">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 1.5, duration: 2.5 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full relative"
            >
              <motion.div
                animate={{
                  x: [0, 100, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-4 h-full bg-white/30 rounded-full"
              />
            </motion.div>
          </div>
          <p className="text-sm text-orange-200 mt-2">Progress: 75% Complete</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Maintenance; 