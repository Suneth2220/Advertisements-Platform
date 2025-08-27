import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Briefcase, 
  Home, 
  MessageSquare, 
  Calendar,
  Search,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

const HomePage: React.FC = () => {
  const categories = [
    {
  title: 'Marketplace',
      icon: ShoppingBag,
      description: 'Buy and sell items in your area',
  link: '/marketplace',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Jobs',
      icon: Briefcase,
      description: 'Find your next opportunity',
      link: '/jobs',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Housing',
      icon: Home,
      description: 'Rent, buy, or sell property',
      link: '/housing',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Forums',
      icon: MessageSquare,
      description: 'Connect with your community',
      link: '/forums',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Events',
      icon: Calendar,
      description: 'Discover local happenings',
      link: '/events',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Search',
      icon: Search,
      description: 'Find exactly what you need',
      link: '/search',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Trending Listings',
      description: 'See what\'s popular in your area right now'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Built-in safety features to protect buyers and sellers'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it from our support team'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find What You Need,
            <br />
            <span className="text-blue-200">Right In Your Neighborhood</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            The modern way to buy, sell, and connect with your local community.
            Discover jobs, housing, marketplace items, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/post-ad"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105"
            >
              Post Your Ad
            </Link>
            <Link
              to="/search"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Start Browsing
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find everything you need in one place. From jobs and housing to marketplace items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={index}
                  to={category.link}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} text-white mb-6`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ClassifiedHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've redesigned the classified experience to be safer, faster, and more user-friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the better way to buy, sell, and connect locally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/post-ad"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Post Your First Ad
            </Link>
            <Link
              to="/about"
              className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;