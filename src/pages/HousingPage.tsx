import React, { useState } from 'react';
import { Search, MapPin, Home, Bed, Bath, Square, Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

interface Property {
  id: string;
  title: string;
  price: number;
  type: 'rent' | 'sale';
  propertyType: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  description: string;
  postedDate: string;
  isFavorite: boolean;
}

const HousingPage: React.FC = () => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const handleToggleBookmark = (property: Property) => {
    if (isBookmarked(property.id)) removeBookmark(property.id);
    else addBookmark({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location,
      image: property.image,
      description: property.description,
      category: property.propertyType,
      postedDate: property.postedDate
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [listingType, setListingType] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');

  // Mock data
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury Downtown Apartment',
      price: 2500,
      type: 'rent',
      propertyType: 'apartment',
      location: 'Downtown Core',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      description: 'Beautiful modern apartment with city views, updated kitchen, and in-unit laundry.',
      postedDate: '2 days ago',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Charming Single Family Home',
      price: 450000,
      type: 'sale',
      propertyType: 'house',
      location: 'Suburban Heights',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      description: 'Move-in ready home with large backyard, updated kitchen, and two-car garage.',
      postedDate: '1 day ago',
      isFavorite: true
    },
    {
      id: '3',
      title: 'Cozy Studio Loft',
      price: 1400,
      type: 'rent',
      propertyType: 'studio',
      location: 'Arts District',
      bedrooms: 0,
      bathrooms: 1,
      sqft: 600,
      image: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
      description: 'Industrial-style loft with high ceilings, exposed brick, and great natural light.',
      postedDate: '4 hours ago',
      isFavorite: false
    },
    {
      id: '4',
      title: 'Spacious Family Home',
      price: 3200,
      type: 'rent',
      propertyType: 'house',
      location: 'Family Neighborhood',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
      description: 'Large family home with fenced yard, garage, and great school district.',
      postedDate: '3 days ago',
      isFavorite: false
    },
    {
      id: '5',
      title: 'Modern Townhouse',
      price: 320000,
      type: 'sale',
      propertyType: 'townhouse',
      location: 'New Development',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
      description: 'Contemporary townhouse with open floor plan and private patio.',
      postedDate: '1 week ago',
      isFavorite: true
    }
  ]);
  // Toggle favorite handler
  const handleToggleFavorite = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'condo', label: 'Condo' }
  ];

  const listingTypes = [
    { value: 'all', label: 'Rent & Sale' },
    { value: 'rent', label: 'For Rent' },
  { value: 'sale', label: 'Marketplace' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Bedrooms' },
    { value: '0', label: 'Studio' },
    { value: '1', label: '1+ Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPropertyType = propertyType === 'all' || property.propertyType === propertyType;
    const matchesListingType = listingType === 'all' || property.type === listingType;
    const matchesBedrooms = bedrooms === 'all' || 
                           (bedrooms === '0' && property.bedrooms === 0) ||
                           (bedrooms !== '0' && property.bedrooms >= parseInt(bedrooms));
    return matchesSearch && matchesPropertyType && matchesListingType && matchesBedrooms;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Housing</h1>
          <p className="text-gray-600">Find your perfect home</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            {/* Location Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, neighborhood..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Property Type */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Listing Type */}
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {listingTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Bedrooms */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {bedroomOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredProperties.length} properties found
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  onClick={() => handleToggleBookmark(property)}
                  aria-label={isBookmarked(property.id) ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked(property.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                </button>
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.type === 'rent' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    For {property.type === 'rent' ? 'Rent' : 'Sale'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-lg font-bold">
                  ${property.type === 'rent' ? `${property.price.toLocaleString()}/mo` : property.price.toLocaleString()}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{property.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded-full capitalize">
                    {property.propertyType}
                  </span>
                  <span>{property.postedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all listings</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setPropertyType('all');
                setListingType('all');
                setBedrooms('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Property Alerts CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Find Your Dream Home</h3>
          <p className="text-green-100 mb-6">Get notified when new properties matching your criteria become available</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
            Create Property Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default HousingPage;