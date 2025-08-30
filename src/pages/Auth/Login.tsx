import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch {
      const errorMessage = 'Invalid credentials';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'delegate@mun.com', role: 'Delegate', password: 'IamJohn1!@#' },
    { email: 'dev@mun.com', role: 'Dev Admin', password: 'IamDev1!@#' },
    { email: 'affairs@mun.com', role: 'Delegate Affairs', password: 'IamDelegate1!@#' },
    { email: 'frontdesk@mun.com', role: 'Front Desk Admin', password: 'IamFront1!@#' },
    { email: 'director@mun.com', role: 'Committee Director', password: 'IamCommittee1!@#' },
    { email: 'hospitality@mun.com', role: 'Hospitality Admin', password: 'IamHospitality1!@#' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8"
        >
          <div>
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white">
                <img
                  src="/logo.png"
                  alt="K-MUN 2025 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-blue-800 hover:text-blue-900"
              >
                Register for Kumaraguru MUN 2025
              </Link>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Notification Above Demo Accounts */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              Please login using credentials sent through E-Mail
            </div>

            {/* Demo Accounts */}
            <div className="mb-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="text-sm font-medium text-primary-900 mb-2">Demo Accounts:</h3>
              <div className="space-y-1 text-xs text-primary-800">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{account.role}:</span>
                    <span className="font-mono">{account.email}</span>
                  </div>
                ))}
                <div className="text-center mt-2 text-primary-600">
                  Password: <span className="font-mono">kmun2025</span> (or use format above)
                </div>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your password"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-900 hover:bg-primary-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;