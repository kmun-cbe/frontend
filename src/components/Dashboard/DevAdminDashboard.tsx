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
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, pricingAPI, popupAPI } from '../../services/api';
import toast from 'react-hot-toast';

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
  accommodationCharge: number;
  earlyBirdDiscount: number;
  groupDiscount: number;
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
    externalDelegate: 3500,
    accommodationCharge: 1500,
    earlyBirdDiscount: 500,
    groupDiscount: 200
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
          externalDelegate: response.data.externalDelegate,
          accommodationCharge: response.data.accommodationCharge,
          earlyBirdDiscount: response.data.earlyBirdDiscount,
          groupDiscount: response.data.groupDiscount
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Internal Delegate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Internal Delegate Fee
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

          {/* Accommodation Charge */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Accommodation Charge
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.accommodationCharge}
                onChange={(e) => handleInputChange('accommodationCharge', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="1500"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500">Optional accommodation fee</p>
          </div>

          {/* Early Bird Discount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Early Bird Discount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.earlyBirdDiscount}
                onChange={(e) => handleInputChange('earlyBirdDiscount', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="500"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500">Discount for early registration</p>
          </div>

          {/* Group Discount */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Group Discount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.groupDiscount}
                onChange={(e) => handleInputChange('groupDiscount', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                placeholder="200"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500">Discount per person in group</p>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Internal Delegate</p>
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
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accommodation</p>
                <p className="text-xl font-bold text-purple-600">₹{formData.accommodationCharge}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600 opacity-50" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Discounts</p>
                <p className="text-xl font-bold text-yellow-600">₹{formData.earlyBirdDiscount + formData.groupDiscount}</p>
              </div>
              <CreditCard className="w-8 h-8 text-yellow-600 opacity-50" />
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
      const response = await popupAPI.update(formData);
      if (response.success) {
        setPopup(response.data);
        toast.success('Popup updated successfully');
      }
    } catch (error) {
      console.error('Error updating popup:', error);
      toast.error('Failed to update popup');
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
      }
    } catch (error) {
      console.error('Error toggling popup:', error);
      toast.error('Failed to toggle popup');
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
              // Check database connection
        const dbResponse = await fetch('/api/health/database');
        setSystemStatus(prev => ({
          ...prev,
          database: {
            status: dbResponse.ok ? 'connected' : 'error',
            message: dbResponse.ok ? 'Connected' : 'Connection failed'
          }
        }));

        // Check payment gateway
        const paymentResponse = await fetch('/api/health/payment');
        setSystemStatus(prev => ({
          ...prev,
          paymentGateway: {
            status: paymentResponse.ok ? 'active' : 'error',
            message: paymentResponse.ok ? 'Active' : 'Service unavailable'
          }
        }));

        // Check email service
        const emailResponse = await fetch('/api/health/email');
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
        toast.error('Failed to load dashboard data');
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
    { id: 'payments', label: 'Transaction Status', icon: CreditCard },
    { id: 'committees', label: 'Committee Manager', icon: FileText },
    { id: 'portfolios', label: 'Portfolio Manager', icon: Edit },
    { id: 'pricing', label: 'Pricing', icon: Settings },
    { id: 'popups', label: 'Popup Manager', icon: AlertCircle },
    { id: 'mailer', label: 'Mailer', icon: Mail },
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
              <div className="w-10 h-10 bg-gradient-to-r from-[#172d9d] to-[#797dfa] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DEV</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dev Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Complete system administration and management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#0f1a4a] transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Quick Action
              </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
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

          {/* Main Content */}
          <div className="lg:col-span-3">
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
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <button 
                       onClick={() => setActiveTab('users')}
                       className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                     >
                       <UserPlus className="w-6 h-6 text-[#172d9d] mb-2" />
                       <h4 className="font-medium text-gray-900">Add New User</h4>
                       <p className="text-sm text-gray-600">Create admin or delegate account</p>
                     </button>
                     <button 
                       onClick={() => setActiveTab('payments')}
                       className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                     >
                       <CreditCard className="w-6 h-6 text-green-600 mb-2" />
                       <h4 className="font-medium text-gray-900">Transaction Status</h4>
                       <p className="text-sm text-gray-600">View and manage payment transactions</p>
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

            {/* Other tabs content would be implemented here */}
            {activeTab !== 'overview' && activeTab !== 'pricing' && activeTab !== 'popups' && (
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