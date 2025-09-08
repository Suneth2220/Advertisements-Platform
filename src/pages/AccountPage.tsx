import React, { useState } from 'react';
import { User, Settings, Heart, MessageSquare, Eye, Edit, Trash2, Plus, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for user's listings
  const userListings = [
    {
      id: '1',
      title: 'iPhone 14 Pro - Excellent Condition',
      price: '$899',
      category: 'Electronics',
      status: 'active',
      views: 45,
      favorites: 8,
      inquiries: 3,
      postedDate: '2 days ago',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
    },
    {
      id: '2',
      title: 'Software Developer Position',
      price: '$80k-120k',
      category: 'Jobs',
      status: 'paused',
      views: 123,
      favorites: 15,
      inquiries: 7,
      postedDate: '1 week ago',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
    }
  ];

  const favoriteItems = [
    {
      id: '1',
      title: 'Modern Sectional Sofa',
      price: '$1,200',
      location: 'Downtown',
      postedDate: '1 day ago',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg'
    },
    {
      id: '2',
      title: 'Marketing Manager Position',
      price: '$60k-80k',
      location: 'Remote',
      postedDate: '3 days ago',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'John Smith',
      subject: 'Interested in your iPhone',
      preview: 'Hi, is this still available? I\'m very interested...',
      time: '2 hours ago',
      unread: true
    },
    {
      id: '2',
      sender: 'Sarah Johnson',
      subject: 'Question about the job posting',
      preview: 'Could you provide more details about the remote work policy?',
      time: '1 day ago',
      unread: false
    }
  ];

  const tabs = [
    { id: 'listings', label: 'My Listings', icon: MessageSquare },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">Member since Jan 2025</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Verified</span>
                  {user?.isAdmin && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Admin</span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Listings:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views:</span>
                    <span className="font-medium">168</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Favorites:</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Messages:</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* My Listings Tab */}
              {activeTab === 'listings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Listings</h2>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>New Listing</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {userListings.map((listing) => (
                      <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{listing.price}</span>
                                <span>•</span>
                                <span>{listing.category}</span>
                                <span>•</span>
                                <span>{listing.postedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              listing.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {listing.status}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Eye className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                            <div className="text-sm font-medium text-gray-900">{listing.views}</div>
                            <div className="text-xs text-gray-600">Views</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
                            <div className="text-sm font-medium text-gray-900">{listing.favorites}</div>
                            <div className="text-xs text-gray-600">Favorites</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                            <div className="text-sm font-medium text-gray-900">{listing.inquiries}</div>
                            <div className="text-xs text-gray-600">Messages</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            {listing.status === 'active' ? 'Pause' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Items</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favoriteItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="font-medium text-blue-600">{item.price}</span>
                          <span>{item.location}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.postedDate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`border border-gray-200 rounded-lg p-4 ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                              {message.unread && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-gray-800 mb-1">{message.subject}</h4>
                            <p className="text-sm text-gray-600 mb-2">{message.preview}</p>
                          </div>
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                            Reply
                          </button>
                          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors">
                            Archive
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.name}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span className="text-gray-700">Email notifications for new messages</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span className="text-gray-700">Email notifications for listing updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">SMS notifications</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span className="text-gray-700">Show my name on listings</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Allow other users to see my activity</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;