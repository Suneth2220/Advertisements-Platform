import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import marketplaceData from './MarketplacePage';


// Helper: get all mock listings from MarketplacePage (for similar ads)
function getAllMarketplaceListings() {
  // fallback: copy the mock data here if import fails
  return [
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
  ];
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  // fallback: find product by id if not in state
  const allListings = getAllMarketplaceListings();
  const mainProduct = product || allListings.find(p => p.id === id);

  if (!mainProduct) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">We couldn't find the product details. Please return to the listings.</p>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  // Similar ads: same category, not this product
  const similarAds = allListings.filter(p => p.category === mainProduct.category && p.id !== mainProduct.id).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main product section */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start w-full md:w-96">
              <img src={mainProduct.image} alt={mainProduct.title} className="w-full h-96 object-cover rounded-lg mb-4" />
              {/* Gallery thumbnails (mock, just repeat main image) */}
              <div className="flex gap-2 mt-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={mainProduct.image} alt="thumb" className="w-16 h-16 object-cover rounded border" />
                ))}
              </div>
              {/* Seller/Contact Card moved here */}
              <div className="bg-white border rounded-xl shadow p-6 w-full max-w-md mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full border bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">SI</div>
                  <div>
                    <div className="font-bold text-gray-900">Sachin International Pvt Ltd</div>
                    <div className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded inline-block mt-1 mb-1">MEMBER</div>
                    <div className="text-xs text-gray-500">Member since July 2025</div>
                    <a href="#" className="text-blue-600 text-xs underline">Visit member's shop</a>
                  </div>
                </div>
                <div className="border-t my-3" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-pink-600 text-xl">&#128222;</span>
                  <span className="font-semibold">0776XXXXXX</span>
                  <span className="text-gray-500 text-xs ml-2">Click to show phone number</span>
                </div>
                <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <span className="text-purple-400 text-xl">&#128172;</span>
                  <span className="font-semibold">Chat</span>
                </div>
                <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <span className="text-green-500 text-xl">&#128994;</span>
                  <span className="font-semibold">WhatsApp</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mainProduct.title}</h1>
                <div className="text-2xl text-red-600 font-bold mb-2">Rs. {mainProduct.price.toLocaleString()}</div>
                <div className="mb-2"><span className="font-semibold">Condition:</span> Used</div>
                <div className="mb-2"><span className="font-semibold">Brand:</span> Apple</div>
                <div className="mb-2"><span className="font-semibold">Location:</span> {mainProduct.location}</div>
                <div className="mb-2"><span className="font-semibold">Posted:</span> {mainProduct.postedDate}</div>
                <div className="mb-4"><span className="font-semibold">Category:</span> {mainProduct.category}</div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <div className="bg-gray-50 rounded p-4 text-gray-700 whitespace-pre-line">{mainProduct.description}</div>
          </div>
        </div>
        {/* Sidebar: Similar Ads */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Similar Ads</h2>
            <div className="space-y-4">
              {similarAds.map(ad => (
                <div key={ad.id} className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded" onClick={() => navigate(`/product/${ad.id}`, { state: { product: ad } })}>
                  <img src={ad.image} alt={ad.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 line-clamp-1">{ad.title}</div>
                    <div className="text-red-600 font-bold text-sm">Rs. {ad.price.toLocaleString()}</div>
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

export default ProductDetailPage;
