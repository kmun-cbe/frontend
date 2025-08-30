import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle, Globe, Users, BookOpen } from 'lucide-react';

const Error404: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Animated 404 */}
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
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full flex items-center justify-center border-2 border-red-400/30"
              >
                <AlertTriangle className="w-16 h-16 text-red-300" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
          >
            Oops! It seems this diplomatic mission has gone off course. 
            The page you're looking for doesn't exist in our United Nations.
          </motion.p>
        </motion.div>

        {/* Quick navigation cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Globe className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Committees</h3>
            <p className="text-sm text-blue-200">Explore our committees</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Registration</h3>
            <p className="text-sm text-blue-200">Join K-MUN 2025</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <BookOpen className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Resources</h3>
            <p className="text-sm text-blue-200">Access materials</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-blue-200 text-sm"
        >
          <p>Need diplomatic assistance? Contact us at support@kmun2025.com</p>
          <p className="mt-1">"Empowering Voices, Embracing change !"</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404; 