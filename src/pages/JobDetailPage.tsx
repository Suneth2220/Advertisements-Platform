import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, Clock, Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';

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
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Downtown',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    postedDate: '2 days ago',
    description:
      'We are looking for a Senior Software Engineer to join our growing development team. You will work on cutting-edge projects using modern technologies. This role includes ownership of features end-to-end, code reviews, mentoring juniors and collaborating closely with product and design.',
    requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge', 'Team leadership'],
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
  },
];

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find(j => j.id === id);
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link to="/jobs" className="text-sm text-blue-600 hover:underline">&larr; Back to jobs</Link>
          <div className="mt-6 bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h1>
            <p className="text-gray-600">The job you're looking for may have been removed or the link is incorrect.</p>
            <div className="mt-6">
              <Link to="/jobs" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Jobs</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <Link to="/jobs" className="text-sm text-blue-600 hover:underline">&larr; Back to jobs</Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-gray-700 font-medium mb-4">{job.company}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
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

              <div className="prose max-w-none text-gray-700 mb-6">
                <p>{job.description}</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply Now
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Message Employer
                </button>
                <button
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
                  className="p-2 rounded-lg hover:bg-gray-50"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked(job.id) ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

            <aside className="w-60 hidden lg:block">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">About {job.company}</h4>
                <p className="text-sm text-gray-600 mb-3">Small blurb about the company, culture and benefits. Contact details and website can be here.</p>
                <div className="text-sm text-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Employment</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
