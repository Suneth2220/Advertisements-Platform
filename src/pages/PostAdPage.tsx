import React, { useState } from 'react';
import { Upload, X, MapPin, DollarSign, Camera, Tag, FileText } from 'lucide-react';

const PostAdPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: '',
    priceType: 'fixed',
    location: '',
    condition: '',
    contactMethod: 'email',
    phone: '',
    email: '',
    images: [] as File[]
  });

  const categories = [
    { 
      value: 'for-sale', 
  label: 'Marketplace',
      subcategories: ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports', 'Automotive', 'Other']
    },
    { 
      value: 'housing', 
      label: 'Housing',
      subcategories: ['Apartments', 'Houses', 'Rooms', 'Commercial', 'Vacation Rentals']
    },
    { 
      value: 'jobs', 
      label: 'Jobs',
      subcategories: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
    },
    { 
      value: 'services', 
      label: 'Services',
      subcategories: ['Home Services', 'Automotive', 'Beauty', 'Tutoring', 'Computer', 'Other']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' }) // Reset subcategory when category changes
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 5) // Limit to 5 images
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ad submitted:', formData);
    // Here you would typically submit the form data
    alert('Ad posted successfully! (This is a demo)');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Your Ad</h1>
          <p className="text-gray-600">Reach thousands of potential buyers in your area</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-4">
            <span className={`text-sm ${currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Category
            </span>
            <span className={`text-sm ${currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Details
            </span>
            <span className={`text-sm ${currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Review
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Step 1: Category Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose a Category</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <label
                        key={category.value}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.category === category.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={formData.category === category.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="font-semibold text-gray-900 mb-2">{category.label}</div>
                        <div className="text-sm text-gray-600">
                          {category.subcategories.slice(0, 3).join(', ')}
                          {category.subcategories.length > 3 && '...'}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.category && selectedCategory && (
                  <div>
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subcategory</option>
                      {selectedCategory.subcategories.map((sub) => (
                        <option key={sub} value={sub.toLowerCase()}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Ad Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ad Details</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    maxLength={80}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What are you selling/offering?"
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.title.length}/80 characters</p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    maxLength={4000}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Provide details about your item/service..."
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/4000 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Price Type
                    </label>
                    <select
                      id="priceType"
                      name="priceType"
                      value={formData.priceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="fixed">Fixed Price</option>
                      <option value="negotiable">Negotiable</option>
                      <option value="free">Free</option>
                      <option value="trade">Open to Trade</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>

                {formData.category === 'for-sale' && (
                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="w-4 h-4 inline mr-1" />
                      Condition
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select condition</option>
                      <option value="new">New</option>
                      <option value="like-new">Like New</option>
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="w-4 h-4 inline mr-1" />
                    Images (Optional, up to 5)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Select Images
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact & Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information & Review</h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>Email only</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={formData.contactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>Phone only</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="both"
                            checked={formData.contactMethod === 'both'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span>Both email and phone</span>
                        </label>
                      </div>
                    </div>

                    {(formData.contactMethod === 'phone' || formData.contactMethod === 'both') && (
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Ad Preview */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Preview</h3>
                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{formData.title || 'Your Ad Title'}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                        {formData.subcategory || 'Category'}
                      </span>
                      <span>{formData.location || 'Location'}</span>
                      <span>Just now</span>
                    </div>
                    {formData.price && (
                      <div className="text-2xl font-bold text-blue-600 mb-3">
                        ${formData.price} {formData.priceType !== 'fixed' && `(${formData.priceType})`}
                      </div>
                    )}
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {formData.description || 'Your ad description will appear here...'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!formData.category || !formData.subcategory)) ||
                    (currentStep === 2 && (!formData.title || !formData.description || !formData.location))
                  }
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Post Ad
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdPage;