import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Grid, List, Bookmark } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price?: string;
  location: string;
  category: string;
  type: 'listing' | 'job' | 'housing' | 'event';
  image: string;
  postedDate: string;
  isSaved: boolean;
}

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const allResults: SearchResult[] = [
    {
      id: '1',
      title: 'iPhone 14 Pro Max - Excellent Condition',
      description: 'Barely used iPhone 14 Pro Max in pristine condition. Includes original box and accessories.',
      price: '$899',
      location: 'Downtown',
      category: 'Electronics',
      type: 'listing',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      postedDate: '2 hours ago',
      isSaved: false
    },
    {
      id: '2',
      title: 'Senior Software Engineer',
      description: 'We are looking for a Senior Software Engineer to join our growing development team.',
      price: '$80,000 - $120,000',
      location: 'Tech District',
      category: 'Technology',
      type: 'job',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      postedDate: '1 day ago',
      isSaved: true
    },
    {
      id: '3',
      title: 'Luxury Downtown Apartment',
      description: 'Beautiful modern apartment with city views, updated kitchen, and in-unit laundry.',
      price: '$2,500/month',
      location: 'Downtown Core',
      category: 'Apartments',
      type: 'housing',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      postedDate: '3 days ago',
      isSaved: false
    },
    {
      id: '4',
      title: 'Community Farmers Market',
      description: 'Fresh local produce, artisanal goods, and live music every Saturday morning.',
      location: 'Central Park',
      category: 'Community',
      type: 'event',
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
      postedDate: '5 days ago',
      isSaved: false
    },
    {
      id: '5',
      title: 'Professional DSLR Camera Kit',
      description: 'Complete DSLR kit with camera, lenses, and accessories. Perfect for photography enthusiasts.',
      price: '$750',
      location: 'City Center',
      category: 'Electronics',
      type: 'listing',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      postedDate: '1 week ago',
      isSaved: true
    }
  ];

  const resultTypes = [
    { value: 'all', label: 'All Results' },
  { value: 'listing', label: 'Marketplace' },
    { value: 'job', label: 'Jobs' },
    { value: 'housing', label: 'Housing' },
    { value: 'event', label: 'Events' }
  ];

  // Get search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  const filteredResults = allResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || result.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a new search
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'listing':
        return 'bg-blue-100 text-blue-800';
      case 'job':
        return 'bg-green-100 text-green-800';
      case 'housing':
        return 'bg-purple-100 text-purple-800';
      case 'event':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for anything..."
                className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Filters and View Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Result Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {resultTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredResults.length} results
              </span>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Any Price</option>
                    <option value="0-100">$0 - $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000+">$1,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Posted</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Search results for "{searchQuery}"
            </h2>
          </div>
        )}

        {/* Results Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                      {result.type === 'listing' ? 'Marketplace' : 
                       result.type === 'job' ? 'Job' :
                       result.type === 'housing' ? 'Housing' : 'Event'}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Bookmark className={`w-4 h-4 ${result.isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                  </button>
                  {result.price && (
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-semibold">
                      {result.price}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{result.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{result.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{result.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex">
                  <div className="relative w-64 flex-shrink-0">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-32 object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Bookmark className={`w-4 h-4 ${result.isSaved ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                            {result.type === 'listing' ? 'Marketplace' : 
                             result.type === 'job' ? 'Job' :
                             result.type === 'housing' ? 'Housing' : 'Event'}
                          </span>
                          <span className="text-sm text-gray-500">{result.category}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{result.title}</h3>
                      </div>
                      {result.price && (
                        <div className="text-xl font-bold text-blue-600">{result.price}</div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{result.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.postedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Suggestions:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Check your spelling</li>
                <li>• Try more general keywords</li>
                <li>• Remove some filters</li>
                <li>• Browse categories instead</li>
              </ul>
            </div>
          </div>
        )}

        {/* No search query state */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600 mb-4">Enter keywords to find items, jobs, housing, and events</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;