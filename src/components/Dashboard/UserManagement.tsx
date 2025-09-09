import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  RefreshCw,
  Save,
  X,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Mail,
  UserPlus,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { usersAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface User {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  institution?: string;
  grade?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  grade: string;
  role: string;
  password: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    grade: '',
    role: 'PARTICIPANT',
    password: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const roles = [
    'PARTICIPANT',
    'DELEGATE',
    'COMMITTEE_DIRECTOR',
    'DELEGATE_AFFAIRS',
    'HOSPITALITY_ADMIN',
    'FRONT_DESK_ADMIN',
    'DEV_ADMIN',
    'SOFTWARE_ADMIN',
    'REGISTRATION_ADMIN',
    'ALLOCATION_ADMIN',
    'EXECUTIVE_BOARD'
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll();
      console.log('Users API Response:', response);
      
      if (response.success) {
        const usersData = response.data || [];
        setUsers(usersData);
      } else {
        throw new Error(response.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(`Failed to load users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      institution: '',
      grade: '',
      role: 'PARTICIPANT',
      password: ''
    });
    setShowAddForm(false);
    setShowEditForm(false);
    setEditingUser(null);
  };

  const resetPasswordForm = () => {
    setPasswordData({
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
    setEditingUser(null);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Password is required');
      return;
    }

    try {
      setSaving(true);
      const response = await usersAPI.create(formData);

      if (response.success) {
        toast.success('User created successfully');
        resetForm();
        fetchUsers();
      } else {
        throw new Error(response.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(`Failed to create user: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      institution: user.institution || '',
      grade: user.grade || '',
      role: user.role,
      password: ''
    });
    setShowEditForm(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) {
      toast.error('No user selected for editing');
      return;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      const updateData = { ...formData };
      if (!updateData.password.trim()) {
        delete updateData.password; // Don't update password if empty
      }
      
      const response = await usersAPI.update(editingUser.id, updateData);

      if (response.success) {
        toast.success('User updated successfully');
        resetForm();
        fetchUsers();
      } else {
        throw new Error(response.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(`Failed to update user: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to deactivate this user? They will be blocked from accessing the system.')) {
      return;
    }

    try {
      setSaving(true);
      const response = await usersAPI.delete(userId);

      if (response.success) {
        toast.success('User deactivated successfully');
        fetchUsers();
      } else {
        throw new Error(response.message || 'Failed to deactivate user');
      }
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast.error(`Failed to deactivate user: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      setSaving(true);
      const response = await usersAPI.update(user.id, {
        isActive: !user.isActive
      });

      if (response.success) {
        toast.success(`User ${user.isActive ? 'blocked' : 'unblocked'} successfully`);
        fetchUsers();
      } else {
        throw new Error(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(`Failed to update user status: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = (user: User) => {
    setEditingUser(user);
    setShowPasswordForm(true);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingUser) {
      toast.error('No user selected');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setSaving(true);
      const response = await usersAPI.changePassword(editingUser.id, passwordData.newPassword);

      if (response.success) {
        toast.success('Password updated successfully');
        resetPasswordForm();
      } else {
        throw new Error(response.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.institution && user.institution.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'blocked' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    const colors: { [key: string]: string } = {
      'PARTICIPANT': 'bg-blue-100 text-blue-800',
      'DELEGATE': 'bg-green-100 text-green-800',
      'COMMITTEE_DIRECTOR': 'bg-purple-100 text-purple-800',
      'DELEGATE_AFFAIRS': 'bg-orange-100 text-orange-800',
      'HOSPITALITY_ADMIN': 'bg-pink-100 text-pink-800',
      'FRONT_DESK_ADMIN': 'bg-indigo-100 text-indigo-800',
      'DEV_ADMIN': 'bg-red-100 text-red-800',
      'SOFTWARE_ADMIN': 'bg-gray-100 text-gray-800',
      'REGISTRATION_ADMIN': 'bg-yellow-100 text-yellow-800',
      'ALLOCATION_ADMIN': 'bg-teal-100 text-teal-800',
      'EXECUTIVE_BOARD': 'bg-amber-100 text-amber-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">User Management</h3>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchUsers}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.isActive).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blocked Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => !u.isActive).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Admin Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role.includes('ADMIN')).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#172d9d] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.userId || user.id.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.institution || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.grade || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 transition-colors flex items-center"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleChangePassword(user)}
                        className="text-purple-600 hover:text-purple-900 transition-colors flex items-center"
                        title="Change password"
                      >
                        <Lock className="w-4 h-4 mr-1" />
                        Password
                      </button>
                      <button
                        onClick={() => handleToggleUserStatus(user)}
                        className={`transition-colors flex items-center ${
                          user.isActive 
                            ? 'text-red-600 hover:text-red-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={user.isActive ? 'Block user' : 'Unblock user'}
                      >
                        {user.isActive ? (
                          <>
                            <Lock className="w-4 h-4 mr-1" />
                            Block
                          </>
                        ) : (
                          <>
                            <Unlock className="w-4 h-4 mr-1" />
                            Unblock
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors flex items-center"
                        title="Deactivate user"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade
                    </label>
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => handleInputChange('grade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Creating...' : 'Create User'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{role.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade
                    </label>
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => handleInputChange('grade', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password (leave empty to keep current)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Updating...' : 'Update User'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={resetPasswordForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetPasswordForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                    <span>{saving ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

