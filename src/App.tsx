import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));
const HousingPage = lazy(() => import('./pages/HousingPage'));
const ForumsPage = lazy(() => import('./pages/ForumsPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));
const ForumDetailPage = lazy(() => import('./pages/ForumDetailPage'));
const PostAdPage = lazy(() => import('./pages/PostAdPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const HouseDetailPage = lazy(() => import('./pages/HouseDetailPage'));
const ServicesDetailPage = lazy(() => import('./pages/ServicesDetailPage'));
const EventsDetailPage = lazy(() => import('./pages/EventsDetailPage'));
import { UserProvider } from './context/UserContext';
import { BookmarkProvider } from './context/BookmarkContext';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BookmarkProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            {/* Scroll to top on route change */}
            <ScrollToTop />
            <main className="flex-1">
              <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/housing" element={<HousingPage />} />
                  <Route path="/forums" element={<ForumsPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/jobs/:id" element={<JobDetailPage />} />
                  <Route path="/post-ad" element={<PostAdPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/forums/:id" element={<ForumDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/house/:id" element={<HouseDetailPage />} />
                  <Route path="/services/:id" element={<ServicesDetailPage />} />
                  <Route path="/events/:id" element={<EventsDetailPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </BookmarkProvider>
  );
}

export default App;