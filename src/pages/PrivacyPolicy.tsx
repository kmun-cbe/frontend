import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-16 px-4">
      <article className="prose prose-lg max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <div className="text-left space-y-6">
        <p className="text-gray-700 leading-8">
            Kumaraguru Model United Nations (KMUN) values the privacy and security of all participants, delegates, chairs, and volunteers. By registering or participating in KMUN, you agree to the following guidelines:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Collection of Information</h3>
              <p className="text-gray-700 leading-7">
                We collect basic personal information (such as name, email, contact number, institution, and committee preference) only for the purpose of registration and event management.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                Any additional information shared during registration will be used solely for organizational purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Use of Information</h3>
              <p className="text-gray-700 leading-7">
                Your information will be used to assign committees, communicate updates, and provide resources related to KMUN.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                Contact details may be used to share future KMUN-related opportunities or events.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Data Sharing</h3>
              <p className="text-gray-700 leading-7">
                KMUN does not sell, rent, or disclose your personal information to third parties.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                Information may only be shared with the organizing team and faculty advisors for event-related purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Photography and Media</h3>
              <p className="text-gray-700 leading-7">
                By participating, you consent to photography, videography, and media coverage during the event.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                KMUN reserves the right to use such content for promotional, educational, or archival purposes.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Conduct and Confidentiality</h3>
              <p className="text-gray-700 leading-7">
                All committee discussions, documents, and communication must remain respectful and in line with MUN ethics.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                Sharing false, offensive, or confidential content is strictly prohibited.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">6. Security of Data</h3>
              <p className="text-gray-700 leading-7">
                Reasonable measures will be taken to protect your information from unauthorized access.
              </p>
              <p className="text-gray-700 leading-7 mt-2">
                However, KMUN is not responsible for breaches beyond its control (e.g., technical failures of third-party platforms).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">7. Consent</h3>
              <p className="text-gray-700 leading-7">
                By registering for KMUN, you consent to the collection and use of your information as outlined in this policy.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PrivacyPolicy;