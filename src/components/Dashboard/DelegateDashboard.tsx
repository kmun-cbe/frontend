import React, { useState, useEffect } from 'react';
import { 
  User, 
  LogOut,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI, registrationAPI, paymentsAPI } from '@/services/api';
import CompletePaymentButton from '@/components/Common/CompletePaymentButton';
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
  registrationId?: string;
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

const DelegateDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registration');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'registration', label: 'Registration Details', icon: User },
    { id: 'events', label: 'Event Schedule', icon: Calendar }
  ];

  const fetchUserData = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      console.log('Fetching user data...');
      
      // Fetch user profile data
      const profileResponse = await authAPI.getProfile();
      let profileData = null;
      
      if (profileResponse.success) {
        const userData = profileResponse.user || profileResponse.data;
        console.log('Profile data received:', userData);
        console.log('Registration forms available:', userData?.registrationForms);
        
        // Get the latest registration form data with proper null checks
        const latestRegistration = userData && userData.registrationForms && userData.registrationForms.length > 0 
          ? userData.registrationForms[userData.registrationForms.length - 1] 
          : null;
        
        console.log('Latest registration:', latestRegistration);
        
        // Merge user data with registration data
        profileData = {
          ...(userData || {}),
          ...(latestRegistration || {}),
          // Map registration form fields to profile fields
          committeePreference1: latestRegistration?.committeePreference1,
          committeePreference2: latestRegistration?.committeePreference2,
          committeePreference3: latestRegistration?.committeePreference3,
          portfolioPreference1: latestRegistration?.portfolioPreference1,
          portfolioPreference2: latestRegistration?.portfolioPreference2,
          portfolioPreference3: latestRegistration?.portfolioPreference3,
          registrationStatus: latestRegistration?.status,
          allocatedCommittee: latestRegistration?.allocatedCommittee,
          allocatedPortfolio: latestRegistration?.allocatedPortfolio,
          institution: latestRegistration?.institution,
          cityOfInstitution: latestRegistration?.cityOfInstitution,
          stateOfInstitution: latestRegistration?.stateOfInstitution,
          grade: latestRegistration?.grade,
          totalMuns: latestRegistration?.totalMuns,
          requiresAccommodation: latestRegistration?.requiresAccommodation,
          gender: latestRegistration?.gender,
          isKumaraguru: latestRegistration?.isKumaraguru,
          rollNumber: latestRegistration?.rollNumber,
          institutionType: latestRegistration?.institutionType,
        };
      }

      // If no registration data from profile, try to fetch it separately
      if (!profileData || !profileData.registrationStatus) {
        try {
          console.log('Fetching separate registration data...');
          const registrationResponse = await registrationAPI.getMyRegistration();
          if (registrationResponse.success && registrationResponse.registration) {
            const registration = registrationResponse.registration;
            console.log('Separate registration data:', registration);
            profileData = {
              ...(profileData || {}),
              ...registration,
              committeePreference1: registration.committeePreference1,
              committeePreference2: registration.committeePreference2,
              committeePreference3: registration.committeePreference3,
              portfolioPreference1: registration.portfolioPreference1,
              portfolioPreference2: registration.portfolioPreference2,
              portfolioPreference3: registration.portfolioPreference3,
              registrationStatus: registration.status,
              allocatedCommittee: registration.allocatedCommittee,
              allocatedPortfolio: registration.allocatedPortfolio,
              institution: registration.institution,
              cityOfInstitution: registration.cityOfInstitution,
              stateOfInstitution: registration.stateOfInstitution,
              grade: registration.grade,
              totalMuns: registration.totalMuns,
              requiresAccommodation: registration.requiresAccommodation,
              gender: registration.gender,
              isKumaraguru: registration.isKumaraguru,
              rollNumber: registration.rollNumber,
              institutionType: registration.institutionType,
            };
          }
        } catch (regError) {
          console.log('No separate registration data found:', regError);
        }
      }

      // Fetch payment status if we have registration data
      if (profileData && profileData.registrationId) {
        try {
          console.log('Fetching payment status...');
          const paymentsResponse = await paymentsAPI.getAll({ userId: profileData.id });
          if (paymentsResponse.success && paymentsResponse.data && paymentsResponse.data.length > 0) {
            const latestPayment = paymentsResponse.data[0];
            profileData.paymentStatus = latestPayment.status;
            console.log('Payment status updated:', latestPayment.status);
          }
        } catch (paymentError) {
          console.log('No payment data found:', paymentError);
          // Set default payment status based on registration status
          if (profileData.registrationStatus === 'PENDING') {
            profileData.paymentStatus = 'PENDING';
          } else if (profileData.registrationStatus === 'APPROVED') {
            profileData.paymentStatus = 'COMPLETED';
          }
        }
      }

      if (profileData) {
        setUserProfile(profileData);
        console.log('Final profile data set:', profileData);
        if (showRefreshToast) {
          toast.success('Data refreshed successfully!');
        }
      } else {
        setError('No user data found. Please try logging in again.');
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load user data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchUserData(true);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    toast.success('Payment completed successfully!');
    // Update payment status immediately
    if (userProfile) {
      setUserProfile(prev => prev ? { ...prev, paymentStatus: 'COMPLETED', registrationStatus: 'APPROVED' } : null);
    }
    // Refresh data after a short delay
    setTimeout(() => {
      fetchUserData(true);
    }, 1000);
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    toast.error('Payment failed. Please try again.');
    // Update payment status to failed
    if (userProfile) {
      setUserProfile(prev => prev ? { ...prev, paymentStatus: 'FAILED' } : null);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'APPROVED': return 'text-green-600 bg-green-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'FAILED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-3">
            <button
              onClick={handleRefresh}
              className="bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
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
                  src="/logo.png" 
                  alt="K-MUN 2025 Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
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
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                title="Refresh Data"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
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
            {activeTab === 'registration' && (
              <div className="space-y-6">
                {/* Registration Status Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Registration Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getStatusColor(userProfile?.registrationStatus || 'PENDING')}`}>
                        {userProfile?.registrationStatus || 'PENDING'}
                      </div>
                      <div className="text-sm text-blue-800 mt-2">Registration Status</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className={`text-2xl font-bold px-3 py-1 rounded-full inline-block ${getStatusColor(userProfile?.paymentStatus || 'PENDING')}`}>
                        {userProfile?.paymentStatus || 'PENDING'}
                      </div>
                      <div className="text-sm text-green-800 mt-2">Payment Status</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {userProfile?.isKumaraguru ? 'Internal' : 'External'}
                      </div>
                      <div className="text-sm text-purple-800">Delegate Type</div>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                {(userProfile?.paymentStatus === 'PENDING' || userProfile?.paymentStatus === 'FAILED') && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Complete Your Payment</h3>
                    <div className={`border rounded-lg p-4 mb-6 ${
                      userProfile?.paymentStatus === 'FAILED' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {userProfile?.paymentStatus === 'FAILED' ? (
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-400" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm ${
                            userProfile?.paymentStatus === 'FAILED' ? 'text-red-800' : 'text-yellow-800'
                          }`}>
                            {userProfile?.paymentStatus === 'FAILED' 
                              ? 'Your payment failed. Please try again to complete your registration.'
                              : 'Your registration is pending payment. Complete your payment to confirm your participation in Kumaraguru MUN 2025.'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {userProfile && (
                      <CompletePaymentButton
                        userId={userProfile.id}
                        registrationId={userProfile.registrationId || userProfile.id}
                        customUserId={userProfile.userId || 'N/A'}
                        isKumaraguru={userProfile.isKumaraguru || false}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentFailure={handlePaymentFailure}
                        className="max-w-md mx-auto"
                      />
                    )}
                  </div>
                )}

                {/* Payment Success Message */}
                {userProfile?.paymentStatus === 'COMPLETED' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Completed!</h3>
                      <p className="text-gray-600">
                        Your registration is now confirmed. You will receive further updates via email.
                      </p>
                    </div>
                  </div>
                )}

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
                      <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
                      <p className="text-gray-900 font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                        {userProfile?.userId || 'Not Available'}
                      </p>
                    </div>
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
                    {userProfile?.paymentStatus === 'COMPLETED' && (
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

            {activeTab === 'events' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Schedule</h3>
                
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Event Schedule Coming Soon</h4>
                  <p className="text-gray-500 max-w-md mx-auto">
                    We're working on finalizing the event schedule for Kumaraguru MUN 2025. 
                    The complete schedule will be released soon. Stay tuned for updates!
                  </p>
                  <div className="mt-6">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">To be released soon</span>
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