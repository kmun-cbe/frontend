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
  Globe
} from 'lucide-react';

const DelegateGuidelines: React.FC = () => {
  const sections = [
    {
      icon: BookOpen,
      title: 'Pre-Conference Preparation',
      content: [
        'Research your assigned country/portfolio thoroughly',
        'Read the background guide and understand the agenda',
        'Prepare a position paper (mandatory for all committees)',
        'Familiarize yourself with UN procedures and rules',
        'Dress code: Western formal attire is mandatory',
        'Bring necessary stationery and note-taking materials'
      ]
    },
    {
      icon: Clock,
      title: 'Conference Schedule',
      content: [
        'Registration and check-in: 8:00 AM - 9:00 AM',
        'Opening ceremony: 9:00 AM - 10:00 AM',
        'Committee sessions: 10:30 AM - 6:00 PM (with breaks)',
        'Lunch break: 1:00 PM - 2:00 PM',
        'Closing ceremony: 6:00 PM - 7:00 PM',
        'Punctuality is essential - late arrivals may not be permitted'
      ]
    },
    {
      icon: Mic,
      title: 'Committee Procedures',
      content: [
        'Address the chair as "Honorable Chair" or "Chair"',
        'Raise your placard to request permission to speak',
        'Stand while delivering speeches (unless instructed otherwise)',
        'Maintain diplomatic language and decorum at all times',
        'No personal attacks or inappropriate language',
        'Follow the speakers\' list and time limits strictly'
      ]
    },
    {
      icon: Users,
      title: 'Delegate Conduct',
      content: [
        'Maintain professional behavior throughout the conference',
        'Respect fellow delegates, chairs, and organizers',
        'No use of mobile phones during committee sessions',
        'Participate actively in debates and negotiations',
        'Collaborate effectively during unmoderated caucuses',
        'Report any issues to the secretariat immediately'
      ]
    },
    {
      icon: FileText,
      title: 'Documentation Requirements',
      content: [
        'Position paper: 1-2 pages, submitted before the conference',
        'Working papers: Collaborative documents during committee',
        'Draft resolutions: Formal proposals for committee action',
        'All documents must follow UN formatting guidelines',
        'Plagiarism is strictly prohibited and will result in disqualification',
        'Submit all required documents by specified deadlines'
      ]
    },
    {
      icon: Award,
      title: 'Awards and Recognition',
      content: [
        'Best Delegate: Outstanding performance in committee',
        'Outstanding Delegate: Excellent contribution and diplomacy',
        'Honorable Mention: Good participation and effort',
        'Best Position Paper: Well-researched and written paper',
        'Awards are based on research, diplomacy, and participation',
        'All participants receive certificates of participation'
      ]
    }
  ];

  const rules = [
    {
      icon: CheckCircle,
      title: 'Do\'s',
      items: [
        'Arrive on time for all sessions',
        'Dress professionally in formal attire',
        'Speak clearly and confidently',
        'Listen actively to other delegates',
        'Take detailed notes during sessions',
        'Engage in constructive dialogue',
        'Follow parliamentary procedures',
        'Respect time limits for speeches'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Don\'ts',
      items: [
        'Don\'t use inappropriate language',
        'Don\'t interrupt other speakers',
        'Don\'t use mobile phones in committee',
        'Don\'t leave the committee room without permission',
        'Don\'t engage in personal attacks',
        'Don\'t plagiarize content',
        'Don\'t violate dress code requirements',
        'Don\'t disrupt committee proceedings'
      ]
    }
  ];

  const committeeTypes = [
    {
      level: 'Beginner',
      description: 'Perfect for first-time delegates',
      procedures: 'Standard UN procedures with guidance',
      color: 'green'
    },
    {
      level: 'Intermediate',
      description: 'For delegates with some MUN experience',
      procedures: 'Advanced procedures with crisis elements',
      color: 'yellow'
    },
    {
      level: 'Advanced',
      description: 'For experienced delegates',
      procedures: 'Complex procedures and specialized formats',
      color: 'red'
    }
  ];

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
              Essential guidelines and procedures for all delegates participating in Kumaraguru MUN 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Committee Levels */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Committee Experience Levels
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the different committee levels and their requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {committeeTypes.map((type, index) => (
              <motion.div
                key={type.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  type.color === 'green' ? 'bg-green-100' :
                  type.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <Globe className={`w-8 h-8 ${
                    type.color === 'green' ? 'text-green-600' :
                    type.color === 'yellow' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.level}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <p className="text-sm text-gray-500">{type.procedures}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Guidelines */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Do's and Don'ts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Essential guidelines for proper conduct during the conference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    rule.title === 'Do\'s' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <rule.icon className={`w-6 h-6 ${
                      rule.title === 'Do\'s' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{rule.title}</h3>
                </div>
                <ul className="space-y-3">
                  {rule.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        rule.title === 'Do\'s' ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Contacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Secretariat</h3>
                <p className="text-gray-700">+91 9876543210</p>
                <p className="text-gray-700">secretariat@kumaraguruMUN.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Medical Emergency</h3>
                <p className="text-gray-700">+91 9876543211</p>
                <p className="text-gray-700">medical@kumaraguruMUN.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Download Complete Guidelines
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the comprehensive delegate handbook with all rules and procedures
            </p>
            <button className="bg-white text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Download Handbook (PDF)
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DelegateGuidelines;