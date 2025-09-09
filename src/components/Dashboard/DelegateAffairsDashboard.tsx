import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Mail,
  MessageSquare,
  UserCheck,
  LogOut,
  Edit
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ContactFormsManager from './ContactFormsManager';
import Mailer from '@/components/Common/Mailer';
import toast from 'react-hot-toast';
import { mailerAPI, registrationAPI } from '@/services/api';

const DelegateAffairsDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registrations');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'registrations', label: 'View Registrations', icon: Users },
    { id: 'allocation', label: 'Committee Allocation', icon: UserCheck },
    { id: 'mailer', label: 'Mailer', icon: Mail },
    { id: 'contact', label: 'Contact Forms', icon: MessageSquare },
  ];

  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#172d9d] to-[#797dfa] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">DA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Delegate Affairs Dashboard</h1>
                <p className="text-sm text-gray-600">Manage registrations and committee allocations</p>
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
                        ? 'bg-green-50 text-green-800 border-r-2 border-green-600'
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
            {activeTab === 'registrations' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search registrations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option value="all">All Payments</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Participant
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
                              <div>
                                <div className="font-medium text-gray-900">
                                  {registration.firstName} {registration.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{registration.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {registration.institution}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div>
                                1. {registration.committeePreference1}<br/>
                                2. {registration.committeePreference2}<br/>
                                3. {registration.committeePreference3}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {registration.allocatedCommittee ? (
                                <div>
                                  <div className="font-medium text-blue-600">{registration.allocatedCommittee}</div>
                                  <div className="text-xs text-gray-500">{registration.allocatedPortfolio || 'No Portfolio'}</div>
                                </div>
                              ) : (
                                <span className="text-gray-400">Not Allocated</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                registration.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                registration.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {registration.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-green-600 hover:text-green-900 mr-4">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'allocation' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Committee Allocation</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Allocation Tools</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Auto Allocate by Preference
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Manual Allocation
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Bulk Upload Allocations
                    </button>
                  </div>
                </div>

                <div className="text-gray-600">
                  Committee allocation interface will be displayed here with drag-and-drop functionality.
                </div>
              </div>
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

            {/* Other tabs */}
            {activeTab !== 'registrations' && activeTab !== 'allocation' && activeTab !== 'contact' && activeTab !== 'mailer' && (
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

export default DelegateAffairsDashboard;