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
        
        if (response.success && response.data && response.data.isActive) {
          setPopup(response.data);
          setIsVisible(true);
        } else {
          setPopup(null);
          setIsVisible(false);
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
        setPopup(null);
        setIsVisible(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (isLoading) {
    return null;
  }
  
  if (!popup || !popup.isActive || !isVisible) {
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
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-lg mx-auto border border-gray-100">
              {/* Header with X button */}
              <div className="relative p-8 pb-6">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </button>
                
                {/* Content */}
                <div className="text-center pr-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                    {popup.heading}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {popup.text}
                  </p>
                </div>
              </div>
              
              {/* Footer with Close button */}
              <div className="px-8 pb-8">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-[#172d9d] text-white rounded-lg hover:bg-[#0f1a4a] transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Got it!
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
