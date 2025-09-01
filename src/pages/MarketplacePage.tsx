import React, { useState } from 'react';
import { Search, Grid, List, Bookmark, MapPin, Clock } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useNavigate } from 'react-router-dom';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  category: string;
  postedDate: string;
  isFavorite: boolean;
}

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const handleToggleBookmark = (item: ListingItem) => {
    if (isBookmarked(item.id)) removeBookmark(item.id);
    else addBookmark(item);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data
  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: '1',
      title: 'iPhone 14 Pro Max - Excellent Condition',
      price: 899,
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      description: 'Barely used iPhone 14 Pro Max in pristine condition. Includes original box and accessories.',
      category: 'electronics',
      postedDate: '2 hours ago',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Modern Sectional Sofa - Gray',
      price: 1200,
      location: 'Suburb Area',
      image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
      description: 'Beautiful modern sectional sofa in excellent condition. Perfect for large living rooms.',
      category: 'furniture',
      postedDate: '5 hours ago',
      isFavorite: true
    },
    {
      id: '3',
      title: '2018 Honda Civic - Low Mileage',
      price: 18500,
      location: 'North Side',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
      description: 'Well-maintained Honda Civic with only 35K miles. Clean title, recent inspection.',
      category: 'vehicles',
      postedDate: '1 day ago',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Professional DSLR Camera Kit',
      price: 750,
      location: 'City Center',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      description: 'Complete DSLR kit with camera, lenses, and accessories. Perfect for photography enthusiasts.',
      category: 'electronics',
      postedDate: '3 days ago',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Vintage Dining Table Set',
      price: 450,
      location: 'West End',
      image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      description: 'Beautiful vintage dining table with 6 chairs. Solid wood construction.',
      category: 'furniture',
      postedDate: '4 days ago',
      isFavorite: true
    },
    {
      id: '6',
      title: 'Mountain Bike - Trek 2021',
      price: 850,
      location: 'East Side',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
      description: 'High-quality mountain bike in great condition. Perfect for trails and city riding.',
      category: 'sports',
      postedDate: '1 week ago',
      isFavorite: false
    }
  ]);
  // Toggle favorite handler
  const handleToggleFavorite = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'other', label: 'Other' }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    const matchesLocation = !locationQuery || listing.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketplace</h1>
          <p className="text-gray-600">Find great deals on items in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar + Location */}
            <div className="flex-1 flex gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for items..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative min-w-[180px]">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredListings.length} results
          </div>
        </div>

        {/* Listings Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/product/${listing.id}`, { state: { product: listing } })}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') navigate(`/product/${listing.id}`, { state: { product: listing } }); }}
              >
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    onClick={e => { e.stopPropagation(); handleToggleBookmark(listing); }}
                    aria-label={isBookmarked(listing.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked(listing.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-semibold">
                    ${listing.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{listing.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex">
                  <div className="relative w-64 flex-shrink-0">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      onClick={() => handleToggleFavorite(listing.id)}
                      aria-label={listing.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked(listing.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{listing.title}</h3>
                      <div className="text-2xl font-bold text-blue-600">${listing.price.toLocaleString()}</div>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{listing.postedDate}</span>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {categories.find(c => c.value === listing.category)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or browse all categories</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
