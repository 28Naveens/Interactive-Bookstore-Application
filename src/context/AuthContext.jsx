import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'usr-demo-01',
  name: 'Alex Turner',
  email: 'alex.reader@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'Premium Member',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Alex Turner',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704',
      country: 'United States',
      phone: '+1 (555) 234-5678',
      isDefault: true,
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: 'login', // 'login' | 'register'
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('bookstore_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('bookstore_user');
      }
    } catch (e) {
      console.error('Failed to sync user state with localStorage', e);
    }
  }, [user]);

  const login = (email, password) => {
    // If demo credentials or any valid looking email
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return false;
    }
    const loggedUser = {
      ...DEMO_USER,
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };
    setUser(loggedUser);
    toast.success(`Welcome back, ${loggedUser.name}!`);
    closeAuthModal();
    return true;
  };

  const demoLogin = () => {
    setUser(DEMO_USER);
    toast.success(`Welcome back, ${DEMO_USER.name}! Logged in as Demo Reader.`);
    closeAuthModal();
    return true;
  };

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) {
      toast.error('Please fill in all registration fields.');
      return false;
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'Member',
      addresses: [],
    };
    setUser(newUser);
    toast.success(`Welcome to PageTurner, ${name}! Your account has been created.`);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info('You have logged out successfully.');
  };

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
    toast.success('Profile updated successfully.');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        demoLogin,
        register,
        logout,
        updateProfile,
        authModal,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
