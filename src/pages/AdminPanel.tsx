import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Flag, 
  BarChart3, 
  Settings,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const AdminPanel: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const stats = {
    totalUsers: 12847,
    activeListings: 3421,
    pendingReports: 23,
    monthlyRevenue: 8750,
    dailySignups: 45,
    todaysPosts: 167
  };

  const recentReports = [
    {
      id: '1',
      type: 'spam',
      reportedItem: 'iPhone 15 - Too Good to be True',
      reportedBy: 'user123',
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'inappropriate',
      reportedItem: 'Inappropriate job posting',
      reportedBy: 'safetyfirst',
      status: 'reviewing',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'fraud',
      reportedItem: 'Suspicious car listing',
      reportedBy: 'carbuyer2024',
      status: 'resolved',
      timestamp: '1 day ago'
    }
  ];

  const recentUsers = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      joinDate: '2025-01-20',
      status: 'active',
      listings: 3,
      lastActive: '1 hour ago'
    },
    {
      id: '2',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      joinDate: '2025-01-19',
      status: 'suspended',
      listings: 1,
      lastActive: '2 days ago'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      joinDate: '2025-01-18',
      status: 'active',
      listings: 5,
      lastActive: '30 minutes ago'
    }
  ];

  const flaggedListings = [
    {
      id: '1',
      title: 'Luxury Car - Must Sell Fast!',
      category: 'Vehicles',
      author: 'quickseller',
      reports: 5,
      reason: 'Suspicious pricing',
      status: 'under_review'
    },
    {
      id: '2',
      title: 'Work from Home Opportunity',
      category: 'Jobs',
      author: 'workfromhome',
      reports: 3,
      reason: 'Potential scam',
      status: 'flagged'
    }
  ];

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'listings', label: 'Listings', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h1>
          <p className="text-gray-600">Manage users, listings, and site settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 text-sm font-medium">Total Users</p>
                          <p className="text-3xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                        <Users className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 text-sm font-medium">Active Listings</p>
                          <p className="text-3xl font-bold text-green-900">{stats.activeListings.toLocaleString()}</p>
                        </div>
                        <MessageSquare className="w-12 h-12 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-600 text-sm font-medium">Pending Reports</p>
                          <p className="text-3xl font-bold text-red-900">{stats.pendingReports}</p>
                        </div>
                        <Flag className="w-12 h-12 text-red-600" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions & Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Flag className="w-5 h-5 text-red-500" />
                            <div>
                              <p className="font-medium text-gray-900">Review Reports</p>
                              <p className="text-sm text-gray-600">{stats.pendingReports} pending reports</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-gray-900">New User Registrations</p>
                              <p className="text-sm text-gray-600">{stats.dailySignups} new users today</p>
                            </div>
                          </div>
                        </button>
                        
                        <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium text-gray-900">Site Analytics</p>
                              <p className="text-sm text-gray-600">{stats.todaysPosts} posts today</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                      <div className="space-y-3">
                        {recentReports.slice(0, 3).map((report) => (
                          <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                report.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {report.status}
                              </span>
                              <span className="text-sm text-gray-500">{report.timestamp}</span>
                            </div>
                            <p className="font-medium text-gray-900 mb-1">{report.reportedItem}</p>
                            <p className="text-sm text-gray-600">Type: {report.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Listings</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Active</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-900">{user.listings}</td>
                            <td className="py-4 px-4 text-gray-600">{user.lastActive}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                  <Ban className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Content Moderation</h2>
                    <div className="flex space-x-3">
                      <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All Reports</option>
                        <option value="pending">Pending</option>
                        <option value="reviewing">Under Review</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              report.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {report.status}
                            </span>
                            <span className="text-sm text-gray-500">{report.timestamp}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                              <XCircle className="w-4 h-4" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{report.reportedItem}</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Report Type:</span>
                            <span className="ml-2 font-medium">{report.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Reported By:</span>
                            <span className="ml-2 font-medium">{report.reportedBy}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            defaultValue="ClassifiedHub"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Description
                          </label>
                          <textarea
                            rows={3}
                            defaultValue="The modern way to buy, sell, and connect with your local community."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Moderation Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span className="text-gray-700">Auto-approve new listings</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-3" />
                          <span className="text-gray-700">Email notifications for new reports</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Require email verification for new users</span>
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

export default AdminPanel;