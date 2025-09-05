import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Users, 
  User, 
  Send, 
  Eye, 
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { mailerAPI } from '../../services/api';

interface MailerProps {
  committees?: Array<{ id: string; name: string }>;
  onSend?: (emailData: EmailData) => Promise<void>;
}

interface EmailData {
  recipientType: 'registrants' | 'single';
  recipients: string[];
  singleEmail?: string;
  emailProvider: 'gmail' | 'outlook';
  subject: string;
  message: string;
}

const Mailer: React.FC<MailerProps> = ({ 
  committees = [
    { id: 'all', name: 'All Registrants' },
    { id: 'unsc', name: 'UNSC Applicants' },
    { id: 'unodc', name: 'UNODC Applicants' },
    { id: 'lok_sabha', name: 'Lok Sabha Applicants' },
    { id: 'ccc', name: 'CCC Applicants' },
    { id: 'ipc', name: 'IPC Applicants' },
    { id: 'disec', name: 'DISEC Applicants' }
  ],
  onSend
}) => {
  const [recipientType, setRecipientType] = useState<'registrants' | 'single'>('registrants');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>(['all']);
  const [singleEmail, setSingleEmail] = useState('');
  const [emailProvider, setEmailProvider] = useState<'gmail' | 'outlook'>('gmail');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRecipientChange = (recipientId: string) => {
    if (recipientId === 'all') {
      setSelectedRecipients(['all']);
    } else {
      setSelectedRecipients(prev => {
        const filtered = prev.filter(r => r !== 'all');
        if (filtered.includes(recipientId)) {
          return filtered.filter(r => r !== recipientId);
        } else {
          return [...filtered, recipientId];
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (recipientType === 'single' && !singleEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (recipientType === 'registrants' && selectedRecipients.length === 0) {
      toast.error('Please select at least one recipient group');
      return;
    }

    setIsLoading(true);

    try {
      const emailData: EmailData = {
        recipientType,
        recipients: recipientType === 'single' ? [singleEmail] : selectedRecipients,
        singleEmail: recipientType === 'single' ? singleEmail : undefined,
        emailProvider,
        subject,
        message
      };

      if (onSend) {
        await onSend(emailData);
      } else {
        // Use the mailer API
        const result = await mailerAPI.sendBulkEmail(emailData);
        if (!result.success) {
          throw new Error(result.message || 'Failed to send email');
        }
      }

      setShowSuccessModal(true);
      toast.success('Email sent successfully!');
      
      // Reset form
      setSubject('');
      setMessage('');
      setSingleEmail('');
      setSelectedRecipients(['all']);
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error('Please fill in subject and message to preview');
      return;
    }
    setShowPreview(true);
  };

  const getRecipientDisplay = () => {
    if (recipientType === 'single') {
      return singleEmail || 'No email entered';
    }
    
    if (selectedRecipients.includes('all')) {
      return 'All Registrants';
    }
    
    const selectedNames = selectedRecipients.map(id => 
      committees.find(c => c.id === id)?.name || id
    );
    
    return selectedNames.length > 0 ? selectedNames.join(', ') : 'No recipients selected';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Mailer</h3>
        <p className="text-gray-600">Send emails to registrants or individual recipients</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Type Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setRecipientType('registrants')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              recipientType === 'registrants'
                ? 'bg-white text-[#172d9d] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Send to Registrants</span>
          </button>
          <button
            type="button"
            onClick={() => setRecipientType('single')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
              recipientType === 'single'
                ? 'bg-white text-[#172d9d] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Send to Single Person</span>
          </button>
        </div>

        {/* Recipients Section */}
        {recipientType === 'registrants' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Select Recipients
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {committees.map((committee) => (
                <label
                  key={committee.id}
                  className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedRecipients.includes(committee.id)}
                    onChange={() => handleRecipientChange(committee.id)}
                    className="w-4 h-4 text-[#172d9d] border-gray-300 rounded focus:ring-[#172d9d]"
                  />
                  <span className="text-sm text-gray-700">{committee.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Single Email Section */}
        {recipientType === 'single' && (
          <div className="space-y-2">
            <label htmlFor="singleEmail" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="singleEmail"
              value={singleEmail}
              onChange={(e) => setSingleEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
              required={recipientType === 'single'}
            />
          </div>
        )}

        {/* Email Provider */}
        <div className="space-y-2">
          <label htmlFor="emailProvider" className="block text-sm font-medium text-gray-700">
            Email Provider
          </label>
          <select
            id="emailProvider"
            value={emailProvider}
            onChange={(e) => setEmailProvider(e.target.value as 'gmail' | 'outlook')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
          >
            <option value="gmail">Gmail</option>
            <option value="outlook">Outlook</option>
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent"
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message *
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            placeholder="Enter your message here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:border-transparent resize-vertical"
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 flex items-center justify-center space-x-2 bg-[#172d9d] text-white py-3 px-6 rounded-md hover:bg-[#1a2a8a] focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Email</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      </form>

      {/* Email Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#172d9d]" />
                <h3 className="text-lg font-semibold text-gray-900">Email Preview</h3>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">To:</span>
                  <span className="text-gray-900">{getRecipientDisplay()}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">Subject:</span>
                  <span className="text-gray-900">{subject}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900">{message}</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center space-x-2 bg-[#172d9d] text-white py-2 px-4 rounded-md hover:bg-[#1a2a8a] focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Sent Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Your email has been sent to {getRecipientDisplay()}.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#172d9d] text-white py-2 px-4 rounded-md hover:bg-[#1a2a8a] focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Mailer;
