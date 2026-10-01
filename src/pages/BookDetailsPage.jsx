import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/common/StarRating';
import Badge from '../components/common/Badge';
import ReviewSection from '../components/books/ReviewSection';
import BookCard from '../components/books/BookCard';
import {
  ShoppingCart,
  Heart,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  BookOpen,
  Calendar,
  Layers,
  Building2,
  Barcode,
  Globe,
  Plus,
  Minus,
  Check,
  Zap,
} from 'lucide-react';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, books } = useBooks();
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const book = getBookById(id);

  const [selectedFormat, setSelectedFormat] = useState('Paperback');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'author' | 'reviews'

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Book Not Found
        </h2>
        <p className="text-slate-500">
          The book you are looking for does not exist or may have been removed.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Return to Books Catalog
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(book.id);
  const cartItem = cartItems.find(
    (item) => item.book.id === book.id && item.format === selectedFormat
  );

  const handleQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(book.stock, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(book, quantity, selectedFormat);
  };

  const handleBuyNow = () => {
    addToCart(book, quantity, selectedFormat);
    navigate('/checkout');
  };

  // Related books from same category
  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap pb-1">
        <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/books" className="hover:text-primary-600 dark:hover:text-primary-400">
          Books
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary-600 dark:text-primary-400">{book.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-xs">
          {book.title}
        </span>
      </nav>

      {/* Main Book Detail Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Book Cover */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-800">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover object-center"
            />
            {book.badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="purple" className="text-xs px-3 py-1">
                  {book.badge}
                </Badge>
              </div>
            )}
            <button
              onClick={() => toggleWishlist(book)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                isFavorited
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
              }`}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Value props under book image */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto">
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-primary-600 mx-auto" />
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Fast Shipping</p>
              <p className="text-[10px] text-slate-400">2-4 business days</p>
            </div>
            <div className="space-y-1 border-x border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Verified Print</p>
              <p className="text-[10px] text-slate-400">100% Authentic</p>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 text-amber-600 mx-auto" />
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Easy Returns</p>
              <p className="text-[10px] text-slate-400">30-day money back</p>
            </div>
          </div>
        </div>

        {/* Right Column: Information, Pricing, Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{book.category}</Badge>
              <span className="text-xs text-slate-400">Published in {book.publishedYear}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {book.title}
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 font-medium">
              by <span className="font-bold text-slate-900 dark:text-white underline decoration-primary-400">{book.author}</span>
            </p>
          </div>

          {/* Rating & Reviews anchor */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <StarRating rating={book.rating} size="w-4 h-4" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {book.rating}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              {book.reviewCount} Verified Customer Ratings
            </button>
          </div>

          {/* Price & Stock */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice && (
              <span className="text-lg text-slate-400 line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
            {book.discountPercent && (
              <Badge variant="success">Save {book.discountPercent}%</Badge>
            )}
          </div>

          {/* Stock Indicator */}
          <div>
            {book.stock > 10 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                In Stock ({book.stock} copies available ready to ship)
              </span>
            ) : book.stock > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Low Stock: Only {book.stock} copies remaining!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600">
                Out of Stock
              </span>
            )}
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Edition & Format
            </label>
            <div className="flex flex-wrap gap-3">
              {book.formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    selectedFormat === fmt
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleQuantity(-1)}
                  disabled={quantity <= 1}
                  className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 dark:text-white min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantity(1)}
                  disabled={quantity >= book.stock}
                  className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={book.stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-md transition-all duration-200 text-sm"
              >
                {cartItem ? (
                  <>
                    <Check className="w-4 h-4" /> In Cart ({cartItem.quantity}) - Add More
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={book.stock <= 0}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl shadow-md transition-all duration-200 text-sm"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Buy Now — Instant Checkout</span>
            </button>
          </div>

          {/* Quick Specifications Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Layers className="w-4 h-4 text-primary-500 shrink-0" />
              <div>
                <span className="block font-bold text-slate-900 dark:text-white">{book.pages}</span>
                <span className="text-[11px]">Pages</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Globe className="w-4 h-4 text-primary-500 shrink-0" />
              <div>
                <span className="block font-bold text-slate-900 dark:text-white">{book.language}</span>
                <span className="text-[11px]">Language</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Building2 className="w-4 h-4 text-primary-500 shrink-0" />
              <div>
                <span className="block font-bold text-slate-900 dark:text-white truncate max-w-[100px]">{book.publisher}</span>
                <span className="text-[11px]">Publisher</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Barcode className="w-4 h-4 text-primary-500 shrink-0" />
              <div>
                <span className="block font-bold text-slate-900 dark:text-white font-mono text-[11px] truncate max-w-[100px]">{book.isbn}</span>
                <span className="text-[11px]">ISBN-13</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Author, Reviews */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 overflow-x-auto">
          {[
            { id: 'description', label: 'Synopsis & Description' },
            { id: 'specs', label: 'Book Details' },
            { id: 'author', label: 'About the Author' },
            { id: 'reviews', label: `Reviews (${book.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'description' && (
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
              <p className="text-base font-medium text-slate-800 dark:text-slate-200">
                {book.description}
              </p>
              <p className="text-sm">
                {book.synopsis || book.description}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl">
              <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-3 font-semibold text-slate-500 w-1/3">Title</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.title}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Author</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.author}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Category</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.category}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Publisher</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.publisher}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Publication Year</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.publishedYear}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Print Length</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.pages} pages</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">ISBN-13</td>
                    <td className="py-3 text-slate-900 dark:text-white font-mono">{book.isbn}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-slate-500">Language</td>
                    <td className="py-3 text-slate-900 dark:text-white font-medium">{book.language}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'author' && (
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-black flex items-center justify-center text-lg">
                  {book.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {book.author}
                  </h4>
                  <p className="text-xs text-slate-400">Featured Author</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {book.authorBio ||
                  `${book.author} is a renowned author acclaimed globally for their insightful work in ${book.category}. Their publications have reached millions of readers worldwide.`}
              </p>
            </div>
          )}

          {activeTab === 'reviews' && <ReviewSection book={book} />}
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Readers Also Explored in {book.category}
            </h3>
            <Link
              to="/books"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((related) => (
              <BookCard key={related.id} book={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
