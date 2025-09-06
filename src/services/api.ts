// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('munToken');
};

// Helper function to make authenticated requests
const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  },

  getProfile: async () => {
    return authenticatedFetch('/api/auth/profile');
  },

  updateProfile: async (data: any) => {
    return authenticatedFetch('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return authenticatedFetch('/api/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Registration API
export const registrationAPI = {
  create: async (data: FormData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/registrations`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getAll: async () => {
    return authenticatedFetch('/api/registrations');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/api/registrations/${id}`);
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/api/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/api/registrations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Committees API
export const committeesAPI = {
  getAll: async () => {
    return authenticatedFetch('/api/committees');
  },

  getFeatured: async () => {
    return authenticatedFetch('/api/committees/featured');
  },

  getByInstitutionType: async (institutionType: string) => {
    return authenticatedFetch(`/api/committees/institution/${institutionType}`);
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/api/committees/${id}`);
  },

  create: async (data: any) => {
    return authenticatedFetch('/api/committees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/api/committees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/api/committees/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return authenticatedFetch('/api/committees/stats');
  },

  // Portfolio Management
  getPortfolios: async (committeeId: string) => {
    return authenticatedFetch(`/api/committees/${committeeId}/portfolios`);
  },

  addPortfolio: async (committeeId: string, data: any) => {
    return authenticatedFetch(`/api/committees/${committeeId}/portfolios`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updatePortfolio: async (committeeId: string, portfolioId: string, data: any) => {
    return authenticatedFetch(`/api/committees/${committeeId}/portfolios/${portfolioId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePortfolio: async (committeeId: string, portfolioId: string) => {
    return authenticatedFetch(`/api/committees/${committeeId}/portfolios/${portfolioId}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return authenticatedFetch('/api/users');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/api/users/${id}`);
  },

  create: async (data: any) => {
    return authenticatedFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  changePassword: async (id: string, newPassword: string) => {
    return authenticatedFetch(`/api/users/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify({ password: newPassword }),
    });
  },
};

// Pricing API
export const pricingAPI = {
  get: async () => {
    return authenticatedFetch('/api/pricing');
  },

  update: async (data: any) => {
    return authenticatedFetch('/api/pricing', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Payments API
export const paymentsAPI = {
  createOrder: async (data: {
    userId: string;
    registrationId?: string;
    amount: number;
    currency?: string;
  }) => {
    return authenticatedFetch('/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  verifyPayment: async (data: {
    paymentId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    return authenticatedFetch('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.userId) queryParams.append('userId', params.userId);
    
    const url = `/api/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return authenticatedFetch(url);
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/api/payments/${id}`);
  },

  getStats: async () => {
    return authenticatedFetch('/api/payments/stats');
  },

  getTransactionLogs: async (params?: {
    page?: number;
    limit?: number;
    action?: string;
    userId?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.action) queryParams.append('action', params.action);
    if (params?.userId) queryParams.append('userId', params.userId);
    
    const url = `/api/payments/logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return authenticatedFetch(url);
  },

  refund: async (paymentId: string, data: {
    amount: number;
    reason: string;
  }) => {
    return authenticatedFetch(`/api/payments/${paymentId}/refund`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Dashboard Stats API
export const dashboardAPI = {
  getStats: async () => {
    return authenticatedFetch('/api/dashboard/stats');
  },

  getRecentActivity: async () => {
    return authenticatedFetch('/api/dashboard/activity');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },
};

// Contact API
export const contactAPI = {
  submit: async (data: any) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit contact form');
    }

    return response.json();
  },

  getAll: async () => {
    return authenticatedFetch('/api/contact');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/api/contact/${id}`);
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/api/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/api/contact/${id}`, {
      method: 'DELETE',
    });
  },
};

// Popup API
export const popupAPI = {
  get: async () => {
    return authenticatedFetch('/api/popups');
  },
  getActive: async () => {
    const response = await fetch('/api/popups/active');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  update: async (data: any) => {
    return authenticatedFetch('/api/popups', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  toggle: async (isActive: boolean) => {
    return authenticatedFetch('/api/popups/toggle', {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  },
};

// Mailer API
export const mailerAPI = {
  sendBulkEmail: async (data: {
    recipientType: 'registrants' | 'single';
    recipients?: string[];
    singleEmail?: string;
    emailProvider: 'gmail' | 'outlook';
    subject: string;
    message: string;
  }) => {
    return authenticatedFetch('/api/mailer/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getRecipients: async (committee?: string) => {
    const url = committee ? `/api/mailer/recipients?committee=${committee}` : '/api/mailer/recipients';
    return authenticatedFetch(url);
  },

  getStats: async () => {
    return authenticatedFetch('/api/mailer/stats');
  },

  sendTestEmail: async (data: {
    email: string;
    subject: string;
    message: string;
  }) => {
    return authenticatedFetch('/api/mailer/test', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
