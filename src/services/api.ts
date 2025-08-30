// API service for backend communication
const API_BASE_URL = '/api';

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

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
    return authenticatedFetch('/auth/profile');
  },

  updateProfile: async (data: any) => {
    return authenticatedFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    return authenticatedFetch('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Registration API
export const registrationAPI = {
  create: async (data: any) => {
    return authenticatedFetch('/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return authenticatedFetch('/registrations');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/registrations/${id}`);
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/registrations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/registrations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Committees API
export const committeesAPI = {
  getAll: async () => {
    return authenticatedFetch('/committees');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/committees/${id}`);
  },

  create: async (data: any) => {
    return authenticatedFetch('/committees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/committees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/committees/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return authenticatedFetch('/committees/stats');
  },

  // Portfolio Management
  getPortfolios: async (committeeId: string) => {
    return authenticatedFetch(`/committees/${committeeId}/portfolios`);
  },

  addPortfolio: async (committeeId: string, data: any) => {
    return authenticatedFetch(`/committees/${committeeId}/portfolios`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updatePortfolio: async (committeeId: string, portfolioId: string, data: any) => {
    return authenticatedFetch(`/committees/${committeeId}/portfolios/${portfolioId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePortfolio: async (committeeId: string, portfolioId: string) => {
    return authenticatedFetch(`/committees/${committeeId}/portfolios/${portfolioId}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return authenticatedFetch('/users');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/users/${id}`);
  },

  create: async (data: any) => {
    return authenticatedFetch('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Pricing API
export const pricingAPI = {
  get: async () => {
    return authenticatedFetch('/pricing');
  },

  update: async (data: any) => {
    return authenticatedFetch('/pricing', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Payments API
export const paymentsAPI = {
  getAll: async () => {
    return authenticatedFetch('/payments');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/payments/${id}`);
  },

  create: async (data: any) => {
    return authenticatedFetch('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

// Dashboard Stats API
export const dashboardAPI = {
  getStats: async () => {
    return authenticatedFetch('/dashboard/stats');
  },

  getRecentActivity: async () => {
    return authenticatedFetch('/dashboard/activity');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
};

// Contact API
export const contactAPI = {
  submit: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
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
    return authenticatedFetch('/contact');
  },

  getById: async (id: string) => {
    return authenticatedFetch(`/contact/${id}`);
  },

  update: async (id: string, data: any) => {
    return authenticatedFetch(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return authenticatedFetch(`/contact/${id}`, {
      method: 'DELETE',
    });
  },
};

// Popup API
export const popupAPI = {
  get: async () => {
    return authenticatedFetch('/popups');
  },
  getActive: async () => {
    return fetch(`${API_BASE_URL}/popups/active`);
  },
  update: async (data: any) => {
    return authenticatedFetch('/popups', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  toggle: async (isActive: boolean) => {
    return authenticatedFetch('/popups/toggle', {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  },
};
