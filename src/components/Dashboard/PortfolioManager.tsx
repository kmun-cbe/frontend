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
import { committeesAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { useFormOpenScroll } from '../../hooks/useScrollToTop';

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
}

const PortfolioManager: React.FC = () => {
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
    name: '',
    description: '',
    capacity: ''
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
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      capacity: ''
    });
    setShowAddForm(false);
    setEditingPortfolio(null);
  };

  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommittee) {
      toast.error('Please select a committee first');
      return;
    }

    if (!formData.name.trim() || !formData.description.trim() || !formData.capacity) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      const response = await committeesAPI.addPortfolio(selectedCommittee.id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        capacity: parseInt(formData.capacity)
      });

      if (response.success) {
        toast.success('Portfolio added successfully');
        resetForm();
        fetchCommittees(); // Refresh to get updated data
      }
    } catch (error) {
      console.error('Error adding portfolio:', error);
      toast.error('Failed to add portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      name: portfolio.name,
      description: portfolio.description,
      capacity: portfolio.capacity.toString()
    });
    setShowAddForm(true);
  };

  const handleUpdatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommittee || !editingPortfolio) {
      toast.error('Invalid portfolio selection');
      return;
    }

    if (!formData.name.trim() || !formData.description.trim() || !formData.capacity) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      const response = await committeesAPI.updatePortfolio(
        selectedCommittee.id, 
        editingPortfolio.id,
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          capacity: parseInt(formData.capacity)
        }
      );

      if (response.success) {
        toast.success('Portfolio updated successfully');
        resetForm();
        fetchCommittees(); // Refresh to get updated data
      }
    } catch (error) {
      console.error('Error updating portfolio:', error);
      toast.error('Failed to update portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!selectedCommittee) {
      toast.error('Please select a committee first');
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
        fetchCommittees(); // Refresh to get updated data
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      toast.error('Failed to delete portfolio');
    } finally {
      setSaving(false);
    }
  };

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
                        {committee.institutionType === 'both' ? 'School & College' : committee.institutionType.toUpperCase()} • {committee.portfolios?.length || 0} portfolios
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

                {/* Portfolio Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
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
                        <p className="text-sm text-green-600">Total Capacity</p>
                        <p className="text-xl font-bold text-green-900">
                          {portfolios.reduce((sum, p) => sum + p.capacity, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-orange-600">Registered</p>
                        <p className="text-xl font-bold text-orange-900">
                          {portfolios.reduce((sum, p) => sum + p.registered, 0)}
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
                        Portfolio Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                        placeholder="Enter portfolio name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                        placeholder="Enter portfolio description"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capacity *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
                        placeholder="Enter capacity"
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
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
                        <span>{editingPortfolio ? 'Update' : 'Add'} Portfolio</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Portfolio List */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h5 className="text-lg font-semibold text-gray-900">Portfolios</h5>
                </div>

                {filteredPortfolios.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredPortfolios.map((portfolio) => (
                      <div key={portfolio.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h6 className="text-lg font-medium text-gray-900">{portfolio.name}</h6>
                            <p className="text-gray-600 mt-1">{portfolio.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-500">
                                Capacity: {portfolio.capacity}
                              </span>
                              <span className="text-sm text-gray-500">
                                Registered: {portfolio.registered}
                              </span>
                              <span className="text-sm text-gray-500">
                                Available: {portfolio.capacity - portfolio.registered}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditPortfolio(portfolio)}
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
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No portfolios found for this committee.</p>
                    <p className="text-sm">Click "Add Portfolio" to create the first one.</p>
                  </div>
                )}
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

                        {committee.institutionType} • {committee.portfolios?.length || 0} portfolios

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



                {/* Portfolio Stats */}

                <div className="grid grid-cols-3 gap-4 mb-6">

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

                        <p className="text-sm text-green-600">Total Capacity</p>

                        <p className="text-xl font-bold text-green-900">

                          {portfolios.reduce((sum, p) => sum + p.capacity, 0)}

                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">

                    <div className="flex items-center space-x-2">

                      <AlertCircle className="w-5 h-5 text-orange-600" />

                      <div>

                        <p className="text-sm text-orange-600">Registered</p>

                        <p className="text-xl font-bold text-orange-900">

                          {portfolios.reduce((sum, p) => sum + p.registered, 0)}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>



              {/* Add/Edit Portfolio Form */}

              {showAddForm && (

                <div className="bg-white rounded-lg shadow-sm p-6">

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

                        Portfolio Name *

                      </label>

                      <input

                        type="text"

                        value={formData.name}

                        onChange={(e) => handleInputChange('name', e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"

                        placeholder="Enter portfolio name"

                        required

                      />

                    </div>



                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">

                        Description *

                      </label>

                      <textarea

                        value={formData.description}

                        onChange={(e) => handleInputChange('description', e.target.value)}

                        rows={3}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"

                        placeholder="Enter portfolio description"

                        required

                      />

                    </div>



                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">

                        Capacity *

                      </label>

                      <input

                        type="number"

                        min="1"

                        value={formData.capacity}

                        onChange={(e) => handleInputChange('capacity', e.target.value)}

                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"

                        placeholder="Enter capacity"

                        required

                      />

                    </div>



                    <div className="flex justify-end space-x-3">

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

                        <span>{editingPortfolio ? 'Update' : 'Add'} Portfolio</span>

                      </button>

                    </div>

                  </form>

                </div>

              )}



              {/* Portfolio List */}

              <div className="bg-white rounded-lg shadow-sm">

                <div className="p-6 border-b border-gray-200">

                  <h5 className="text-lg font-semibold text-gray-900">Portfolios</h5>

                </div>



                {filteredPortfolios.length > 0 ? (

                  <div className="divide-y divide-gray-200">

                    {filteredPortfolios.map((portfolio) => (

                      <div key={portfolio.id} className="p-6">

                        <div className="flex items-center justify-between">

                          <div className="flex-1">

                            <h6 className="text-lg font-medium text-gray-900">{portfolio.name}</h6>

                            <p className="text-gray-600 mt-1">{portfolio.description}</p>

                            <div className="flex items-center space-x-4 mt-2">

                              <span className="text-sm text-gray-500">

                                Capacity: {portfolio.capacity}

                              </span>

                              <span className="text-sm text-gray-500">

                                Registered: {portfolio.registered}

                              </span>

                              <span className="text-sm text-gray-500">

                                Available: {portfolio.capacity - portfolio.registered}

                              </span>

                            </div>

                          </div>

                          <div className="flex items-center space-x-2">

                            <button

                              onClick={() => handleEditPortfolio(portfolio)}

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

                  </div>

                ) : (

                  <div className="p-6 text-center text-gray-500">

                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />

                    <p>No portfolios found for this committee.</p>

                    <p className="text-sm">Click "Add Portfolio" to create the first one.</p>

                  </div>

                )}

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


