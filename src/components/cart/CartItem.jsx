import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, Trash2, Bookmark } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, moveToSavedForLater } = useCart();
  const { book, quantity, format } = item;

  const handleIncrement = () => {
    updateQuantity(book.id, format, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(book.id, format, quantity - 1);
  };

  const lineTotal = (book.price * quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700">
      {/* Cover Image */}
      <Link
        to={`/books/${book.id}`}
        className="w-20 sm:w-24 aspect-[2/3] shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-book self-start"
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </Link>

      {/* Item info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/books/${book.id}`}
              className="text-base font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1"
            >
              {book.title}
            </Link>
            <span className="text-base font-black text-slate-900 dark:text-white shrink-0">
              ${lineTotal}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            by {book.author}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
              {format}
            </span>
            <span className="text-xs text-slate-400">
              ${book.price.toFixed(2)} each
            </span>
          </div>
        </div>

        {/* Quantity Controls & Removal */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap">
          {/* Counter */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-900 dark:text-white min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= book.stock}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => moveToSavedForLater(book.id, format)}
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="Save for Later"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save for Later</span>
            </button>
            <button
              onClick={() => removeFromCart(book.id, format)}
              className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:text-rose-600 transition-colors"
              title="Remove from Cart"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
