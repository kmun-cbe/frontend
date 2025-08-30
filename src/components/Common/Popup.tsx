import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { popupAPI } from '../../services/api';

interface PopupData {
  id: string;
  heading: string;
  text: string;
  isActive: boolean;
}

const Popup: React.FC = () => {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await popupAPI.getActive();
        if (response.success && response.data) {
          setPopup(response.data);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (isLoading || !popup || !popup.isActive) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Header with X button */}
              <div className="relative p-6 pb-4">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {popup.heading}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {popup.text}
                  </p>
                </div>
              </div>
              
              {/* Footer with Close button */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-2 bg-[#172d9d] text-white rounded-lg hover:bg-[#0f1a4a] transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Popup;
