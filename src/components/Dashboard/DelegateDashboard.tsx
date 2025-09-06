import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  LogOut,
  Calendar,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { getImageUrl } from '../../utils/images';
import toast from 'react-hot-toast';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  institution?: string;
  grade?: string;
  userId?: string;
  committeePreference1?: string;
  committeePreference2?: string;
  committeePreference3?: string;
  portfolioPreference1?: string;
  portfolioPreference2?: string;
  portfolioPreference3?: string;
  paymentStatus?: string;
  registrationStatus?: string;
  allocatedCommittee?: string;
  allocatedPortfolio?: string;
  gender?: string;
  isKumaraguru?: boolean;
  rollNumber?: string;
  institutionType?: string;
  cityOfInstitution?: string;
  stateOfInstitution?: string;
  totalMuns?: number;
  requiresAccommodation?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: string;
  isRead: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const DelegateDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'registration', label: 'Registration Details', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'events', label: 'Event Schedule', icon: Calendar }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile data
        const profileResponse = await authAPI.getProfile();
        if (profileResponse.success) {
          setUserProfile(profileResponse.data);
        }

        // Mock notifications data (replace with actual API call)
        setNotifications([
          {
            id: '1',
            title: 'Welcome to K-MUN 2025!',
            message: 'Thank you for registering. Please complete your payment to secure your spot.',
            type: 'info',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            isRead: false
          },
          {
            id: '2',
            title: 'Payment Reminder',
            message: 'Please complete your registration payment within 48 hours.',
            type: 'warning',
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            isRead: false
          }
        ]);

        // Mock events data (replace with actual API call)
        setEvents([
          {
            id: '1',
            title: 'Opening Ceremony',
            date: '2025-09-26',
            time: '09:00 - 10:00',
            location: 'Main Auditorium',
            description: 'Welcome address and conference inauguration',
            status: 'upcoming'
          },
          {
            id: '2',
            title: 'Committee Session I',
            date: '2025-09-26',
            time: '10:30 - 12:30',
            location: 'Committee Rooms',
            description: 'First committee session with agenda setting',
            status: 'upcoming'
          },
          {
            id: '3',
            title: 'Committee Session II',
            date: '2025-09-27',
            time: '09:00 - 12:00',
            location: 'Committee Rooms',
            description: 'Second committee session with debate',
            status: 'upcoming'
          }
        ]);

      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-blue-500 bg-blue-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'success': return 'border-green-500 bg-green-50';
      case 'error': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
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
                <img 
                  src={getImageUrl('logo', '/logo.png')} 
                  alt="K-MUN 2025 Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-r from-[#172d9d] to-[#797dfa] rounded-full flex items-center justify-center hidden">
                  <span className="text-white font-bold text-sm">MUN</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Delegate Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome Back, {userProfile?.firstName} {userProfile?.lastName}!
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                      ? 'bg-[#172d9d] text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <p className="text-gray-900">
                      {userProfile?.firstName && userProfile?.lastName 
                        ? `${userProfile.firstName} ${userProfile.lastName}`
                        : 'Not Available'
                      }
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900">{userProfile?.email || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <p className="text-gray-900">{userProfile?.phone || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <p className="text-gray-900">{userProfile?.institution || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade/Year
                    </label>
                    <p className="text-gray-900 capitalize">{userProfile?.grade || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User ID
                    </label>
                    <p className="text-gray-900 font-mono">{userProfile?.userId || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Committee Preference 1
                    </label>
                    <p className="text-gray-900">{userProfile?.committeePreference1 || 'Not Available'}</p>
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Committee Preference 2
                    </label>
                    <p className="text-gray-900">{userProfile?.committeePreference2 || 'Not Available'}</p>
              </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Committee Preference 3
                      </label>
                    <p className="text-gray-900">{userProfile?.committeePreference3 || 'Not Available'}</p>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Status
                      </label>
                    <p className="text-gray-900">{userProfile?.paymentStatus || 'Not Available'}</p>
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Status
                    </label>
                    <p className="text-gray-900">{userProfile?.registrationStatus || 'Not Available'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registration Date
                    </label>
                    <p className="text-gray-900">
                      {userProfile?.createdAt ? formatDate(userProfile.createdAt) : 'Not Available'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Login
                    </label>
                    <p className="text-gray-900">
                      {userProfile?.lastLogin ? formatDate(userProfile.lastLogin) : 'Not Available'}
                    </p>
                </div>
                </div>
              </div>
            )}

            {activeTab === 'registration' && (
              <div className="space-y-6">
                {/* Registration Status Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Registration Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {userProfile?.registrationStatus || 'PENDING'}
                      </div>
                      <div className="text-sm text-blue-800">Registration Status</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {userProfile?.paymentStatus || 'PENDING'}
                      </div>
                      <div className="text-sm text-green-800">Payment Status</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {userProfile?.isKumaraguru ? 'Internal' : 'External'}
                      </div>
                      <div className="text-sm text-purple-800">Delegate Type</div>
                    </div>
                  </div>
                </div>

                {/* Committee Allocation */}
                {(userProfile?.allocatedCommittee || userProfile?.allocatedPortfolio) && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Committee Allocation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                          </div>
                          <div>
                            <div className="text-sm text-blue-600 font-medium">Allocated Committee</div>
                            <div className="text-xl font-bold text-blue-900">
                              {userProfile?.allocatedCommittee || 'Not Allocated'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                          </div>
                          <div>
                            <div className="text-sm text-green-600 font-medium">Allocated Portfolio</div>
                            <div className="text-xl font-bold text-green-900">
                              {userProfile?.allocatedPortfolio || 'Not Allocated'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <p className="text-gray-900">
                        {userProfile?.firstName && userProfile?.lastName 
                          ? `${userProfile.firstName} ${userProfile.lastName}`
                          : 'Not Available'
                        }
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900">{userProfile?.email || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <p className="text-gray-900">{userProfile?.phone || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <p className="text-gray-900 capitalize">{userProfile?.gender || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                      <p className="text-gray-900">{userProfile?.rollNumber || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total MUNs Attended</label>
                      <p className="text-gray-900">{userProfile?.totalMuns || 'Not Available'}</p>
                    </div>
                  </div>
                </div>

                {/* Institution Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Institution Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution Type</label>
                      <p className="text-gray-900 capitalize">{userProfile?.institutionType || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                      <p className="text-gray-900">{userProfile?.institution || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <p className="text-gray-900">{userProfile?.cityOfInstitution || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <p className="text-gray-900">{userProfile?.stateOfInstitution || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Year</label>
                      <p className="text-gray-900 capitalize">{userProfile?.grade || 'Not Available'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Required</label>
                      <p className="text-gray-900">
                        {userProfile?.requiresAccommodation ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Committee Preferences */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Committee Preferences</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">1st Preference</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Primary</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {userProfile?.committeePreference1 || 'Not Selected'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Portfolio: {userProfile?.portfolioPreference1 || 'Not Selected'}
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">2nd Preference</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Secondary</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {userProfile?.committeePreference2 || 'Not Selected'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Portfolio: {userProfile?.portfolioPreference2 || 'Not Selected'}
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">3rd Preference</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Tertiary</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        {userProfile?.committeePreference3 || 'Not Selected'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Portfolio: {userProfile?.portfolioPreference3 || 'Not Selected'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Timeline */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Registration Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Registration Submitted</div>
                        <div className="text-xs text-gray-500">
                          {userProfile?.createdAt ? formatDate(userProfile.createdAt) : 'Not Available'}
                        </div>
                      </div>
                    </div>
                    {userProfile?.allocatedCommittee && (
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Committee Allocated</div>
                          <div className="text-xs text-gray-500">Allocation completed</div>
                        </div>
                      </div>
                    )}
                    {userProfile?.paymentStatus === 'PAID' && (
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Payment Completed</div>
                          <div className="text-xs text-gray-500">Registration confirmed</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
                
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No notifications available</p>
                  </div>
                ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`border-l-4 p-4 ${getNotificationColor(notification.type)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                            <h4 className={`font-medium ${
                              notification.type === 'info' ? 'text-blue-900' :
                              notification.type === 'warning' ? 'text-yellow-900' :
                              notification.type === 'success' ? 'text-green-900' :
                              notification.type === 'error' ? 'text-red-900' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className={`text-sm mt-1 ${
                              notification.type === 'info' ? 'text-blue-800' :
                              notification.type === 'warning' ? 'text-yellow-800' :
                              notification.type === 'success' ? 'text-green-800' :
                              notification.type === 'error' ? 'text-red-800' : 'text-gray-800'
                            }`}>
                              {notification.message}
                            </p>
                          </div>
                          <span className={`text-xs ${
                            notification.type === 'info' ? 'text-blue-600' :
                            notification.type === 'warning' ? 'text-yellow-600' :
                            notification.type === 'success' ? 'text-green-600' :
                            notification.type === 'error' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                    </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Schedule</h3>
                
                {events.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No events scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>📍</span>
                                <span>{event.location}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegateDashboard;