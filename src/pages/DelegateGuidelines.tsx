import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  AlertCircle, 
  CheckCircle,
  FileText,
  Mic,
  Gavel,
  Globe,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

const DelegateGuidelines: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Gavel className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Delegate Guidelines</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Welcome to Kumaraguru MUN 2025! Essential guidelines for all delegates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <p className="text-lg text-gray-700 mb-8">
                Welcome to Kumaraguru MUN 2025! We're excited to have you on board for an engaging and professional conference experience. To make the most of it, please take a moment to go through these guidelines. We expect all delegates to follow them closely so that everyone enjoys a smooth and impactful MUN experience.
              </p>

              {/* 1. DELEGATE REGISTRATIONS */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  DELEGATE REGISTRATIONS
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>All delegates, whether registering individually or as part of a delegation, must complete their registration individually through our official website: <strong>mun.kumaraguru.in</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates are required to carry a valid ID proof (Aadhaar card or Institution ID card) at all times during the conference.</span>
                  </li>
                </ul>
              </div>

              {/* 2. ELIGIBILITY */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  ELIGIBILITY
                </h2>
                <p className="text-gray-700 mb-4">This year, schools and colleges will be having separate committees:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">For Colleges:</h3>
                    <p className="text-blue-800">UNSC, UNODC, IPL, LOK SABHA, and IPC</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">For Schools:</h3>
                    <p className="text-green-800">DISEC, UNHCR and IPC</p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>School delegates:</strong> Students from Grade 9 and above.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>College delegates:</strong> All UG and PG students.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Please note that <strong>UNSC is a double delegation committee.</strong></span>
                  </li>
                </ul>
              </div>

              {/* 3. DELEGATION CRITERIA */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  DELEGATION CRITERIA
                </h2>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Each delegate in a delegation must fill out their own registration form and indicate their committee and portfolio preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>All official communication regarding the delegation will be given through the Head Delegate.</span>
                  </li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3">For Colleges:</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• A minimum of 12 delegates is required, with at least two delegates per committee.</li>
                      <li>• If the delegation has 14–20 delegates, there must be at least one delegate per committee.</li>
                      <li>• For 20 or more delegates, committee restrictions do not apply.</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">For Schools:</h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• A minimum of 10 or more delegates.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. PAYMENT AND ALLOTMENTS */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  PAYMENT AND ALLOTMENTS
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>The registration fee for delegates are as follows:</span>
                  </li>
                  <li className="ml-6 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>External Delegates (Schools & Colleges):</strong> Rs. 1900</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Kumaraguru Delegates:</strong> Rs. 1600</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>The payment portal will open automatically at the end of the registration process.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates must refer to the Portfolio Matrix to fill their committee and portfolio preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-700"><strong>Important:</strong> Registration fees are non-refundable under any circumstances.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates will receive a confirmation email containing their allotment. Please note that these communications will not be immediate and will be sent out at subsequent stages after the registration process.</span>
                  </li>
                </ul>
              </div>

              {/* 5. CODE OF CONDUCT */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  CODE OF CONDUCT
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates are expected to uphold a high standard of conduct throughout the conference.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates are required to wear attire that is respectable and presentable to all participants.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>The use or possession of prohibited substances is strictly banned inside campus. The MUN is held on a college campus, and all delegates are expected to comply with the institution's rules and regulations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Delegates are responsible for their personal belongings. The Secretariat, Organizing Committee, and Conference Staff will not be held accountable for any loss, theft, or damage.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-700">Delegates found in violation of these rules will face immediate disciplinary action by the Secretariat.</span>
                  </li>
                </ul>
              </div>

              {/* 6. FACILITIES AND AMENITIES */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">6</span>
                  </div>
                  FACILITIES AND AMENITIES
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Food & Beverages:</strong> Lunch and snacks will be provided for all delegates on each of the three days. Lunch will be served at designated time and locations, which will be communicated to delegates in advance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Water Stations:</strong> In line with our sustainability efforts, single-use water bottles will not be provided. Delegates are encouraged to carry their own reusable bottles. Refill stations will be available across the venue, and OC members in each committee will guide delegates to them if needed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Accommodation:</strong> Delegates who have opted for accommodation will receive detailed instructions regarding check-in, stay arrangements, and payment procedures after their registrations.</span>
                  </li>
                </ul>
              </div>

              {/* 7. AWARDS AND TROPHIES */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">7</span>
                  </div>
                  AWARDS AND TROPHIES
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Upon qualifying as a delegation, the delegation will be eligible to compete for the overall delegation trophies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Participation certificates will be provided to all delegates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Individual awards and overall delegation trophies will be presented to the winning delegates and delegations respectively.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>All decisions regarding awards made by the Executive Board are final. Any concerns should be directed to the Secretariat, who will address them appropriately.</span>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  CONTACT INFORMATION
                </h2>
                <p className="text-gray-700 mb-4">For further assistance or clarifications regarding the MUN, delegates are welcome to reach out to the Secretariat!!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">USG Delegate Affairs</h3>
                    <p className="text-blue-800">Aadvika - +91 7373766556</p>
                    <p className="text-blue-800">Priya Sahana - +91 9043052004</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">USG EB Affairs</h3>
                    <p className="text-green-800">Joshua Sylvester - +91 9597106823</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-mail Address
                  </h3>
                  <p className="text-gray-700">mun@kct.ac.in</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">STAY CONNECTED</h2>
                <p className="text-gray-700 mb-4">Follow our official social media handles and check for E-mail communications for the latest updates and announcements about Kumaraguru MUN 2025</p>
              </div>

              {/* Closing Message */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 mb-4">
                  We truly appreciate your cooperation and enthusiasm. Get ready for an engaging, impactful, and memorable MUN experience! Welcome, and we look forward to your participation!
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <Calendar className="w-5 h-5" />
                  <span>📅 Dates: 26th – 28th September, 2025</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DelegateGuidelines;