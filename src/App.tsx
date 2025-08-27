import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import ForSalePage from './pages/ForSalePage';
import JobsPage from './pages/JobsPage';
import HousingPage from './pages/HousingPage';
import ForumsPage from './pages/ForumsPage';
import EventsPage from './pages/EventsPage';
import PostAdPage from './pages/PostAdPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import AdminPanel from './pages/AdminPanel';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/for-sale" element={<ForSalePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/housing" element={<HousingPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/post-ad" element={<PostAdPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;