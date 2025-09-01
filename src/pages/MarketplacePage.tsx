

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
    },
    // 15 more ads
    {
      id: '7',
      title: 'Samsung 55" 4K Smart TV',
      price: 650,
      location: 'Tech District',
      image: 'https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg',
      description: 'Crystal clear 4K UHD TV, almost new, with remote and wall mount.',
      category: 'electronics',
      postedDate: '3 hours ago',
      isFavorite: false
    },
    {
      id: '8',
      title: 'Leather Recliner Chair',
      price: 300,
      location: 'Uptown',
      image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      description: 'Comfy leather recliner, perfect for home theater or living room.',
      category: 'furniture',
      postedDate: '6 hours ago',
      isFavorite: false
    },
    {
      id: '9',
      title: 'Gaming Laptop - RTX 3070',
      price: 1700,
      location: 'City Center',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      description: 'High-end gaming laptop, 16GB RAM, 1TB SSD, RTX 3070 graphics.',
      category: 'electronics',
      postedDate: '1 hour ago',
      isFavorite: false
    },
    {
      id: '10',
      title: 'Dining Table with 8 Chairs',
      price: 950,
      location: 'West End',
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
      description: 'Large wooden dining table, includes 8 matching chairs.',
      category: 'furniture',
      postedDate: '2 days ago',
      isFavorite: false
    },
    {
      id: '11',
      title: 'Used MacBook Pro 2020',
      price: 1100,
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      description: 'MacBook Pro 13", M1 chip, 256GB SSD, excellent battery.',
      category: 'electronics',
      postedDate: '7 hours ago',
      isFavorite: false
    },
    {
      id: '12',
      title: 'Toyota Prius Hybrid 2017',
      price: 14500,
      location: 'North Side',
      image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg',
      description: 'Fuel efficient, well maintained, low mileage, one owner.',
      category: 'vehicles',
      postedDate: '3 days ago',
      isFavorite: false
    },
    {
      id: '13',
      title: 'Brand New Microwave Oven',
      price: 120,
      location: 'Suburb Area',
      image: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg',
      description: 'Still in box, never used, 1-year warranty included.',
      category: 'electronics',
      postedDate: '1 day ago',
      isFavorite: false
    },
    {
      id: '14',
      title: 'Queen Size Bed Frame',
      price: 400,
      location: 'East Side',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      description: 'Sturdy metal frame, easy assembly, fits queen mattress.',
      category: 'furniture',
      postedDate: '5 days ago',
      isFavorite: false
    },
    {
      id: '15',
      title: 'Apple Watch Series 7',
      price: 350,
      location: 'Tech District',
      image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
      description: 'Latest Apple Watch, GPS, 44mm, green band, like new.',
      category: 'electronics',
      postedDate: '8 hours ago',
      isFavorite: false
    },
    {
      id: '16',
      title: 'Electric Scooter',
      price: 500,
      location: 'City Center',
      image: 'https://images.pexels.com/photos/2265481/pexels-photo-2265481.jpeg',
      description: 'Foldable, 25km range, charger included, great for commuting.',
      category: 'vehicles',
      postedDate: '2 days ago',
      isFavorite: false
    },
    {
      id: '17',
      title: 'Bookshelf - 5 Shelves',
      price: 90,
      location: 'Uptown',
      image: 'https://images.pexels.com/photos/159711/books-bookshelf-read-old-books-159711.jpeg',
      description: 'Tall bookshelf, dark wood, fits lots of books or decor.',
      category: 'furniture',
      postedDate: '6 days ago',
      isFavorite: false
    },
    {
      id: '18',
      title: 'Canon Mirrorless Camera',
      price: 600,
      location: 'Tech District',
      image: 'https://images.pexels.com/photos/51383/camera-lens-dslr-slr-51383.jpeg',
      description: 'Canon EOS M50, 15-45mm lens, WiFi, vlogging ready.',
      category: 'electronics',
      postedDate: '4 hours ago',
      isFavorite: false
    },
    {
      id: '19',
      title: 'Honda Activa Scooter',
      price: 800,
      location: 'North Side',
      image: 'https://images.pexels.com/photos/46148/pexels-photo-46148.jpeg',
      description: '2019 model, low mileage, well maintained, single owner.',
      category: 'vehicles',
      postedDate: '1 week ago',
      isFavorite: false
    },
    {
      id: '20',
      title: 'Samsung Galaxy S22 Ultra',
      price: 999,
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      description: 'Flagship phone, 256GB, 108MP camera, S-Pen, pristine condition.',
      category: 'electronics',
      postedDate: '2 hours ago',
      isFavorite: false
    },
    {
      id: '21',
      title: 'Sofa Bed - Convertible',
      price: 350,
      location: 'Suburb Area',
      image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg',
      description: 'Space-saving sofa bed, easy to convert, gray fabric.',
      category: 'furniture',
      postedDate: '3 days ago',
      isFavorite: false
    }
  ]);
  // Toggle favorite handler
  const handleToggleFavorite = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  };

  // Pagination state and logic (must be after filteredListings is defined)
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 15;

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

  const totalPages = Math.ceil(filteredListings.length / adsPerPage);
  const paginatedListings: ListingItem[] = filteredListings.slice((currentPage - 1) * adsPerPage, currentPage * adsPerPage);

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
            {paginatedListings.map((listing) => (
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
            {paginatedListings.map((listing) => (
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
        {/* Pagination Navigator */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2 select-none">
            {/* Previous */}
            <button
              className={`px-2 py-1 flex items-center rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ textDecoration: 'none' }}
            >
              &lt; Previous
            </button>
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`px-2 py-1 ${currentPage === pageNum ? 'font-bold text-black' : 'text-gray-500 hover:underline'}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {totalPages > 5 && <span className="px-2">...</span>}
            {/* Next */}
            <button
              className={`px-2 py-1 flex items-center rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ textDecoration: 'none' }}
            >
              Next &gt;
            </button>
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
