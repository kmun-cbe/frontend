import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-16 px-4">
      <article className="prose prose-lg max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 leading-8">
          Kumaraguru Model United Nations ("we," "our," or "us") is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
          website and register for our conference. By using this site, you agree to the practices described herein.
        </p>
        <p className="text-gray-700 leading-8 mt-6">
          We collect personal and educational information necessary to process your registration and to communicate
          important updates. We may also collect usage data to improve our services. We do not sell your data. Any
          sharing is limited to essential services such as payment processing and committee allocation, or as
          required by law.
        </p>
        <p className="text-gray-700 leading-8 mt-6">
          We implement industry-standard security measures to protect your information. You may request access,
          correction, or deletion of your data subject to legal requirements. For questions regarding this policy,
          please contact us at privacy@kumaraguruMUN.com.
        </p>
      </article>
    </div>
  );
};

export default PrivacyPolicy;