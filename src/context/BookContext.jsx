import React, { createContext, useContext, useState, useMemo } from 'react';
import { BOOKS_DATA, CATEGORIES } from '../data/booksData';
import { useToast } from './ToastContext';

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const { toast } = useToast();
  const [books, setBooks] = useState(BOOKS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 60]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [quickViewBook, setQuickViewBook] = useState(null);

  // Add review to a book
  const addReview = (bookId, review) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === bookId) {
          const newReviews = [review, ...(b.reviews || [])];
          const newTotalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAverageRating = Number((newTotalRating / newReviews.length).toFixed(1));
          return {
            ...b,
            reviews: newReviews,
            rating: newAverageRating,
            reviewCount: (b.reviewCount || 0) + 1,
          };
        }
        return b;
      })
    );
    toast.success('Thank you! Your review has been published.');
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange([0, 60]);
    setMinRating(0);
    setInStockOnly(false);
    setSelectedFormat('All');
    setSortBy('popular');
  };

  // Filtered and sorted books computation
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Search query check
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = book.title.toLowerCase().includes(query);
          const matchesAuthor = book.author.toLowerCase().includes(query);
          const matchesCategory = book.category.toLowerCase().includes(query);
          const matchesIsbn = book.isbn ? book.isbn.toLowerCase().includes(query) : false;
          if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesIsbn) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && book.category !== selectedCategory) {
          return false;
        }

        // Price range filter
        if (book.price < priceRange[0] || book.price > priceRange[1]) {
          return false;
        }

        // Rating filter
        if (minRating > 0 && book.rating < minRating) {
          return false;
        }

        // In-stock only filter
        if (inStockOnly && book.stock <= 0) {
          return false;
        }

        // Format filter
        if (selectedFormat !== 'All' && !book.formats.includes(selectedFormat)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return b.publishedYear - a.publishedYear;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'popular':
          default:
            return (b.reviewCount || 0) - (a.reviewCount || 0);
        }
      });
  }, [
    books,
    searchQuery,
    selectedCategory,
    priceRange,
    minRating,
    inStockOnly,
    selectedFormat,
    sortBy,
  ]);

  const openQuickView = (book) => setQuickViewBook(book);
  const closeQuickView = () => setQuickViewBook(null);

  const getBookById = (id) => books.find((b) => b.id === id) || null;

  return (
    <BookContext.Provider
      value={{
        books,
        categories: CATEGORIES,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        minRating,
        setMinRating,
        inStockOnly,
        setInStockOnly,
        selectedFormat,
        setSelectedFormat,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        filteredBooks,
        resetFilters,
        addReview,
        quickViewBook,
        openQuickView,
        closeQuickView,
        getBookById,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
