import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import {
  PackageCheck,
  Calendar,
  ExternalLink,
  Repeat,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

export const OrderHistoryPage = () => {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleOrderAgain = (order) => {
    order.items.forEach((item) => {
      addToCart(item.book, item.quantity, item.format);
    });
    toast.success(`Added items from order ${order.id} back to your cart!`);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            No Orders Yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            You haven't placed any book orders yet. Start exploring our rich catalog and fill your bookshelves!
          </p>
        </div>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
        >
          <span>Browse Books Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Order History ({orders.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review your previous book orders, check status, print invoices, and re-order favorites.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const dateStr = new Date(order.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <PackageCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {order.id}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>Placed on {dateStr}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {order.status}
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    ${order.totals.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items List in Order */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {order.items.map((item) => (
                  <div
                    key={`${item.book.id}-${item.format}`}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-12 h-16 object-cover rounded-lg shadow-2xs shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/books/${item.book.id}`}
                          className="text-sm font-bold text-slate-900 dark:text-white hover:text-primary-600 truncate block"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-xs text-slate-400">
                          by {item.book.author} • Format: {item.format} • Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 shrink-0">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-3">
                <p className="text-xs text-slate-400">
                  Shipped to: <strong className="text-slate-700 dark:text-slate-300">{order.shippingAddress.fullName}</strong> ({order.shippingAddress.city}, {order.shippingAddress.state})
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOrderAgain(order)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Order Again</span>
                  </button>
                  <Link
                    to={`/order-success/${order.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
