import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Bookmark, Grid, List } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

interface ServiceItem {
  id: string;
  title: string;
  provider: string;
  price: string;
  location: string;
  image: string;
  description: string;
  category: string;
  postedDate: string;
  isFavorite: boolean;
}

const mockServices: ServiceItem[] = [
  {
    id: '1',
    title: 'Home Cleaning Service',
    provider: 'CleanCo',
    price: '$40/hr',
    location: 'Downtown',
    image: 'https://images.pexels.com/photos/4239035/pexels-photo-4239035.jpeg',
    description: 'Professional home cleaning with eco-friendly products. Satisfaction guaranteed!',
    category: 'Home Services',
    postedDate: '2 hours ago',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Math Tutoring (All Levels)',
    provider: 'TutorPro',
    price: '$25/hr',
    location: 'Suburb Area',
    image: 'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg',
    description: 'Experienced math tutor for school and college students. Online or in-person.',
    category: 'Tutoring',
    postedDate: '5 hours ago',
    isFavorite: true
  },
  {
    id: '3',
    title: 'Car Repair & Maintenance',
    provider: 'AutoFix',
    price: 'From $60',
    location: 'North Side',
    image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg',
    description: 'Certified mechanics for all car brands. Fast and reliable service.',
    category: 'Automotive',
    postedDate: '1 day ago',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Haircut & Styling',
    provider: 'BeautyBar',
    price: '$30',
    location: 'City Center',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
    description: 'Trendy haircuts and styling for men and women. Walk-ins welcome.',
    category: 'Beauty',
    postedDate: '3 days ago',
    isFavorite: false
  },
  {
    id: '5',
    title: 'Computer Repair',
    provider: 'TechHelp',
    price: '$50 flat',
    location: 'West End',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    description: 'Laptop and desktop repair, virus removal, upgrades, and more.',
    category: 'Computer',
    postedDate: '4 days ago',
    isFavorite: true
  },
  {
    id: '6',
    title: 'Moving Service',
    provider: 'MoveIt',
    price: 'From $100',
    location: 'East Side',
    image: 'https://images.pexels.com/photos/7464700/pexels-photo-7464700.jpeg',
    description: 'Local and long-distance moving. Careful, efficient, and affordable.',
    category: 'Other',
    postedDate: '1 week ago',
    isFavorite: false
  }
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Home Services', label: 'Home Services' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Beauty', label: 'Beauty' },
  { value: 'Tutoring', label: 'Tutoring' },
  { value: 'Computer', label: 'Computer' },
  { value: 'Other', label: 'Other' }
];

const ServicesPage: React.FC = () => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const handleToggleBookmark = (service: ServiceItem) => {
    if (isBookmarked(service.id)) removeBookmark(service.id);
    else addBookmark({
      id: service.id,
      title: service.title,
      price: service.price,
      location: service.location,
      image: service.image,
      description: service.description,
      category: service.category,
      postedDate: service.postedDate
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [services, setServices] = useState<ServiceItem[]>(mockServices);

  // Toggle favorite handler
  const handleToggleFavorite = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, isFavorite: !s.isFavorite } : s));
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesLocation = !locationQuery || service.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Services</h1>
          <p className="text-gray-600">Browse local services or offer your own</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar + Location */}
            <div className="flex-1 flex gap-4">
              <div className="relative w-full">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services..."
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
            Showing {filteredServices.length} results
          </div>
        </div>

        {/* Services Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    onClick={() => handleToggleBookmark(service)}
                    aria-label={isBookmarked(service.id) ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Bookmark className={`w-5 h-5 ${isBookmarked(service.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-semibold">
                    {service.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{service.title}</h3>
                  <div className="text-blue-600 text-xs font-semibold mb-2">{service.provider}</div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.postedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex">
                  <div className="relative w-64 flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-32 object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <button
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        onClick={() => handleToggleFavorite(service.id)}
                        aria-label={service.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-4 h-4 ${service.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{service.title}</h3>
                      <div className="text-xl font-bold text-blue-600">{service.price}</div>
                    </div>
                    <div className="text-blue-600 text-xs font-semibold mb-1">{service.provider}</div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{service.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.postedDate}</span>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
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

export default ServicesPage;
