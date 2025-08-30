import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserCheck,
  Download,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HospitalityAdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('checkin');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    email: string;
    institution: string;
    gender: string;
    phone: string;
    checkedIn: boolean;
    checkedInTime: string | null;
    checkedOut: boolean;
    checkedOutTime: string | null;
    checkInFrequency: number;
    checkOutFrequency: number;
  } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'checkin', label: 'Check-In/Out', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: Download }
  ];

  const participants = [
    { 
      id: 'KMUN25001',
      name: 'John Smith', 
      email: 'john@university.edu', 
      institution: 'Harvard University',
      gender: 'Male',
      phone: '+91 9876543210',
      checkedIn: true,
      checkedInTime: '2025-03-15 09:15:00',
      checkedOut: false,
      checkedOutTime: null,
      checkInFrequency: 1,
      checkOutFrequency: 0
    },
    { 
      id: 'KMUN25002',
      name: 'Sarah Johnson', 
      email: 'sarah@college.edu', 
      institution: 'MIT',
      gender: 'Female',
      phone: '+91 9876543211',
      checkedIn: false,
      checkedInTime: null,
      checkedOut: false,
      checkedOutTime: null,
      checkInFrequency: 0,
      checkOutFrequency: 0
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

  const handleCheckIn = (userId: string) => {
    console.log('Checking in user for accommodation:', userId);
    // Implementation for accommodation check-in
    setShowCheckInModal(false);
  };

  const handleCheckOut = (userId: string) => {
    console.log('Checking out user from accommodation:', userId);
    // Implementation for accommodation check-out
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
                <span className="text-white font-bold">HA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hospitality Dashboard</h1>
                <p className="text-sm text-gray-600">Manage accommodation check-ins and check-outs</p>
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
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors
                      ${activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
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
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Check-In/Out Management</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by ID, name, or email..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => handleUserSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participants.map((participant) => (
                        <tr key={participant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                              <div className="text-sm text-gray-500">{participant.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {participant.institution}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              participant.checkedIn 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {participant.checkedIn ? 'Checked In' : 'Not Checked In'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.checkedInTime || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleUserSearch(participant.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {participant.checkedIn ? 'Check Out' : 'Check In'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Reports</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-600">Total Participants</p>
                        <p className="text-2xl font-bold text-blue-900">{participants.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <UserCheck className="w-8 h-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-600">Checked In</p>
                        <p className="text-2xl font-bold text-green-900">
                          {participants.filter(p => p.checkedIn).length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Download className="w-8 h-8 text-gray-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {participants.filter(p => !p.checkedIn).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Check-In Modal */}
      {showCheckInModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {selectedUser.checkedIn ? 'Check Out' : 'Check In'} - {selectedUser.name}
              </h3>
              <div className="text-sm text-gray-600 mb-6">
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Institution:</strong> {selectedUser.institution}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowCheckInModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => selectedUser.checkedIn ? handleCheckOut(selectedUser.id) : handleCheckIn(selectedUser.id)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedUser.checkedIn 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {selectedUser.checkedIn ? 'Check Out' : 'Check In'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalityAdminDashboard;