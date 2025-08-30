import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Server, Wifi, Shield, Activity } from 'lucide-react';

const Error500: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-36 h-36 bg-red-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-44 h-44 bg-orange-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Animated 500 */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full flex items-center justify-center border-2 border-orange-400/30"
              >
                <Server className="w-16 h-16 text-orange-300" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent"
          >
            500
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Server Error
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-red-100 mb-8 max-w-2xl mx-auto"
          >
            Our diplomatic servers are experiencing technical difficulties. 
            Our team is working to restore peace and functionality.
          </motion.p>
        </motion.div>

        {/* Status indicators */}
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
            <Wifi className="w-8 h-8 text-red-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Connection</h3>
            <p className="text-sm text-red-200">Checking network</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Shield className="w-8 h-8 text-red-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Security</h3>
            <p className="text-sm text-red-200">Systems protected</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <Activity className="w-8 h-8 text-red-300 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Status</h3>
            <p className="text-sm text-red-200">Under investigation</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleRefresh}
            className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            to="/"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-red-200 text-sm"
        >
          <p>If the problem persists, contact our technical team at support@kmun2025.com</p>
          <p className="mt-1">"Empowering Voices, Embracing change !"</p>
        </motion.div>

        {/* Animated progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-red-200">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-red-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-red-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-red-400 rounded-full"
            />
            <span className="ml-2">Attempting to reconnect...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Error500; 