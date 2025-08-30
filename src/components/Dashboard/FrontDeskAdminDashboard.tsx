import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  UserCheck,
  UserX,
  Bell,
  LogOut,
  User,
  CheckCircle,
  Clock,
  Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FrontDeskAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('checkin');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    email: string;
    institution: string;
    committee: string;
    portfolio: string;
    checkedIn: boolean;
    kitReceived: boolean;
    phone: string;
  } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'checkin', label: 'Check In/Out', icon: UserCheck },
    { id: 'userinfo', label: 'User Info', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const participants = [
    { 
      id: 'KMUN25001',
      name: 'John Smith', 
      email: 'john@university.edu', 
      institution: 'Harvard University',
      committee: 'UNSC',
      portfolio: 'United States',
      checkedIn: false,
      kitReceived: false,
      phone: '+91 9876543210'
    },
    { 
      id: 'KMUN25002',
      name: 'Sarah Johnson', 
      email: 'sarah@college.edu', 
      institution: 'MIT',
      committee: 'GA',
      portfolio: 'China',
      checkedIn: true,
      kitReceived: true,
      phone: '+91 9876543211'
    }
  ];

  const handleUserSearch = (userId: string) => {
    const user = participants.find(p => p.id === userId);
    if (user) {
      setSelectedUser(user);
      setShowCheckInModal(true);
    } else {
      alert('User not found');
    }
  };

  const handleCheckIn = (userId: string, kitReceived: boolean) => {
    console.log('Checking in user:', userId, 'Kit received:', kitReceived);
    setShowCheckInModal(false);
  };

  const handleCheckOut = (userId: string) => {
    console.log('Checking out user:', userId);
    setShowCheckInModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#172d9d] to-[#797dfa] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">FD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Front Desk Dashboard</h1>
                <p className="text-sm text-gray-600">Manage participant check-ins and information</p>
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
                        ? 'bg-purple-50 text-purple-800 border-r-2 border-purple-600'
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
            {activeTab === 'checkin' && (
              <div className="space-y-6">
                {/* Check-in Search */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Participant Check-In/Out</h3>
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter User ID (e.g., KMUN25001)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-lg"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleUserSearch((e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder*="User ID"]') as HTMLInputElement;
                        if (input?.value) {
                          handleUserSearch(input.value);
                        }
                      }}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center text-lg font-medium"
                    >
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Participants</p>
                        <p className="text-2xl font-bold text-gray-900">347</p>
                      </div>
                      <UserCheck className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Checked In</p>
                        <p className="text-2xl font-bold text-green-600">289</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Kits Distributed</p>
                        <p className="text-2xl font-bold text-blue-600">267</p>
                      </div>
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Check-in Modal */}
                {showCheckInModal && selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Participant Details</h3>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">User ID:</span>
                          <span className="font-medium">{selectedUser.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedUser.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Institution:</span>
                          <span className="font-medium">{selectedUser.institution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Committee:</span>
                          <span className="font-medium">{selectedUser.committee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Portfolio:</span>
                          <span className="font-medium">{selectedUser.portfolio}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${selectedUser.checkedIn ? 'text-green-600' : 'text-yellow-600'}`}>
                            {selectedUser.checkedIn ? 'Checked In' : 'Not Checked In'}
                          </span>
                        </div>
                      </div>
                      
                      {!selectedUser.checkedIn ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="kitReceived"
                              className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="kitReceived" className="text-sm font-medium text-gray-700">
                              Kit Received
                            </label>
                          </div>
                          <div className="flex space-x-4">
                            <button 
                              onClick={() => setShowCheckInModal(false)}
                              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => {
                                const kitCheckbox = document.getElementById('kitReceived') as HTMLInputElement;
                                handleCheckIn(selectedUser.id, kitCheckbox?.checked || false);
                              }}
                              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Check In
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => setShowCheckInModal(false)}
                            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleCheckOut(selectedUser.id)}
                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Check Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'userinfo' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">User Information (View Only)</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Committee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participants.map((participant) => (
                        <tr key={participant.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                            {participant.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{participant.name}</div>
                              <div className="text-sm text-gray-500">{participant.institution}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{participant.committee}</div>
                              <div className="text-sm text-gray-500">{participant.portfolio}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              participant.checkedIn ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {participant.checkedIn ? 'Checked In' : 'Not Checked In'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                        <h4 className="font-medium text-blue-900">System Update</h4>
                        <p className="text-blue-800 text-sm mt-1">
                          Check-in system has been updated with new features.
                        </p>
                      </div>
                      <span className="text-xs text-blue-600">1 hour ago</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-green-900">Registration Complete</h4>
                        <p className="text-green-800 text-sm mt-1">
                          All participants have been registered successfully.
                        </p>
                      </div>
                      <span className="text-xs text-green-600">2 hours ago</span>
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

export default FrontDeskAdminDashboard;