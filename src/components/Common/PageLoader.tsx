import React from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-900 rounded-full mx-auto mb-4"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary-900 font-medium"
        >
          {message}
        </motion.div>
      </div>
    </div>
  );
};

export default PageLoader;