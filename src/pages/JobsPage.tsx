import React, { useState } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { Search, MapPin, Clock, DollarSign, Briefcase, Filter, Bookmark } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  requirements: string[];
  isBookmarked: boolean;
}

const JobsPage: React.FC = () => {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');

  // Mock data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      location: 'Downtown',
      salary: '$80,000 - $120,000',
      type: 'Full-time',
      postedDate: '2 days ago',
      description: 'We are looking for a Senior Software Engineer to join our growing development team. You will work on cutting-edge projects using modern technologies.',
      requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge', 'Team leadership'],
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Marketing Manager',
      company: 'Creative Agency',
      location: 'Midtown',
      salary: '$60,000 - $80,000',
      type: 'Full-time',
      postedDate: '1 day ago',
      description: 'Seeking an experienced Marketing Manager to develop and execute marketing strategies for our diverse client portfolio.',
      requirements: ['3+ years marketing', 'Digital marketing', 'Analytics', 'Communication skills'],
      isBookmarked: true
    },
    {
      id: '3',
      title: 'Freelance Web Designer',
      company: 'Design Studio',
      location: 'Remote',
      salary: '$40 - $60/hour',
      type: 'Contract',
      postedDate: '3 hours ago',
      description: 'Looking for talented web designers for various client projects. Flexible schedule and competitive rates.',
      requirements: ['Portfolio required', 'UI/UX skills', 'Figma/Sketch', 'HTML/CSS knowledge'],
      isBookmarked: false
    },
    {
      id: '4',
      title: 'Data Analyst',
      company: 'Analytics Pro',
      location: 'Business District',
      salary: '$50,000 - $70,000',
      type: 'Full-time',
      postedDate: '5 days ago',
      description: 'Join our data team to help businesses make informed decisions through data analysis and visualization.',
      requirements: ['SQL proficiency', 'Python/R', 'Data visualization', 'Statistics background'],
      isBookmarked: false
    },
    {
      id: '5',
      title: 'Customer Service Representative',
      company: 'Support Solutions',
      location: 'City Center',
      salary: '$35,000 - $45,000',
      type: 'Part-time',
      postedDate: '1 week ago',
      description: 'Provide excellent customer service and support to our clients via phone, email, and chat.',
      requirements: ['Customer service experience', 'Communication skills', 'Problem solving', 'Flexible schedule'],
      isBookmarked: true
    }
  ];

  const jobTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' }
  ];

  const salaryRanges = [
    { value: 'all', label: 'All Salaries' },
    { value: '30k-50k', label: '$30K - $50K' },
    { value: '50k-70k', label: '$50K - $70K' },
    { value: '70k-100k', label: '$70K - $100K' },
    { value: '100k+', label: '$100K+' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = jobTypeFilter === 'all' || job.type === jobTypeFilter;
    return matchesSearch && matchesLocation && matchesJobType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Opportunities</h1>
          <p className="text-gray-600">Find your next career opportunity</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Job Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, companies, keywords..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Job Type */}
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {salaryRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <div className="text-sm text-gray-600">
              {filteredJobs.length} jobs found
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <button
                      className="ml-4 p-2 hover:bg-gray-50 rounded-full transition-colors"
                      aria-label={isBookmarked(job.id) ? 'Remove bookmark' : 'Add bookmark'}
                      onClick={() => {
                        if (isBookmarked(job.id)) {
                          removeBookmark(job.id);
                        } else {
                          addBookmark({
                            id: job.id,
                            title: job.title,
                            price: 0,
                            location: job.location,
                            image: '',
                            description: job.description,
                            category: 'job',
                            postedDate: job.postedDate,
                          });
                        }
                      }}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked(job.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply Now
                </button>
                <a href={`/jobs/${job.id}`} className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold inline-flex items-center justify-center">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all jobs</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setLocationFilter('');
                setJobTypeFilter('all');
                setSalaryFilter('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Job Alerts CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Never Miss an Opportunity</h3>
          <p className="text-blue-100 mb-6">Get notified when new jobs matching your criteria are posted</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Create Job Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;