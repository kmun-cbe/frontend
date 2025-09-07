import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Building, 
  Search,
  Filter,
  RefreshCw,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { committeesAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { useFormOpenScroll } from '@/hooks/useScrollToTop';
import { useAuth } from '@/context/AuthContext';

interface Committee {
  id: string;
  name: string;
  description: string;
  institutionType: string;
  portfolios: Portfolio[];
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  capacity: number;
  registered: number;
  createdAt?: string;
  isActive?: boolean;
}

const PortfolioManager: React.FC = () => {
  const { user } = useAuth();
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    fetchCommittees();
  }, []);

  useEffect(() => {
    if (selectedCommittee) {
      setPortfolios(selectedCommittee.portfolios || []);
    }
  }, [selectedCommittee]);

  // Scroll to top when form is opened
  useFormOpenScroll(showAddForm, '.portfolio-form-container');

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      const response = await committeesAPI.getAll();
      console.log('Committees API Response:', response); // Debug log
      
      if (response.success) {
        // Handle nested data structure from backend
        const committeesData = response.data || [];
        setCommittees(committeesData);
        if (committeesData.length > 0 && !selectedCommittee) {
          setSelectedCommittee(committeesData[0]);
        }
      } else {
        throw new Error(response.message || 'Failed to fetch committees');
      }
    } catch (error) {
      console.error('Error fetching committees:', error);
      toast.error(`Failed to load committees: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCommitteeSelect = (committee: Committee) => {
    setSelectedCommittee(committee);
    setShowAddForm(false);
    setEditingPortfolio(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: ''
    });
    setEditingPortfolio(null);
    setShowAddForm(false);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      name: portfolio.name
    });
    setShowAddForm(true);
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommittee) {
      toast.error('Please select a committee first');
      return;
    }

    // Check if user has permission to add portfolios
    if (user?.role !== 'DEV_ADMIN') {
      toast.error('You do not have permission to add portfolios. Only Dev Admins can perform this action.');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Please enter a portfolio name');
      return;
    }

    if (formData.name.trim().length < 3) {
      toast.error('Portfolio name must be at least 3 characters long');
      return;
    }

    if (formData.name.trim().length > 100) {
      toast.error('Portfolio name must be less than 100 characters');
      return;
    }

    try {
      setSaving(true);
      const response = await committeesAPI.addPortfolio(selectedCommittee.id, {
        name: formData.name.trim()
      });

      if (response.success) {
        toast.success('Portfolio added successfully');
        
        // Update local state immediately for real-time UI update
        const newPortfolio = response.data;
        console.log('New portfolio added:', newPortfolio);
        if (newPortfolio && selectedCommittee) {
          const updatedPortfolios = [...portfolios, newPortfolio];
          console.log('Updated portfolios:', updatedPortfolios);
          setPortfolios(updatedPortfolios);
          
          // Update the selected committee in the committees array
          const updatedCommittees = committees.map(committee => 
            committee.id === selectedCommittee.id 
              ? { ...committee, portfolios: updatedPortfolios }
              : committee
          );
          setCommittees(updatedCommittees);
          setSelectedCommittee({ ...selectedCommittee, portfolios: updatedPortfolios });
          console.log('Updated selected committee:', { ...selectedCommittee, portfolios: updatedPortfolios });
        }
        
        resetForm();
      } else {
        throw new Error(response.message || 'Failed to add portfolio');
      }
    } catch (error) {
      console.error('Error adding portfolio:', error);
      const errorMessage = error.message || 'Failed to add portfolio';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommittee || !editingPortfolio) {
      toast.error('Invalid portfolio selection');
      return;
    }

    // Check if user has permission to update portfolios
    if (user?.role !== 'DEV_ADMIN') {
      toast.error('You do not have permission to update portfolios. Only Dev Admins can perform this action.');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Please enter a portfolio name');
      return;
    }

    if (formData.name.trim().length < 3) {
      toast.error('Portfolio name must be at least 3 characters long');
      return;
    }

    if (formData.name.trim().length > 100) {
      toast.error('Portfolio name must be less than 100 characters');
      return;
    }

    try {
      setSaving(true);
      const response = await committeesAPI.updatePortfolio(
        selectedCommittee.id, 
        editingPortfolio.id,
        {
          name: formData.name.trim()
        }
      );

      if (response.success) {
        toast.success('Portfolio updated successfully');
        
        // Update local state immediately for real-time UI update
        const updatedPortfolio = response.data;
        if (updatedPortfolio && selectedCommittee) {
          const updatedPortfolios = portfolios.map(portfolio => 
            portfolio.id === editingPortfolio.id 
              ? { ...portfolio, name: updatedPortfolio.name }
              : portfolio
          );
          setPortfolios(updatedPortfolios);
          
          // Update the selected committee in the committees array
          const updatedCommittees = committees.map(committee => 
            committee.id === selectedCommittee.id 
              ? { ...committee, portfolios: updatedPortfolios }
              : committee
          );
          setCommittees(updatedCommittees);
          setSelectedCommittee({ ...selectedCommittee, portfolios: updatedPortfolios });
        }
        
        resetForm();
      } else {
        throw new Error(response.message || 'Failed to update portfolio');
      }
    } catch (error) {
      console.error('Error updating portfolio:', error);
      const errorMessage = error.message || 'Failed to update portfolio';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!selectedCommittee) {
      toast.error('No committee selected');
      return;
    }

    // Check if user has permission to delete portfolios
    if (user?.role !== 'DEV_ADMIN') {
      toast.error('You do not have permission to delete portfolios. Only Dev Admins can perform this action.');
      return;
    }

    if (!confirm('Are you sure you want to delete this portfolio? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      const response = await committeesAPI.deletePortfolio(selectedCommittee.id, portfolioId);

      if (response.success) {
        toast.success('Portfolio deleted successfully');
        
        // Update local state immediately for real-time UI update
        if (selectedCommittee) {
          const updatedPortfolios = portfolios.filter(portfolio => portfolio.id !== portfolioId);
          setPortfolios(updatedPortfolios);
          
          // Update the selected committee in the committees array
          const updatedCommittees = committees.map(committee => 
            committee.id === selectedCommittee.id 
              ? { ...committee, portfolios: updatedPortfolios }
              : committee
          );
          setCommittees(updatedCommittees);
          setSelectedCommittee({ ...selectedCommittee, portfolios: updatedPortfolios });
        }
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error('Failed to delete portfolio');
    } finally {
      setSaving(false);
    }
  };

  // Filter committees
  const filteredCommittees = committees.filter(committee => {
    const matchesSearch = committee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || committee.institutionType === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredPortfolios = portfolios.filter(portfolio => {
    return portfolio.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio manager...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Portfolio Manager</h3>
          <p className="text-gray-600">Manage portfolios for each committee</p>
        </div>
        <button
          onClick={fetchCommittees}
          className="flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Committee Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Committee</h4>
            
            {/* Search and Filter */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search committees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="both">Both School & College</option>
              </select>
            </div>

            {/* Committee List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCommittees.map((committee) => (
                <button
                  key={committee.id}
                  onClick={() => handleCommitteeSelect(committee)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCommittee?.id === committee.id
                      ? 'bg-[#172d9d] text-white border-[#172d9d]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">{committee.name}</h5>
                      <p className="text-sm opacity-75">
                        {committee.institutionType === 'both' ? 'School & College' : committee.institutionType} • {committee.portfolios?.length || 0} portfolios
                      </p>
                    </div>
                    <Building className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Management */}
        <div className="lg:col-span-2">
          {selectedCommittee ? (
            <div className="space-y-6">
              {/* Committee Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedCommittee.name}</h4>
                    <p className="text-gray-600">{selectedCommittee.description}</p>
                  </div>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Portfolio</span>
                  </button>
                </div>

                {/* Portfolio Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-600">Total Portfolios</p>
                        <p className="text-xl font-bold text-blue-900">{portfolios.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">Committee Capacity</p>
                        <p className="text-xl font-bold text-green-900">
                          {selectedCommittee.capacity || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add/Edit Portfolio Form */}
              {showAddForm && (
                <div className="bg-white rounded-lg shadow-sm p-6 portfolio-form-container">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-gray-900">
                      {editingPortfolio ? 'Edit Portfolio' : 'Add New Portfolio'}
                    </h5>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={editingPortfolio ? handleUpdatePortfolio : handleAddPortfolio} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                        placeholder="Enter portfolio name"
                        required
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {saving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>{editingPortfolio ? 'Update' : 'Add'} Portfolio</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Portfolio List */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h5 className="text-lg font-semibold text-gray-900">Portfolios</h5>
                    <div className="text-sm text-gray-500">
                      {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {portfolios.map((portfolio) => (
                    <div key={portfolio.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h6 className="text-lg font-medium text-gray-900">{portfolio.name}</h6>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Active
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Created: {portfolio.createdAt ? new Date(portfolio.createdAt).toLocaleDateString() : 'N/A'}</span>
                            <span>Status: {portfolio.isActive !== undefined ? (portfolio.isActive ? 'Active' : 'Inactive') : 'Unknown'}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit portfolio"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(portfolio.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete portfolio"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {portfolios.length === 0 && (
                    <div className="p-8 text-center">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <h6 className="text-lg font-medium text-gray-900 mb-2">No Portfolios Yet</h6>
                      <p className="text-gray-600 mb-4">This committee doesn't have any portfolios yet.</p>
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center space-x-2 bg-[#172d9d] text-white px-4 py-2 rounded-lg hover:bg-[#1a2a8a] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add First Portfolio</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Building className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Select a Committee</h4>
              <p className="text-gray-600">Choose a committee from the left panel to manage its portfolios.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;
