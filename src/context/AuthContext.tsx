import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-7rnp.onrender.com';

// API service functions
const apiService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    return response.json();
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication token
    const token = localStorage.getItem('munToken');
    if (token) {
      // Verify token and get user profile
      apiService.getProfile(token)
        .then((data) => {
          if (data.success) {
            setUser(data.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('munToken');
          }
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('munToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const loadingToast = toast.loading('Signing in...');
    
    try {
      const data = await apiService.login(email, password);
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('munToken', data.token);
        localStorage.setItem('munUser', JSON.stringify(data.user));
        toast.success('Login successful! Redirecting to dashboard...', { 
          id: loadingToast,
          duration: 3000 
        });
      } else {
        toast.error(data.message || 'Login failed', { id: loadingToast });
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed', { id: loadingToast });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('munToken');
    localStorage.removeItem('munUser');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};