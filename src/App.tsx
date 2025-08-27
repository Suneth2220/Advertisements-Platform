import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import MarketplacePage from './pages/MarketplacePage';
import JobsPage from './pages/JobsPage';
import HousingPage from './pages/HousingPage';
import ForumsPage from './pages/ForumsPage';
import EventsPage from './pages/EventsPage';
import PostAdPage from './pages/PostAdPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
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
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/housing" element={<HousingPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/post-ad" element={<PostAdPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
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