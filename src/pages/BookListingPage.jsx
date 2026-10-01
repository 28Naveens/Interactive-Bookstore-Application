import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookFilter from '../components/books/BookFilter';
import BookGrid from '../components/books/BookGrid';
import QuickViewModal from '../components/books/QuickViewModal';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  BookOpen,
} from 'lucide-react';

export const BookListingPage = () => {
  const {
    filteredBooks,
    books,
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
    resetFilters,
  } = useBooks();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filters list
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    priceRange[1] < 60 ||
    minRating > 0 ||
    inStockOnly ||
    selectedFormat !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <QuickViewModal />

      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-primary-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-300">
            Full Catalog & Collections
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Browse All Books
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Discover thousands of bestselling novels, technical architecture guides,
            thought-provoking biographies, and mindful self-improvement literature.
          </p>
        </div>

        {/* Ambient background book icon */}
        <BookOpen className="w-64 h-64 absolute -bottom-16 -right-16 text-white/5 pointer-events-none" />
      </div>

      {/* Control Bar: Results count, sorting, view toggle, mobile filter trigger */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Count & Mobile trigger */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary-600" />
            )}
          </button>

          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredBooks.length}</span> of {books.length} books
          </p>
        </div>

        {/* Right: Sort & Layout toggles */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Releases</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="List view"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs font-semibold text-slate-400">Active Filters:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')} aria-label="Clear category">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          {priceRange[1] < 60 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              Max Price: ${priceRange[1]}
              <button onClick={() => setPriceRange([0, 60])} aria-label="Clear price">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          {minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              Min {minRating} ★
              <button onClick={() => setMinRating(0)} aria-label="Clear rating">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} aria-label="Clear stock">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          {selectedFormat !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-medium border border-primary-200 dark:border-primary-800">
              Format: {selectedFormat}
              <button onClick={() => setSelectedFormat('All')} aria-label="Clear format">
                <X className="w-3 h-3 hover:text-primary-900" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content Layout: Filters Sidebar + Book Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <BookFilter />
        </aside>

        {/* Mobile Filter Drawer / Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl overflow-y-auto max-h-[90vh] my-auto mx-auto shadow-2xl p-4">
              <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white">Filter Books</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <BookFilter isMobile onCloseMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        )}

        {/* Book Grid */}
        <main className="lg:col-span-3">
          <BookGrid books={filteredBooks} viewMode={viewMode} />
        </main>
      </div>
    </div>
  );
};

export default BookListingPage;
