import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';
import AboutPage from './pages/AboutPage';
import NewsletterConfirmPage from './pages/NewsletterConfirmPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import SearchOverlay from './components/overlays/SearchOverlay';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { AdminAuthProvider } from './context/AdminAuthContext';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  return (
    <AdminAuthProvider>
      <>
        <ScrollToTop />
        <SearchOverlay open={searchOpen} onClose={closeSearch} />
        <Routes>
          <Route path="/" element={<HomePage onOpenSearch={openSearch} />} />
          <Route path="/blog/:id" element={<BlogDetailPage onOpenSearch={openSearch} />} />
          <Route path="/about" element={<AboutPage onOpenSearch={openSearch} />} />
          <Route path="/newsletter/confirm" element={<NewsletterConfirmPage onOpenSearch={openSearch} />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route 
            path="/admin/panel" 
            element={
              <ProtectedAdminRoute>
                <AdminPanelPage />
              </ProtectedAdminRoute>
            } 
          />
          
          <Route path="*" element={<HomePage onOpenSearch={openSearch} />} />
        </Routes>
      </>
    </AdminAuthProvider>
  );
}
