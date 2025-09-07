import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  FileText, 
  Plus,
  Mail,
  BarChart3,
  Calendar,
  AlertCircle,
  LogOut,
  UserPlus,
  Bell,
  MessageSquare,
  Edit,
  Settings,
  Activity,
  UserCheck,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, pricingAPI, popupAPI, committeesAPI, registrationAPI, mailerAPI } from '../../services/api';
import ContactFormsManager from './ContactFormsManager';
import { useFormOpenScroll } from '../../hooks/useScrollToTop';
import Mailer from '../Common/Mailer';
import TransactionRecords from './TransactionRecords';
import PortfolioManager from './PortfolioManager';
import UserManagement from './UserManagement';
import GalleryManager from './GalleryManager';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/images';

interface DashboardStats {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

interface ActivityItem {
  type: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

interface PricingData {
  id: string;
  internalDelegate: number;
  externalDelegate: number;
  updatedAt: string;
}

interface PopupData {
  id: string;
  heading: string;
  text: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Pricing Management Component
const PricingManagement: React.FC = () => {
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    internalDelegate: 2500,
    externalDelegate: 3500
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      setLoading(true);
      const response = await pricingAPI.get();
      if (response.success) {
        setPricing(response.data);
        setFormData({
          internalDelegate: response.data.internalDelegate,
          externalDelegate: response.data.externalDelegate
        });
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
      toast.error('Failed to load pricing data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await pricingAPI.update(formData);
      if (response.success) {
        setPricing(response.data);
        toast.success('Pricing updated successfully');
      }
    } catch (error) {
      console.error('Error updating pricing:', error);
      toast.error('Failed to update pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (pricing) {
      setFormData({
        internalDelegate: pricing.internalDelegate,
        externalDelegate: pricing.externalDelegate,
        accommodationCharge: pricing.accommodationCharge,
        earlyBirdDiscount: pricing.earlyBirdDiscount,
        groupDiscount: pricing.groupDiscount
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Pricing Management</h3>
            <p className="text-sm text-gray-600">Manage registration fees and accommodation charges</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#172d9d] rounded-lg hover:bg-[#0f1a4a] transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {/* Kumaraguru Delegate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Kumaraguru Delegate Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.internalDelegate}
                onChange={(e) => handleInputChange('internalDelegate', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="2500"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500">Fee for Kumaraguru students</p>
          </div>

          {/* External Delegate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              External Delegate Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.externalDelegate}
                onChange={(e) => handleInputChange('externalDelegate', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="3500"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500">Fee for external students</p>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kumaraguru Delegate</p>
                <p className="text-xl font-bold text-[#172d9d]">₹{formData.internalDelegate}</p>
              </div>
              <Users className="w-8 h-8 text-[#172d9d] opacity-50" />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">External Delegate</p>
                <p className="text-xl font-bold text-green-600">₹{formData.externalDelegate}</p>
              </div>
              <UserPlus className="w-8 h-8 text-green-600 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      {pricing && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(pricing.updatedAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Pricing ID</p>
              <p className="text-sm font-mono text-gray-900">{pricing.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Popup Management Component
const PopupManagement: React.FC = () => {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    text: '',
    isActive: false
  });

  useEffect(() => {
    fetchPopup();
  }, []);

  const fetchPopup = async () => {
    try {
      setLoading(true);
      const response = await popupAPI.get();
      if (response.success) {
        setPopup(response.data);
        setFormData({
          heading: response.data.heading,
          text: response.data.text,
          isActive: response.data.isActive
        });
      }
    } catch (error) {
      console.error('Error fetching popup:', error);
      toast.error('Failed to load popup data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validate form data
      if (!formData.heading.trim() || !formData.text.trim()) {
        toast.error('Please fill in both heading and text fields');
        return;
      }
      
      const response = await popupAPI.update(formData);
      if (response.success) {
        setPopup(response.data);
        toast.success('Popup updated successfully');
      } else {
        throw new Error(response.message || 'Failed to update popup');
      }
    } catch (error) {
      console.error('Error updating popup:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update popup');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async () => {
    try {
      const newActiveState = !formData.isActive;
      const response = await popupAPI.toggle(newActiveState);
      if (response.success) {
        setPopup(response.data);
        setFormData(prev => ({ ...prev, isActive: newActiveState }));
        toast.success(`Popup ${newActiveState ? 'activated' : 'deactivated'} successfully`);
      } else {
        throw new Error(response.message || 'Failed to toggle popup');
      }
    } catch (error) {
      console.error('Error toggling popup:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to toggle popup');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading popup data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Popup Manager</h3>
            <p className="text-sm text-gray-600">Manage the home page popup notification</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Toggle Switch */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Popup Status</span>
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 ${
                  formData.isActive ? 'bg-[#172d9d]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${formData.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.isActive ? 'ON' : 'OFF'}
              </span>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#172d9d] rounded-lg hover:bg-[#0f1a4a] transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Popup Form */}
        <div className="space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Popup Heading
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleInputChange('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
              placeholder="Enter popup heading..."
              maxLength={100}
              required
            />
            <p className="text-xs text-gray-500">{formData.heading.length}/100 characters</p>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Popup Text
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent resize-none"
              placeholder="Enter popup content..."
              maxLength={1000}
              required
            />
            <p className="text-xs text-gray-500">{formData.text.length}/1000 characters</p>
          </div>
        </div>
      </div>

      {/* Popup Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Popup Preview</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="relative">
            {/* X Button */}
            <button className="absolute top-2 right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span className="text-gray-600 text-sm font-bold">×</span>
            </button>
            
            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {formData.heading || 'Popup Heading'}
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {formData.text || 'Popup content will appear here...'}
              </p>
              
              {/* Close Button */}
              <button className="px-4 py-2 bg-[#172d9d] text-white rounded-lg hover:bg-[#0f1a4a] transition-colors text-sm font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Status */}
      {popup && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Popup Status</p>
              <p className={`text-sm font-medium ${formData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {formData.isActive ? 'Active - Visible on Home Page' : 'Inactive - Hidden from Users'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(popup.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Registrations Management Component
const RegistrationsManagement: React.FC = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const response = await registrationAPI.getAll();
      console.log('Registration API Response:', response); // Debug log
      
      if (response.success) {
        // Handle nested data structure from backend
        const registrationsData = response.data?.registrations || response.data || [];
        setRegistrations(registrationsData);
      } else {
        throw new Error(response.message || 'Failed to fetch registrations');
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error(`Failed to load registrations: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (registration: any) => {
    setSelectedRegistration(registration);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRegistration(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Registration Forms</h2>
          <button
            onClick={fetchRegistrations}
            className="bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#0f1a4a] transition-colors"
          >
            Refresh
          </button>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Committee Preferences
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {registration.firstName} {registration.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{registration.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registration.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{registration.institution || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{registration.institutionType || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>1. {registration.committeePreference1}</div>
                        <div>2. {registration.committeePreference2}</div>
                        <div>3. {registration.committeePreference3}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {registration.allocatedCommittee ? (
                          <div>
                            <div className="font-medium text-blue-600">{registration.allocatedCommittee}</div>
                            <div className="text-xs text-gray-500">{registration.allocatedPortfolio || 'No Portfolio'}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not Allocated</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registration.status === 'PENDING' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : registration.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(registration)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Registration Details Modal */}
        {showDetails && selectedRegistration && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Registration Details - {selectedRegistration.firstName} {selectedRegistration.lastName}
                  </h3>
                  <button
                    onClick={handleCloseDetails}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Name:</span> {selectedRegistration.firstName} {selectedRegistration.lastName}</div>
                      <div><span className="font-medium">Email:</span> {selectedRegistration.email}</div>
                      <div><span className="font-medium">Phone:</span> {selectedRegistration.phone}</div>
                      <div><span className="font-medium">Gender:</span> {selectedRegistration.gender}</div>
                      <div><span className="font-medium">Roll Number:</span> {selectedRegistration.rollNumber || 'N/A'}</div>
                      <div><span className="font-medium">Total MUNs:</span> {selectedRegistration.totalMuns}</div>
                    </div>
                  </div>

                  {/* Institution Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Institution Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Type:</span> {selectedRegistration.institutionType || 'N/A'}</div>
                      <div><span className="font-medium">Name:</span> {selectedRegistration.institution || 'N/A'}</div>
                      <div><span className="font-medium">City:</span> {selectedRegistration.cityOfInstitution || 'N/A'}</div>
                      <div><span className="font-medium">State:</span> {selectedRegistration.stateOfInstitution || 'N/A'}</div>
                      <div><span className="font-medium">Grade:</span> {selectedRegistration.grade || 'N/A'}</div>
                      <div><span className="font-medium">Kumaraguru:</span> {selectedRegistration.isKumaraguru ? 'Yes' : 'No'}</div>
                    </div>
                  </div>

                  {/* Committee Preferences */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Committee Preferences</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">1st Preference:</span>
                        <div className="ml-4">
                          <div>Committee: {selectedRegistration.committeePreference1}</div>
                          <div>Portfolio: {selectedRegistration.portfolioPreference1}</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">2nd Preference:</span>
                        <div className="ml-4">
                          <div>Committee: {selectedRegistration.committeePreference2}</div>
                          <div>Portfolio: {selectedRegistration.portfolioPreference2}</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">3rd Preference:</span>
                        <div className="ml-4">
                          <div>Committee: {selectedRegistration.committeePreference3}</div>
                          <div>Portfolio: {selectedRegistration.portfolioPreference3}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Allocation & Status */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Allocation & Status</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          selectedRegistration.status === 'PENDING' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : selectedRegistration.status === 'APPROVED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedRegistration.status}
                        </span>
                      </div>
                      <div><span className="font-medium">Allocated Committee:</span> 
                        <span className="ml-2 text-blue-600 font-medium">
                          {selectedRegistration.allocatedCommittee || 'Not Allocated'}
                        </span>
                      </div>
                      <div><span className="font-medium">Allocated Portfolio:</span> 
                        <span className="ml-2 text-green-600 font-medium">
                          {selectedRegistration.allocatedPortfolio || 'Not Allocated'}
                        </span>
                      </div>
                      <div><span className="font-medium">Accommodation:</span> 
                        {selectedRegistration.requiresAccommodation ? 'Required' : 'Not Required'}
                      </div>
                      <div><span className="font-medium">Submitted:</span> 
                        {new Date(selectedRegistration.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleCloseDetails}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Committee Management Component
const CommitteeManagement: React.FC = () => {
  const [committees, setCommittees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    institutionType: '',
    description: '',
    capacity: '',
    logo: null as File | null
  });

  useEffect(() => {
    fetchCommittees();
  }, []);

  // Scroll to top when form is opened
  useFormOpenScroll(showAddForm, '.committee-form-container');

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      const response = await committeesAPI.getAll();
      console.log('Committees API Response:', response); // Debug log
      
      if (response.success) {
        // Handle nested data structure from backend
        const committeesData = response.data || [];
        setCommittees(committeesData);
      } else {
        throw new Error(response.message || 'Failed to fetch committees');
      }
    } catch (error) {
      console.error('Error fetching committees:', error);
      toast.error(`Failed to load committees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.institutionType) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      const committeeData = new FormData();
      committeeData.append('name', formData.name);
      committeeData.append('institutionType', formData.institutionType);
      committeeData.append('description', formData.description || '');
      committeeData.append('capacity', formData.capacity || '0');
      
      if (formData.logo) {
        committeeData.append('logo', formData.logo);
      }

      let response;
      if (editingCommittee) {
        response = await committeesAPI.update(editingCommittee.id, committeeData);
        if (response.success) {
          toast.success('Committee updated successfully');
        }
      } else {
        response = await committeesAPI.create(committeeData);
        if (response.success) {
          toast.success('Committee created successfully');
        }
      }
      
      if (response.success) {
        setShowAddForm(false);
        setEditingCommittee(null);
        setFormData({
          name: '',
          institutionType: '',
          type: '',
          description: '',
          capacity: '',
          logo: null
        });
        fetchCommittees();
      }
    } catch (error) {
      console.error('Error saving committee:', error);
      toast.error(editingCommittee ? 'Failed to update committee' : 'Failed to create committee');
    }
  };

  const handleEdit = (committee: any) => {
    setEditingCommittee(committee);
    setFormData({
      name: committee.name || '',
      institutionType: committee.institutionType || '',
      description: committee.description || '',
      capacity: committee.capacity?.toString() || '',
      logo: null
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCommittee(null);
    setFormData({
      name: '',
      institutionType: '',
      description: '',
      capacity: '',
      logo: null
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this committee?')) {
      try {
        await committeesAPI.delete(id);
        toast.success('Committee deleted successfully');
        fetchCommittees();
      } catch (error) {
        console.error('Error deleting committee:', error);
        toast.error('Failed to delete committee');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading committees...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Committee Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showAddForm ? 'Cancel' : 'Add Committee'}
        </button>
      </div>

      {/* Add Committee Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 committee-form-container"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingCommittee ? 'Edit Committee' : 'Add New Committee'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.institutionType}
                  onChange={(e) => setFormData({...formData, institutionType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select institution type</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="both">Both School & College</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Committee Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter committee name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter committee description (optional)"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity (Number of Portfolios)
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter initial capacity"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">This will be automatically updated based on portfolios added</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Committee Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, logo: e.target.files?.[0] || null})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Upload a logo for this committee (optional)</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingCommittee ? 'Update Committee' : 'Create Committee'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Committees Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Current Committees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Committee Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {committees.length > 0 ? (
                committees.map((committee) => (
                  <tr key={committee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        committee.institutionType === 'school' 
                          ? 'bg-green-100 text-green-800' 
                          : committee.institutionType === 'college'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {committee.institutionType === 'both' ? 'School & College' : committee.institutionType?.toUpperCase() || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {committee.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {committee.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {committee.capacity || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(committee)}
                          className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(committee.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No committees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DevAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    database: { status: 'checking', message: 'Checking connection...' },
    paymentGateway: { status: 'checking', message: 'Checking status...' },
    emailService: { status: 'checking', message: 'Checking service...' }
  });

  const refreshActivity = async () => {
    setActivityLoading(true);
    try {
      const activityData = await dashboardAPI.getRecentActivity();
      if (activityData.success) {
        setRecentActivity(activityData.data);
        toast.success('Activity refreshed successfully');
      }
    } catch (error) {
      console.error('Error refreshing activity:', error);
      toast.error('Failed to refresh activity');
    } finally {
      setActivityLoading(false);
    }
  };

  const checkSystemStatus = async () => {
    try {
              const apiBaseUrl = import.meta.env.VITE_API_URL || 'https://backend-7rnp.onrender.com';
        
        // Check database connection
        const dbResponse = await fetch(`${apiBaseUrl}/api/health/database`);
        setSystemStatus(prev => ({
          ...prev,
          database: {
            status: dbResponse.ok ? 'connected' : 'error',
            message: dbResponse.ok ? 'Connected' : 'Connection failed'
          }
        }));

        // Check payment gateway
        const paymentResponse = await fetch(`${apiBaseUrl}/api/health/payment`);
        setSystemStatus(prev => ({
          ...prev,
          paymentGateway: {
            status: paymentResponse.ok ? 'active' : 'error',
            message: paymentResponse.ok ? 'Active' : 'Service unavailable'
          }
        }));

        // Check email service
        const emailResponse = await fetch(`${apiBaseUrl}/api/health/email`);
        setSystemStatus(prev => ({
          ...prev,
          emailService: {
            status: emailResponse.ok ? 'operational' : 'error',
            message: emailResponse.ok ? 'Operational' : 'Service down'
          }
        }));
    } catch (error) {
      console.error('Error checking system status:', error);
      setSystemStatus({
        database: { status: 'error', message: 'Connection failed' },
        paymentGateway: { status: 'error', message: 'Service unavailable' },
        emailService: { status: 'error', message: 'Service down' }
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getRecentActivity()
        ]);

        if (statsData.success) {
          setStats(statsData.data);
        }

        if (activityData.success) {
          setRecentActivity(activityData.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default stats if API fails
        setStats([
          {
            label: 'Total Users',
            value: '0',
            change: '0%',
            icon: 'Users',
            color: 'blue'
          },
          {
            label: 'Total Registrations',
            value: '0',
            change: '0%',
            icon: 'UserPlus',
            color: 'green'
          },
          {
            label: 'Confirmed Payments',
            value: '0',
            change: '0%',
            icon: 'CreditCard',
            color: 'purple'
          },
          {
            label: 'Active Committees',
            value: '0',
            change: '0%',
            icon: 'FileText',
            color: 'yellow'
          },
          {
            label: 'Contact Submissions',
            value: '0',
            change: '0%',
            icon: 'MessageSquare',
            color: 'indigo'
          },
          {
            label: 'Pending Contacts',
            value: '0',
            change: '0%',
            icon: 'Clock',
            color: 'orange'
          }
        ]);
        setRecentActivity([]);
        toast.error('Dashboard data unavailable - showing default values');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    checkSystemStatus();

    // Set up real-time updates
    const interval = setInterval(() => {
      checkSystemStatus();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'registrations', label: 'Registrations', icon: UserPlus },
    { id: 'committees', label: 'Committee Manager', icon: FileText },
    { id: 'portfolios', label: 'Portfolio Manager', icon: Edit },
    { id: 'gallery', label: 'Gallery Manager', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing', icon: Settings },
    { id: 'popups', label: 'Popup Manager', icon: AlertCircle },
    { id: 'mailer', label: 'Mailer', icon: Mail },
    { id: 'transactions', label: 'Transaction Records', icon: CreditCard },
    { id: 'events', label: 'Attendance Events', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'contact', label: 'Contact Forms', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'logs', label: 'Admin Logs', icon: Activity }
  ];

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Users,
      UserPlus,
      CreditCard,
      FileText
    };
    return iconMap[iconName] || Users;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
                <img src={getImageUrl('logo', '/images/logo.png')} alt="K-MUN 2025 Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dev Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Complete system administration and management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Fixed width */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#172d9d]/10 text-[#172d9d] border-r-2 border-[#172d9d]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content - Takes remaining space */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const IconComponent = getIconComponent(stat.icon);
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className={`text-sm ${
                              stat.change.startsWith('+') ? 'text-green-600' : 
                              stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {stat.change} from last month
                            </p>
                          </div>
                          <div className={`p-3 rounded-full ${
                            stat.color === 'blue' ? 'bg-[#172d9d]/10' :
                            stat.color === 'green' ? 'bg-green-100' :
                            stat.color === 'purple' ? 'bg-purple-100' :
                            'bg-yellow-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              stat.color === 'blue' ? 'text-[#172d9d]' :
                              stat.color === 'green' ? 'text-green-600' :
                              stat.color === 'purple' ? 'text-purple-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                                 {/* Quick Actions */}
                 <div className="bg-white rounded-lg shadow-sm p-6">
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button 
                       onClick={() => setActiveTab('users')}
                       className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                     >
                       <UserPlus className="w-6 h-6 text-[#172d9d] mb-2" />
                       <h4 className="font-medium text-gray-900">Add New User</h4>
                       <p className="text-sm text-gray-600">Create admin or delegate account</p>
                     </button>
                     <button 
                       onClick={() => setActiveTab('notifications')}
                       className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                     >
                       <Bell className="w-6 h-6 text-purple-600 mb-2" />
                       <h4 className="font-medium text-gray-900">Send Notification</h4>
                       <p className="text-sm text-gray-600">Broadcast message to users</p>
                     </button>
                   </div>
                 </div>

                                 {/* Recent Activity */}
                 <div className="bg-white rounded-lg shadow-sm p-6">
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                     <button
                       onClick={refreshActivity}
                       disabled={activityLoading}
                       className="flex items-center space-x-2 text-sm text-[#172d9d] hover:text-[#0f1a4a] transition-colors disabled:opacity-50"
                     >
                       {activityLoading ? (
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                       ) : (
                         <Activity className="w-4 h-4" />
                       )}
                       <span>Refresh</span>
                     </button>
                   </div>
                   <div className="space-y-3">
                     {recentActivity.length > 0 ? (
                       recentActivity.slice(0, 5).map((activity, index) => (
                         <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                           <div className="w-2 h-2 bg-[#172d9d] rounded-full"></div>
                           <div className="flex-1">
                             <p className="text-sm font-medium text-gray-900">
                               {activity.user} {activity.action}
                             </p>
                             <p className="text-xs text-gray-500">
                               {new Date(activity.timestamp).toLocaleString()}
                             </p>
                             {activity.details && (
                               <p className="text-xs text-gray-400 mt-1">
                                 {activity.details}
                               </p>
                             )}
                           </div>
                         </div>
                       ))
                     ) : (
                       <div className="text-center py-8 text-gray-500">
                         <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                         <p>No recent activity</p>
                       </div>
                     )}
                   </div>
                 </div>

                                 {/* System Status */}
                 <div className="bg-white rounded-lg shadow-sm p-6">
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
                   <div className="space-y-3">
                     <div className="flex items-center justify-between">
                       <span className="text-gray-700">Database Connection</span>
                       <span className={`flex items-center ${
                         systemStatus.database.status === 'connected' ? 'text-green-600' : 
                         systemStatus.database.status === 'checking' ? 'text-yellow-600' : 'text-red-600'
                       }`}>
                         {systemStatus.database.status === 'checking' ? (
                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-1"></div>
                         ) : systemStatus.database.status === 'connected' ? (
                           <CheckCircle className="w-4 h-4 mr-1" />
                         ) : (
                           <AlertCircle className="w-4 h-4 mr-1" />
                         )}
                         {systemStatus.database.message}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-700">Payment Gateway</span>
                       <span className={`flex items-center ${
                         systemStatus.paymentGateway.status === 'active' ? 'text-green-600' : 
                         systemStatus.paymentGateway.status === 'checking' ? 'text-yellow-600' : 'text-red-600'
                       }`}>
                         {systemStatus.paymentGateway.status === 'checking' ? (
                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-1"></div>
                         ) : systemStatus.paymentGateway.status === 'active' ? (
                           <CheckCircle className="w-4 h-4 mr-1" />
                         ) : (
                           <AlertCircle className="w-4 h-4 mr-1" />
                         )}
                         {systemStatus.paymentGateway.message}
                       </span>
                     </div>
                     <div className="flex items-center justify-between">
                       <span className="text-gray-700">Email Service</span>
                       <span className={`flex items-center ${
                         systemStatus.emailService.status === 'operational' ? 'text-green-600' : 
                         systemStatus.emailService.status === 'checking' ? 'text-yellow-600' : 'text-red-600'
                       }`}>
                         {systemStatus.emailService.status === 'checking' ? (
                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-1"></div>
                         ) : systemStatus.emailService.status === 'operational' ? (
                           <CheckCircle className="w-4 h-4 mr-1" />
                         ) : (
                           <AlertCircle className="w-4 h-4 mr-1" />
                         )}
                         {systemStatus.emailService.message}
                       </span>
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {/* Pricing Management Tab */}
            {activeTab === 'pricing' && (
              <PricingManagement />
            )}

            {/* Popup Management Tab */}
            {activeTab === 'popups' && (
              <PopupManagement />
            )}

            {/* Committee Management Tab */}
            {activeTab === 'committees' && (
              <CommitteeManagement />
            )}

            {/* Registrations Management Tab */}
            {activeTab === 'registrations' && (
              <RegistrationsManagement />
            )}

            {/* Contact Forms Tab */}
            {activeTab === 'contact' && (
              <ContactFormsManager />
            )}

            {/* Mailer Tab */}
            {activeTab === 'mailer' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Mailer 
                  committees={[
                    { id: 'all', name: 'All Registrants' },
                    { id: 'unsc', name: 'UNSC Applicants' },
                    { id: 'unodc', name: 'UNODC Applicants' },
                    { id: 'lok_sabha', name: 'Lok Sabha Applicants' },
                    { id: 'ccc', name: 'CCC Applicants' },
                    { id: 'ipc', name: 'IPC Applicants' },
                    { id: 'disec', name: 'DISEC Applicants' }
                  ]}
                  onSend={async (emailData) => {
                    try {
                      const result = await mailerAPI.sendBulkEmail(emailData);
                      console.log('Mailer API Response:', result); // Debug log
                      
                      if (result && result.success) {
                        const totalSent = result.data?.totalSent || result.totalSent || 1;
                        toast.success(`Email sent successfully to ${totalSent} recipient(s)!`);
                      } else {
                        throw new Error(result?.message || 'Failed to send email');
                      }
                    } catch (error) {
                      console.error('Error sending email:', error);
                      toast.error(`Failed to send email: ${error.message}`);
                      throw error;
                    }
                  }}
                />
              </div>
            )}

            {/* Transaction Records Tab */}
            {activeTab === 'transactions' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <TransactionRecords />
              </div>
            )}

            {/* Portfolio Manager Tab */}
            {activeTab === 'portfolios' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <PortfolioManager />
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <UserManagement />
              </div>
            )}

            {/* Gallery Manager Tab */}
            {activeTab === 'gallery' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <GalleryManager />
              </div>
            )}

            {/* Other tabs content would be implemented here */}
            {activeTab !== 'overview' && activeTab !== 'pricing' && activeTab !== 'popups' && activeTab !== 'committees' && activeTab !== 'registrations' && activeTab !== 'contact' && activeTab !== 'mailer' && activeTab !== 'transactions' && activeTab !== 'portfolios' && activeTab !== 'users' && activeTab !== 'gallery' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h3>
                <p className="text-gray-600">
                  This section is under development. Full functionality will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevAdminDashboard;