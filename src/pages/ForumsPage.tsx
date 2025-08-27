import React, { useState } from 'react';
import { MessageSquare, Users, Clock, ThumbsUp, Reply, Plus, Search } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  replies: number;
  likes: number;
  views: number;
  lastActivity: string;
  isSticky?: boolean;
}

const ForumsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Welcome to ClassifiedHub Forums!',
      author: 'Admin',
      category: 'announcements',
      content: 'Welcome to our community forums! This is a place to connect with other users, share experiences, and get help.',
      replies: 24,
      likes: 56,
      views: 342,
      lastActivity: '2 hours ago',
      isSticky: true
    },
    {
      id: '2',
      title: 'Tips for Safe Online Transactions',
      author: 'SafetyExpert',
      category: 'safety',
      content: 'Here are some essential tips to keep yourself safe when buying or selling online...',
      replies: 18,
      likes: 42,
      views: 156,
      lastActivity: '4 hours ago',
      isSticky: true
    },
    {
      id: '3',
      title: 'Best places to find vintage furniture?',
      author: 'VintageHunter',
      category: 'general',
      content: 'I\'m looking for authentic vintage furniture pieces. Any recommendations for local shops or markets?',
      replies: 12,
      likes: 8,
      views: 89,
      lastActivity: '1 day ago'
    },
    {
      id: '4',
      title: 'Job interview tips for remote positions',
      author: 'CareerGuru',
      category: 'jobs',
      content: 'With remote work becoming more common, here are some tips for acing your remote job interviews...',
      replies: 31,
      likes: 67,
      views: 245,
      lastActivity: '2 days ago'
    },
    {
      id: '5',
      title: 'Apartment hunting in downtown area',
      author: 'CitySeeker',
      category: 'housing',
      content: 'Anyone have recommendations for apartment hunting downtown? What neighborhoods should I consider?',
      replies: 15,
      likes: 22,
      views: 134,
      lastActivity: '3 days ago'
    },
    {
      id: '6',
      title: 'Upcoming community garage sale event',
      author: 'EventOrganizer',
      category: 'events',
      content: 'We\'re organizing a community-wide garage sale this weekend. Here are the details...',
      replies: 9,
      likes: 35,
      views: 78,
      lastActivity: '5 days ago'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', color: 'bg-gray-100 text-gray-800' },
    { value: 'general', label: 'General Discussion', color: 'bg-blue-100 text-blue-800' },
    { value: 'announcements', label: 'Announcements', color: 'bg-purple-100 text-purple-800' },
    { value: 'safety', label: 'Safety Tips', color: 'bg-green-100 text-green-800' },
    { value: 'jobs', label: 'Job Discussion', color: 'bg-orange-100 text-orange-800' },
    { value: 'housing', label: 'Housing Talk', color: 'bg-pink-100 text-pink-800' },
    { value: 'events', label: 'Local Events', color: 'bg-teal-100 text-teal-800' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort posts to show sticky posts first
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    return 0;
  });

  const getCategoryStyle = (categoryValue: string) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.color : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Forums</h1>
          <p className="text-gray-600">Connect with your community, share experiences, and get help</p>
        </div>

        {/* Search and New Post */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>New Discussion</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.value 
                        ? 'bg-blue-100 text-blue-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Forum Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Forum Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Posts:</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Today:</span>
                    <span className="font-medium">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Forum Posts */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {sortedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isSticky && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Sticky
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(post.category)}`}>
                          {categories.find(cat => cat.value === post.category)?.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <span>by</span>
                        <span className="font-medium text-blue-600">{post.author}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{post.lastActivity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors">
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions found</h3>
                <p className="text-gray-600 mb-4">Be the first to start a conversation in this category</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start New Discussion
                </button>
              </div>
            )}

            {/* Pagination placeholder */}
            {sortedPosts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;