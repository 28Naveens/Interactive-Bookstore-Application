import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bookstore_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookstore_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to sync wishlist with localStorage', e);
    }
  }, [wishlist]);

  const toggleWishlist = (book) => {
    const exists = wishlist.some((item) => item.id === book.id);
    if (exists) {
      toast.info(`Removed "${book.title}" from your wishlist`);
      setWishlist(wishlist.filter((item) => item.id !== book.id));
    } else {
      toast.success(`Added "${book.title}" to your wishlist!`);
      setWishlist([...wishlist, book]);
    }
  };

  const isInWishlist = (bookId) => {
    return wishlist.some((item) => item.id === bookId);
  };

  const removeFromWishlist = (bookId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== bookId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
