import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Modal from '../common/Modal';
import StarRating from '../common/StarRating';
import Badge from '../common/Badge';
import { ShoppingCart, Heart, ArrowRight, Plus, Minus, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewBook, closeQuickView } = useBooks();
  const { addToCart, cartItems } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedFormat, setSelectedFormat] = useState('Paperback');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewBook) return null;

  const isFavorited = isInWishlist(quickViewBook.id);
  const existingCartItem = cartItems.find(
    (item) => item.book.id === quickViewBook.id && item.format === selectedFormat
  );

  const handleFormatChange = (fmt) => {
    setSelectedFormat(fmt);
    setQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(quickViewBook.stock, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(quickViewBook, quantity, selectedFormat);
  };

  return (
    <Modal
      isOpen={!!quickViewBook}
      onClose={closeQuickView}
      title="Quick Book Overview"
      maxWidth="max-w-2xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Cover image & badges */}
        <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-book">
          <img
            src={quickViewBook.coverImage}
            alt={quickViewBook.title}
            className="w-full h-full object-cover"
          />
          {quickViewBook.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="purple">{quickViewBook.badge}</Badge>
            </div>
          )}
          <button
            onClick={() => toggleWishlist(quickViewBook)}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-colors ${
              isFavorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Book details */}
        <div className="flex flex-col">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
            {quickViewBook.category}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {quickViewBook.title}
          </h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            by {quickViewBook.author}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={quickViewBook.rating} />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {quickViewBook.rating}
            </span>
            <span className="text-xs text-slate-400">({quickViewBook.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              ${quickViewBook.price.toFixed(2)}
            </span>
            {quickViewBook.originalPrice && (
              <span className="text-base text-slate-400 line-through">
                ${quickViewBook.originalPrice.toFixed(2)}
              </span>
            )}
            {quickViewBook.discountPercent && (
              <Badge variant="success">Save {quickViewBook.discountPercent}%</Badge>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
            {quickViewBook.description}
          </p>

          {/* Formats Selection */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Select Format
            </label>
            <div className="flex flex-wrap gap-2">
              {quickViewBook.formats.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => handleFormatChange(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedFormat === fmt
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Controls & Add to Cart */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= quickViewBook.stock}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
              >
                {existingCartItem ? (
                  <>
                    <Check className="w-4 h-4" /> Add More ({existingCartItem.quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>

            <Link
              to={`/books/${quickViewBook.id}`}
              onClick={closeQuickView}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 group"
            >
              <span>View Full Book Details & Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
