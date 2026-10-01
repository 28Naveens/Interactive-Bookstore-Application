import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useBooks } from '../../context/BookContext';
import StarRating from '../common/StarRating';
import Badge from '../common/Badge';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';

export const BookCard = ({ book, viewMode = 'grid' }) => {
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useBooks();

  const isFavorited = isInWishlist(book.id);
  const isInCart = cartItems.some((item) => item.book.id === book.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1, book.formats[0]);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(book);
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        {/* Cover Thumbnail */}
        <div className="relative w-full sm:w-40 sm:h-52 shrink-0 aspect-[2/3] sm:aspect-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-book">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {book.badge && (
            <div className="absolute top-2 left-2">
              <Badge variant="purple">{book.badge}</Badge>
            </div>
          )}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              {book.category}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {book.publishedYear}
            </span>
          </div>

          <Link to={`/books/${book.id}`} className="group-hover:text-primary-600 transition-colors">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
              {book.title}
            </h3>
          </Link>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            by {book.author}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
            {book.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={book.rating} />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {book.rating}
            </span>
            <span className="text-xs text-slate-400">({book.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {book.formats.map((fmt) => (
              <span
                key={fmt}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="w-full sm:w-48 shrink-0 flex flex-col justify-between sm:items-end border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-5 self-stretch">
          <div>
            <div className="flex items-baseline sm:justify-end gap-2 mb-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {book.discountPercent && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Save {book.discountPercent}%
              </span>
            )}
            <p className="text-xs text-slate-500 mt-1 sm:text-right">
              {book.stock > 10 ? (
                <span className="text-emerald-600 font-medium">In Stock</span>
              ) : (
                <span className="text-amber-600 font-medium">Only {book.stock} left!</span>
              )}
            </p>
          </div>

          <div className="flex sm:flex-col gap-2 mt-4 w-full">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" /> Added ({cartItems.find((i) => i.book.id === book.id)?.quantity})
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
            <button
              onClick={handleQuickView}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Cover Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link to={`/books/${book.id}`} className="block w-full h-full">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badge */}
        {book.badge && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Badge variant="purple">{book.badge}</Badge>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isFavorited
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:scale-110'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Quick View Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-lg whitespace-nowrap transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-xs mb-1.5 text-slate-500 dark:text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            {book.category}
          </span>
          <span>{book.publishedYear}</span>
        </div>

        <Link to={`/books/${book.id}`} className="group-hover:text-primary-600 transition-colors">
          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 mb-1 text-base">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2.5">
          by {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={book.rating} size="w-3.5 h-3.5" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {book.rating}
          </span>
          <span className="text-[11px] text-slate-400">({book.reviewCount})</span>
        </div>

        {/* Price & Cart CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {book.stock <= 10 && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                Only {book.stock} left!
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm flex items-center justify-center ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white active:scale-95'
            }`}
            title={isInCart ? 'In cart - click to add another' : 'Add to cart'}
            aria-label={`Add ${book.title} to cart`}
          >
            {isInCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
