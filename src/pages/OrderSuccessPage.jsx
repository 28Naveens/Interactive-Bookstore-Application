import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
} from 'lucide-react';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(orderId);

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore if unsupported
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Order Not Found
        </h2>
        <p className="text-slate-500">
          We could not find an order matching #{orderId}.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedDelivery = new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Celebratory Header */}
      <div className="text-center space-y-3 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Payment & Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Thank You For Your Order!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          We’ve received your order and are preparing your books for dispatch. A confirmation receipt has been generated.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300">
          <span>Order ID:</span>
          <span className="font-bold text-slate-900 dark:text-white">{order.id}</span>
        </div>
      </div>

      {/* Delivery Tracking Stepper */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Estimated Delivery
            </h3>
          </div>
          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
            {formattedDelivery}
          </span>
        </div>

        {/* Stepper Steps */}
        <div className="grid grid-cols-4 gap-2 pt-2 text-center">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Placed</p>
            <p className="text-[10px] text-slate-400">{formattedDate}</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto text-xs font-bold shadow-sm animate-pulse">
              <Package className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Processing</p>
            <p className="text-[10px] text-slate-400">Preparing parcel</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Shipped</p>
            <p className="text-[10px] text-slate-400">In transit</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Delivered</p>
            <p className="text-[10px] text-slate-400">At doorstep</p>
          </div>
        </div>
      </div>

      {/* Invoice Receipt Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Order Receipt & Breakdown
          </h3>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Shipping Destination</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              {order.shippingAddress.street}
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="text-slate-500">{order.shippingAddress.phone}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Details</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white text-sm capitalize">
              {order.paymentMethod.type === 'card' ? 'Credit Card' : order.paymentMethod.type === 'upi' ? 'UPI' : 'Cash on Delivery'}
            </p>
            {order.paymentMethod.type === 'card' && (
              <p className="text-slate-600 dark:text-slate-300 font-mono">
                {order.paymentMethod.cardNumber}
              </p>
            )}
            <p className="text-slate-400">Status: Paid & Verified</p>
          </div>
        </div>

        {/* Purchased Items Table */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Purchased Books
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item) => (
              <div
                key={`${item.book.id}-${item.format}`}
                className="py-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-10 h-14 object-cover rounded-lg shadow-2xs"
                  />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.book.title}
                    </p>
                    <p className="text-slate-400">
                      by {item.book.author} • {item.format} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Totals */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              ${order.totals.subtotal.toFixed(2)}
            </span>
          </div>
          {order.totals.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Discount</span>
              <span>-${order.totals.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Shipping</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {order.totals.shippingFee === 0 ? 'FREE' : `$${order.totals.shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Tax</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              ${order.totals.tax.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-baseline pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Total Amount
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ${order.totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          to="/orders"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl text-xs text-center transition-colors"
        >
          View All Orders
        </Link>
        <Link
          to="/books"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
