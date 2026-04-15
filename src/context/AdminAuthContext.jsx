import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if admin is already logged in on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (id, password) => {
    // Simple validation - you can make this more secure with backend validation
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (id === adminId && password === adminPassword) {
      localStorage.setItem('adminAuth', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsLoggedIn(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
