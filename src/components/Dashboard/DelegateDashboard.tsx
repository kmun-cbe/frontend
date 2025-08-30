import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  LogOut,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DelegateDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'accommodation', label: 'Accommodation', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MUN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Delegate Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.firstName}!</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user?.firstName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-600">{user?.institution || 'Institution not specified'}</p>
                <p className="text-sm text-gray-500">ID: {user?.userId}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Registered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Payment Pending</span>
              </div>
            </div>
          </div>
        </div>

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
                        ? 'bg-blue-50 text-blue-800 border-r-2 border-blue-800'
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
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <p className="text-gray-900">{user?.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <p className="text-gray-900">{user?.institution}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade/Year
                    </label>
                    <p className="text-gray-900 capitalize">{user?.grade}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User ID
                    </label>
                    <p className="text-gray-900 font-mono">{user?.userId}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accommodation' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Accommodation Booking</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Book Your Stay</h4>
                  <p className="text-blue-800 text-sm mb-4">
                    Secure your accommodation for the conference dates.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="2025-09-25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-2">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="2025-09-29"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Room Preference
                    </label>
                    <select className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="SINGLE">Single Room (₹800/night)</option>
                      <option value="DOUBLE">Double Room (₹600/night per person)</option>
                      <option value="TRIPLE">Triple Room (₹500/night per person)</option>
                      <option value="QUAD">Quad Room (₹400/night per person)</option>
                    </select>
                  </div>
                  
                  <button className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors">
                    Book Accommodation
                  </button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Current Booking Status</h4>
                  <p className="text-gray-600 text-sm">No accommodation booked yet.</p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-900">Welcome to K-MUN 2025!</h4>
                        <p className="text-blue-800 text-sm mt-1">
                          Thank you for registering. Please complete your payment to secure your spot.
                        </p>
                      </div>
                      <span className="text-xs text-blue-600">2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-yellow-900">Payment Reminder</h4>
                        <p className="text-yellow-800 text-sm mt-1">
                          Please complete your registration payment within 48 hours.
                        </p>
                      </div>
                      <span className="text-xs text-yellow-600">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegateDashboard;