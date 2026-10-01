import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Bookmark,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const CartPage = () => {
  const {
    cartItems,
    clearCart,
    savedForLater,
    moveToCartFromSaved,
    removeSavedItem,
  } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      clearCart();
    }
  };

  // If cart is empty and no saved items
  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingCart className="w-12 h-12" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Your Shopping Cart is Empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Looks like you haven't added any books to your cart yet. Explore our curated catalog and discover your next great read.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Books Now</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your selected titles, enter coupons, and proceed to secure checkout.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Main Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                You have no active items in your cart.
              </p>
              <Link
                to="/books"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:underline"
              >
                <span>Browse books to add</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={`${item.book.id}-${item.format}`}
                item={item}
              />
            ))
          )}

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Saved for Later ({savedForLater.length})
                </h3>
              </div>

              <div className="space-y-3">
                {savedForLater.map((saved) => (
                  <div
                    key={`${saved.book.id}-${saved.format}`}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={saved.book.coverImage}
                        alt={saved.book.title}
                        className="w-12 h-16 object-cover rounded-lg shadow-sm shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/books/${saved.book.id}`}
                          className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary-600 truncate block"
                        >
                          {saved.book.title}
                        </Link>
                        <p className="text-xs text-slate-400">by {saved.book.author}</p>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          ${saved.book.price.toFixed(2)} • {saved.format}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => moveToCartFromSaved(saved.book.id, saved.format)}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 hover:bg-primary-100 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(saved.book.id, saved.format)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
