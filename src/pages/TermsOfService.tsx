import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-16 px-4">
      <article className="prose prose-lg max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-700 leading-8">
          These Terms of Service ("Terms") govern your participation in Kumaraguru Model United Nations 2025 and your
          use of our website. By registering or using our services, you agree to be bound by these Terms. If you do not
          agree, please do not proceed with registration or use our services.
        </p>
        <p className="text-gray-700 leading-8 mt-6">
          You must provide accurate information during registration and comply with all conference rules and delegate
          guidelines. Fees must be paid within the specified timeframe. Cancellations and refunds are handled according
          to our refund policy. We may modify these Terms at any time, and your continued participation constitutes
          acceptance of any changes.
        </p>
        <p className="text-gray-700 leading-8 mt-6">
          We are not responsible for events beyond our control. Participants are responsible for their travel and
          accommodation. For any questions regarding these Terms, please contact legal@kumaraguruMUN.com.
        </p>
      </article>
    </div>
  );
};

export default TermsOfService;