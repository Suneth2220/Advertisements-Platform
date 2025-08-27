import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Globe, 
  Award, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Advanced security features and user verification to protect buyers and sellers.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Built for communities to connect, buy, sell, and support each other locally.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with users worldwide while maintaining local community focus.'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Years of experience helping millions of users connect safely and successfully.'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Click the "Login" button in the top navigation, then select "Sign up". You\'ll need to provide your email address and create a secure password. Once you verify your email, you can start posting ads and connecting with other users.'
    },
    {
      question: 'Is it free to post ads?',
      answer: 'Yes! Most ad categories are completely free to post. We believe in keeping the platform accessible to everyone. Some premium features like featured listings or promoted ads are available for a small fee to help increase visibility.'
    },
    {
      question: 'How can I stay safe when meeting buyers or sellers?',
      answer: 'Safety is our top priority. Always meet in public places during daylight hours, bring a friend if possible, trust your instincts, verify the item before payment, and use secure payment methods. Never share personal financial information or send money in advance.'
    },
    {
      question: 'How do I edit or delete my listing?',
      answer: 'Log into your account and go to "My Listings" in your dashboard. From there, you can edit any active listing by clicking the "Edit" button, or delete it entirely. Changes are updated immediately on the site.'
    },
    {
      question: 'Can I post the same ad in multiple categories?',
      answer: 'We recommend posting each item in its most appropriate category only. Duplicate postings can be flagged by users and may be removed. If you\'re unsure about the best category, choose the one that best describes your item.'
    },
    {
      question: 'How long do ads stay active?',
      answer: 'Ads typically stay active for 30 days. You\'ll receive email reminders before your ad expires, giving you the option to renew it. You can also manually repost or refresh your listing at any time from your account dashboard.'
    },
    {
      question: 'What should I do if I encounter a suspicious user?',
      answer: 'Report any suspicious activity immediately using the "Report" button on listings or messages. Common red flags include requests for personal information, unusual payment methods, or pressure to act quickly. Our moderation team reviews all reports promptly.'
    },
    {
      question: 'Can I use the platform for business purposes?',
      answer: 'Yes! Many small businesses and entrepreneurs use our platform to reach local customers. However, please follow our posting guidelines and consider our business advertising options for higher volume or commercial listings.'
    }
  ];

  const safetyTips = [
    {
      title: 'Meet in Public Places',
      description: 'Always arrange to meet in well-lit, public locations with lots of people around.'
    },
    {
      title: 'Bring a Friend',
      description: 'Consider bringing someone with you, especially for high-value transactions.'
    },
    {
      title: 'Trust Your Instincts',
      description: 'If something feels wrong or too good to be true, trust your gut feeling.'
    },
    {
      title: 'Inspect Before Paying',
      description: 'Always examine items thoroughly before completing any transaction.'
    },
    {
      title: 'Use Secure Payment Methods',
      description: 'Prefer cash for local transactions or secure payment apps for online sales.'
    },
    {
      title: 'Keep Personal Info Private',
      description: 'Don\'t share personal financial information, social security numbers, or passwords.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About ClassifiedHub</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Connecting communities through safe, easy, and modern classified advertising. 
            Your local marketplace, reimagined.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe everyone should have access to a safe, modern platform for buying, selling, 
              and connecting with their local community. Our mission is to make classified advertising 
              simple, secure, and accessible for everyone.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <Shield className="w-8 h-8 inline-block mr-3 text-red-600" />
              Safety First
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety is our top priority. Follow these guidelines to ensure secure transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safetyTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-red-100 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-red-800 mb-2">Report Suspicious Activity</h3>
              <p className="text-red-700 mb-4">
                If you encounter any suspicious users or listings, please report them immediately. 
                Our moderation team reviews all reports within 24 hours.
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <HelpCircle className="w-8 h-8 inline-block mr-3 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to common questions about using ClassifiedHub.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our support team is here to help. Reach out to us through any of these channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Email Support</h3>
              <p className="text-gray-300 mb-4">Get detailed help via email</p>
              <a 
                href="mailto:support@classifiedhub.com" 
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                support@classifiedhub.com
              </a>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Phone Support</h3>
              <p className="text-gray-300 mb-4">Speak with our team directly</p>
              <a 
                href="tel:1-800-CLASSIFIED" 
                className="text-green-400 hover:text-green-300 font-semibold"
              >
                1-800-CLASSIFIED
              </a>
              <p className="text-sm text-gray-400 mt-2">Mon-Fri 9AM-6PM EST</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Forums</h3>
              <p className="text-gray-300 mb-4">Connect with other users</p>
              <a 
                href="/forums" 
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Visit Forums
              </a>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-8">Join thousands of users buying, selling, and connecting locally.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/post-ad"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Post Your First Ad
              </a>
              <a
                href="/login"
                className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-colors font-semibold"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;