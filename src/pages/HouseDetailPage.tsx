import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';


// Helper: get all mock house listings (for similar ads)
function getAllHouseListings() {
  return [
    {
      id: 'h1',
      title: '3 Bedroom Apartment in City Center',
      price: 350000,
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/272474/pexels-photo-272474.jpeg',
      description: 'Spacious 3 bedroom apartment with modern kitchen and balcony. Close to transit and shops.',
      category: 'apartment',
      postedDate: '3 days ago',
      isFavorite: false
    },
    {
      id: 'h2',
      title: 'Cozy 2 Bedroom House with Garden',
      price: 450000,
      location: 'Suburb Area',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      description: 'Well-maintained house with private garden and parking. Great family neighborhood.',
      category: 'house',
      postedDate: '1 week ago',
      isFavorite: true
    },
  ];
}

const HouseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const allListings = getAllHouseListings();
  const mainProduct = product || allListings.find(p => p.id === id);
  const saved = mainProduct ? isBookmarked(mainProduct.id) : false;

  if (!mainProduct) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
        <p className="mb-6">We couldn't find the house listing. Please return to the listings.</p>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  const similarAds = allListings.filter(p => p.category === mainProduct.category && p.id !== mainProduct.id).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start w-full md:w-96">
              <img src={mainProduct.image} alt={mainProduct.title} className="w-full h-96 object-cover rounded-lg mb-4" />
              <div className="flex gap-2 mt-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={mainProduct.image} alt="thumb" className="w-16 h-16 object-cover rounded border" />
                ))}
              </div>
              <div className="bg-white border rounded-xl shadow p-6 w-full min-w-[600px] max-w-4xl" style={{height: 'auto'}}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full border bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">HO</div>
                  <div>
                    <div className="font-bold text-gray-900">Home Owner</div>
                    <div className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded inline-block mt-1 mb-1">MEMBER</div>
                    <div className="text-xs text-gray-500">Member since 2024</div>
                    <a href="#" className="text-blue-600 text-xs underline">View seller profile</a>
                  </div>
                </div>
                <div className="border-t my-3" />
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-pink-600 text-2xl">&#128222;</span>
                    <span className="font-semibold">0776XXXXXX</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mainProduct.title}</h1>
                <div className="text-2xl text-red-600 font-bold mb-2">Rs. {Number(mainProduct.price).toLocaleString()}</div>
                <div className="mb-2"><span className="font-semibold">Type:</span> {mainProduct.category}</div>
                <div className="mb-2"><span className="font-semibold">Location:</span> {mainProduct.location}</div>
                <div className="mb-2"><span className="font-semibold">Posted:</span> {mainProduct.postedDate}</div>
                <div className="mb-4"><span className="font-semibold">Status:</span> For Sale</div>

                <div className="mt-6">
                  {mainProduct && saved ? (
                      <button
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold w-56 py-3 rounded-lg text-lg transition justify-center"
                      onClick={() => removeBookmark(mainProduct.id)}
                    >
                      <Bookmark className="w-6 h-6" />
                      Remove
                    </button>
                  ) : mainProduct ? (
                      <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold w-56 py-3 rounded-lg text-lg transition justify-center"
                      onClick={() => addBookmark(mainProduct)}
                    >
                      <Bookmark className="w-6 h-6" />
                      Save
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <div className="bg-gray-50 rounded p-4 text-gray-700 whitespace-pre-line">{mainProduct.description}</div>
          </div>
        </div>
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Similar Listings</h2>
            <div className="space-y-4">
              {similarAds.map(ad => (
                <div key={ad.id} className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => navigate(`/house/${ad.id}`, { state: { product: ad } })}>
                  <img src={ad.image} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 line-clamp-1">{ad.title}</div>
                    <div className="text-red-600 font-bold text-sm">Rs. {Number(ad.price).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{ad.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetailPage;
