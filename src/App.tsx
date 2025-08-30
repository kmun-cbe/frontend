import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ErrorBoundary from './components/Common/ErrorBoundary';
import PageLoader from './components/Common/PageLoader';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Committees from './pages/Committees';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DelegateGuidelines from './pages/DelegateGuidelines';
import TermsOfService from './pages/TermsOfService';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Maintenance from './pages/Maintenance';

// Dashboard Components
import DelegateDashboard from './components/Dashboard/DelegateDashboard';
import DevAdminDashboard from './components/Dashboard/DevAdminDashboard';
import DelegateAffairsDashboard from './components/Dashboard/DelegateAffairsDashboard';
import FrontDeskAdminDashboard from './components/Dashboard/FrontDeskAdminDashboard';
import CommitteeDirectorDashboard from './components/Dashboard/CommitteeDirectorDashboard';
import HospitalityAdminDashboard from './components/Dashboard/HospitalityAdminDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <PageLoader message="Checking authentication..." />
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router Component
const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'DELEGATE':
      return <DelegateDashboard />;
    case 'DEV_ADMIN':
      return <DevAdminDashboard />;
    case 'DELEGATE_AFFAIRS':
      return <DelegateAffairsDashboard />;
    case 'FRONT_DESK_ADMIN':
      return <FrontDeskAdminDashboard />;
    case 'COMMITTEE_DIRECTOR':
      return <CommitteeDirectorDashboard />;
    case 'HOSPITALITY_ADMIN':
      return <HospitalityAdminDashboard />;
    default:
      return <DelegateDashboard />;
  }
};

function App() {
  const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, [pathname]);
    return null;
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/committees" element={<Layout><Committees /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/delegate-guidelines" element={<Layout><DelegateGuidelines /></Layout>} />
            <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />

            {/* Role-specific dashboard routes */}
            <Route 
              path="/dashboard/delegate" 
              element={
                <ProtectedRoute allowedRoles={['DELEGATE']}>
                  <DelegateDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/dev-admin" 
              element={
                <ProtectedRoute allowedRoles={['DEV_ADMIN']}>
                  <DevAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/delegate-affairs" 
              element={
                <ProtectedRoute allowedRoles={['DELEGATE_AFFAIRS']}>
                  <DelegateAffairsDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/front-desk" 
              element={
                <ProtectedRoute allowedRoles={['FRONT_DESK_ADMIN']}>
                  <FrontDeskAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/committee-director" 
              element={
                <ProtectedRoute allowedRoles={['COMMITTEE_DIRECTOR']}>
                  <CommitteeDirectorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/hospitality" 
              element={
                <ProtectedRoute allowedRoles={['HOSPITALITY_ADMIN']}>
                  <HospitalityAdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Error Pages */}
            <Route path="/404" element={<Layout><Error404 /></Layout>} />
            <Route path="/500" element={<Layout><Error500 /></Layout>} />
            <Route path="/maintenance" element={<Layout><Maintenance /></Layout>} />
            
            {/* Redirect any unmatched routes to 404 */}
            <Route path="*" element={<Layout><Error404 /></Layout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;