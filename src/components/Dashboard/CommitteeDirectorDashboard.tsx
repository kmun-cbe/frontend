import React, { useState } from 'react';
import { 
  Users, 
  UserCheck,
  Upload,
  Bell,
  LogOut,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CommitteeDirectorDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('attendance');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'attendance', label: 'Mark Attendance', icon: UserCheck },
    { id: 'view-attendance', label: 'View Attendance', icon: Users },
    { id: 'upload-marks', label: 'Upload Marks', icon: Upload },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const committeeMembers = [
    {
      id: 'KMUN25001',
      name: 'John Smith',
      portfolio: 'United States',
      institution: 'Harvard University',
      attendance: {
        session1: true,
        session2: true,
        session3: false,
        session4: null
      },
      marks: 85
    },
    {
      id: 'KMUN25002',
      name: 'Sarah Johnson',
      portfolio: 'China',
      institution: 'MIT',
      attendance: {
        session1: true,
        session2: false,
        session3: true,
        session4: null
      },
      marks: 92
    }
  ];

  // Mock events data for future use
  // const events = [
  //   { id: 1, name: 'Opening Session', date: '2025-09-26', time: '09:00-12:00', status: 'completed' },
  //   { id: 2, name: 'Committee Session I', date: '2025-09-26', time: '14:00-17:00', status: 'completed' },
  //   { id: 3, name: 'Committee Session II', date: '2025-09-27', time: '09:00-12:00', status: 'active' },
  //   { id: 4, name: 'Closing Session', date: '2025-09-28', time: '16:00-18:00', status: 'upcoming' }
  // ];

  const markAttendance = (memberId: string, eventId: number, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    console.log('Marking attendance:', memberId, eventId, status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#172d9d] to-[#797dfa] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Committee Director Dashboard</h1>
                <p className="text-sm text-gray-600">United Nations Security Council</p>
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
                        ? 'bg-indigo-50 text-indigo-800 border-r-2 border-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Committee Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Committee Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Present Today</span>
                  <span className="font-medium text-green-600">13</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Attendance</span>
                  <span className="font-medium">87%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                {/* Active Event */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Event</h3>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-indigo-900">Committee Session II</h4>
                        <p className="text-indigo-700 text-sm">September 27, 2025 • 09:00-12:00</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attendance Marking */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Mark Attendance</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delegate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Portfolio
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attendance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {committeeMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.institution}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {member.portfolio}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => markAttendance(member.id, 3, 'PRESENT')}
                                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                >
                                  Present
                                </button>
                                <button
                                  onClick={() => markAttendance(member.id, 3, 'LATE')}
                                  className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                                >
                                  Late
                                </button>
                                <button
                                  onClick={() => markAttendance(member.id, 3, 'ABSENT')}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                  Absent
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'view-attendance' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Overview</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delegate
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session 1
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session 2
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session 3
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {committeeMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{member.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {member.attendance.session1 ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {member.attendance.session2 ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {member.attendance.session3 ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : member.attendance.session3 === false ? (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full mx-auto"></div>
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-500 mx-auto" />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            67%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'upload-marks' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Marks</h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Bulk Upload</h4>
                    <p className="text-blue-800 text-sm mb-4">
                      Upload marks for all committee members using an Excel file.
                    </p>
                    <div className="space-y-2">
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Download Template
                      </button>
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">Upload Excel file with marks</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Individual Marks</h4>
                    <div className="space-y-4">
                      {committeeMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.portfolio}</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              defaultValue={member.marks}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <span className="text-gray-500">/ 100</span>
                            <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
                              Update
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-indigo-900">Session Starting Soon</h4>
                        <p className="text-indigo-800 text-sm mt-1">
                          Committee Session II will begin in 15 minutes.
                        </p>
                      </div>
                      <span className="text-xs text-indigo-600">5 min ago</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 bg-green-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-green-900">Attendance Submitted</h4>
                        <p className="text-green-800 text-sm mt-1">
                          Session I attendance has been successfully recorded.
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

export default CommitteeDirectorDashboard;