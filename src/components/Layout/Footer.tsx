import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo, Description & Social Media */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="K-MUN 2025 Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'jpg';
                      target.src = '/logo.jpg';
                    } else {
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden text-white font-bold text-sm">MUN</div>
              </div>
              <span className="text-xl font-bold">Kumaraguru MUN 2025</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Join us for an extraordinary Model United Nations experience where future leaders 
              engage in diplomatic discourse and tackle the world's most pressing challenges.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">mun@kct.ac.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">+91 422 2669000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-gray-300">Kumaraguru Institutions, Coimbatore</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-green-500 transition-colors">
                <FaWhatsapp className="text-white w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition-colors">
                <FaInstagram className="text-white w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <FaFacebook className="text-white w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-colors">
                <FaLinkedin className="text-white w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-red-600 transition-colors">
                <FaYoutube className="text-white w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-black transition-colors">
                <FaXTwitter className="text-white w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/committees" className="text-gray-300 hover:text-white transition-colors">Committees</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Campus Location</h3>
            <ul className="space-y-2 text-gray-300">
              <li>September 27-29, 2025</li>
              <li>Kumaraguru College of Technology</li>
              <li>Chinnavedampatti, Coimbatore</li>
              <li>Tamil Nadu - 641049</li>
              <li><a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Map Link</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Kumaraguru Model United Nations. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/delegate-guidelines" className="text-gray-400 hover:text-white text-sm transition-colors">Delegate Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
