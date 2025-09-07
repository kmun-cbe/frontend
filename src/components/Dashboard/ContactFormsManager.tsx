import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { contactAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved' | 'archived';
  submittedAt: string;
  resolvedAt?: string;
  notes?: string;
}

const ContactFormsManager: React.FC = () => {
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      if (response.success) {
        setContacts(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact forms');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string, notes?: string) => {
    try {
      setUpdating(true);
      const response = await contactAPI.update(id, { status, notes });
      if (response.success) {
        setContacts(prev => prev.map(contact => 
          contact.id === id 
            ? { ...contact, status, notes, resolvedAt: status === 'resolved' ? new Date().toISOString() : contact.resolvedAt }
            : contact
        ));
        toast.success(`Contact ${status} successfully`);
        setShowModal(false);
        setSelectedContact(null);
        setNotes('');
      } else {
        throw new Error(response.message || 'Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact form?')) {
      try {
        const response = await contactAPI.delete(id);
        if (response.success) {
          setContacts(prev => prev.filter(contact => contact.id !== id));
          toast.success('Contact form deleted successfully');
        } else {
          throw new Error(response.message || 'Failed to delete contact');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact form');
      }
    }
  };

  const openModal = (contact: ContactForm) => {
    setSelectedContact(contact);
    setNotes(contact.notes || '');
    setShowModal(true);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <XCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#172d9d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Forms Manager</h3>
            <p className="text-sm text-gray-600">Manage and respond to contact form submissions</p>
          </div>
          <button
            onClick={fetchContacts}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-[#172d9d] bg-[#172d9d]/10 rounded-lg hover:bg-[#172d9d]/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#172d9d] focus:border-[#172d9d]"
            />
          </div>
          <div className="relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#172d9d] focus:border-[#172d9d]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <XCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.filter(c => c.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{contact.subject}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1 capitalize">{contact.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(contact.submittedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(contact)}
                          className="text-[#172d9d] hover:text-[#0f1a4a] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || statusFilter !== 'all' ? 'No contacts match your filters' : 'No contact forms found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Form Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{selectedContact.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <p className="text-gray-900">{selectedContact.subject}</p>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#172d9d] focus:border-[#172d9d]"
                    placeholder="Add notes about this contact..."
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusUpdate(selectedContact.id, 'resolved', notes)}
                    disabled={updating}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Resolved</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedContact.id, 'archived', notes)}
                    disabled={updating}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Archive</span>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedContact.id, 'pending', notes)}
                    disabled={updating}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Mark as Pending</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactFormsManager;
