import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Search, Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  maxAttendees?: number;
  image: string;
  isFeatured: boolean;
  isAttending: boolean;
}

const EventsPage: React.FC = () => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const handleToggleBookmark = (event: Event) => {
    if (isBookmarked(event.id)) removeBookmark(event.id);
    else addBookmark({
      id: event.id,
      title: event.title,
      price: 0,
      location: event.location,
      image: event.image,
      description: event.description,
      category: event.category,
      postedDate: event.date
    });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Mock data
  // Add the bookmark button to each event card where the user can save/toggle
  const events: Event[] = [
    {
      id: '1',
      title: 'Community Farmers Market',
      description: 'Fresh local produce, artisanal goods, and live music every Saturday morning.',
      date: '2025-01-25',
      time: '8:00 AM',
      location: 'Central Park',
      category: 'community',
      organizer: 'City Council',
      attendees: 245,
      maxAttendees: 500,
      image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg',
      isFeatured: true,
      isAttending: false
    },
    {
      id: '2',
      title: 'Tech Startup Networking Night',
      description: 'Connect with entrepreneurs, investors, and tech professionals in our city.',
      date: '2025-01-28',
      time: '6:30 PM',
      location: 'Innovation Hub',
      category: 'business',
      organizer: 'StartupCity',
      attendees: 89,
      maxAttendees: 150,
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
      isFeatured: false,
      isAttending: true
    },
    {
      id: '3',
      title: 'Live Jazz Concert',
      description: 'An evening of smooth jazz featuring local artists and special guest performers.',
      date: '2025-02-01',
      time: '7:00 PM',
      location: 'Blue Note Cafe',
      category: 'entertainment',
      organizer: 'Blue Note Cafe',
      attendees: 156,
      maxAttendees: 200,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      isFeatured: true,
      isAttending: false
    },
    {
      id: '4',
      title: 'Charity Fun Run 5K',
      description: 'Join us for a fun run to support local children\'s charities. All fitness levels welcome.',
      date: '2025-02-05',
      time: '7:00 AM',
      location: 'Riverside Trail',
      category: 'sports',
      organizer: 'Running Club',
      attendees: 324,
      maxAttendees: 1000,
      image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg',
      isFeatured: false,
      isAttending: false
    },
    {
      id: '5',
      title: 'Art Gallery Opening',
      description: 'Opening night for our new contemporary art exhibition featuring local artists.',
      date: '2025-02-08',
      time: '5:00 PM',
      location: 'Modern Art Gallery',
      category: 'arts',
      organizer: 'Modern Art Gallery',
      attendees: 78,
      maxAttendees: 120,
      image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg',
      isFeatured: false,
      isAttending: true
    },
    {
      id: '6',
      title: 'Cooking Workshop: Italian Cuisine',
      description: 'Learn to make authentic Italian dishes from a professional chef.',
      date: '2025-02-12',
      time: '2:00 PM',
      location: 'Culinary Institute',
      category: 'workshop',
      organizer: 'Chef Marco',
      attendees: 18,
      maxAttendees: 20,
      image: 'https://images.pexels.com/photos/1446303/pexels-photo-1446303.jpeg',
      isFeatured: false,
      isAttending: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'community', label: 'Community' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'charity', label: 'Charity' }
  ];


  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesDate = !selectedDate || event.date === selectedDate;
    const matchesLocation = !locationQuery || event.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesSearch && matchesCategory && matchesDate && matchesLocation;
  });

  // Sort events to show featured events first
  const sortedEvents = filteredEvents.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Local Events</h1>
          <p className="text-gray-600">Discover what's happening in your community</p>
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
                  placeholder="Search events..."
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

            {/* Calendar Date Picker */}
            <input
              type="date"
              value={selectedDate || ''}
              onChange={(e) => setSelectedDate(e.target.value || null)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              max="2099-12-31"
            />
          </div>

          <div className="text-sm text-gray-600">
            {sortedEvents.length} events found
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {event.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Featured</span>
                    </span>
                  </div>
                )}
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  onClick={() => handleToggleBookmark(event)}
                  aria-label={isBookmarked(event.id) ? 'Remove bookmark' : 'Add bookmark'}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked(event.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mb-2 capitalize">
                    {event.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.attendees} attending
                      {event.maxAttendees && ` / ${event.maxAttendees} max`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by {event.organizer}</span>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      event.isAttending
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {event.isAttending ? 'Attending' : 'Join Event'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or check back later for new events</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDate(null);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Create Event CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Host Your Own Event</h3>
          <p className="text-purple-100 mb-6">Connect with your community by organizing your own events</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;