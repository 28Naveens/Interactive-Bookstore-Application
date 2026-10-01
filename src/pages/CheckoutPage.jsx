import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  Wallet,
  Banknote,
  Loader2,
} from 'lucide-react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, subtotal, discount, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery, 3: Payment
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Shipping details state (prefill from user if available)
  const defaultAddr = user?.addresses && user.addresses[0];
  const [shippingAddress, setShippingAddress] = useState({
    fullName: defaultAddr?.fullName || user?.name || '',
    email: user?.email || '',
    phone: defaultAddr?.phone || '+1 (555) 019-2834',
    street: defaultAddr?.street || '104 Innovation Way, Suite 400',
    city: defaultAddr?.city || 'San Francisco',
    state: defaultAddr?.state || 'CA',
    zipCode: defaultAddr?.zipCode || '94105',
    country: defaultAddr?.country || 'United States',
  });

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState({
    id: 'standard',
    name: 'Standard Ground Delivery',
    fee: 0,
    days: 4,
    description: '3 - 5 business days',
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState({
    type: 'card', // 'card' | 'upi' | 'cod'
    cardNumber: '•••• •••• •••• 4242',
    cardName: user?.name || 'Alex Turner',
    expiry: '12/28',
    cvc: '789',
    upiId: '',
  });

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500">
          You don't have any items in your cart to checkout.
        </p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod({ ...paymentMethod, [e.target.name]: e.target.value });
  };

  const validateShipping = () => {
    const { fullName, email, phone, street, city, state, zipCode } = shippingAddress;
    if (!fullName || !email || !phone || !street || !city || !state || !zipCode) {
      toast.error('Please complete all required shipping address fields.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateShipping()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateShipping()) {
      setStep(1);
      return;
    }

    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderFinalTotal = Number(
        (subtotal - discount + tax + shippingMethod.fee).toFixed(2)
      );

      const createdOrder = placeOrder({
        items: cartItems,
        shippingAddress,
        shippingMethod,
        paymentMethod,
        totals: {
          subtotal,
          discount,
          shippingFee: shippingMethod.fee,
          tax,
          total: orderFinalTotal,
        },
      });

      clearCart();
      setIsSubmitting(false);
      toast.success('Your order has been placed successfully!');
      navigate(`/order-success/${createdOrder.id}`);
    }, 1200);
  };

  const finalOrderTotal = Number(
    (subtotal - discount + tax + shippingMethod.fee).toFixed(2)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Progress Steps */}
      <div className="flex items-center justify-center max-w-xl mx-auto pb-4">
        {[
          { num: 1, label: 'Shipping' },
          { num: 2, label: 'Delivery' },
          { num: 3, label: 'Payment' },
        ].map((item, idx) => (
          <React.Fragment key={item.num}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => item.num < step && setStep(item.num)}
                disabled={item.num > step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === item.num
                    ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-950'
                    : step > item.num
                    ? 'bg-emerald-600 text-white cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {step > item.num ? <CheckCircle2 className="w-4 h-4" /> : item.num}
              </button>
              <span
                className={`text-xs font-semibold ${
                  step === item.num
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
            {idx < 2 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors ${
                  step > item.num ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-step Checkout Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Shipping Details
                    </h3>
                    <p className="text-xs text-slate-400">Where should we deliver your books?</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    required
                    placeholder="Alex Turner"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleShippingChange}
                    required
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleShippingChange}
                    required
                    placeholder="123 Literary Way, Apt 4B"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    required
                    placeholder="San Francisco"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleShippingChange}
                    required
                    placeholder="CA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    ZIP / Postal Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleShippingChange}
                    required
                    placeholder="94105"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleShippingChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <span>Continue to Shipping Method</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping / Delivery Options */}
          {step === 2 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Delivery Method
                    </h3>
                    <p className="text-xs text-slate-400">Choose your preferred shipping speed</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'standard',
                    name: 'Standard Ground Delivery',
                    fee: 0,
                    days: 4,
                    description: 'Estimated 3 - 5 business days with package tracking',
                  },
                  {
                    id: 'express',
                    name: 'Express 2-Day Air',
                    fee: 8.99,
                    days: 2,
                    description: 'Delivered in 2 business days with priority handling',
                  },
                  {
                    id: 'priority',
                    name: 'Overnight Priority',
                    fee: 18.99,
                    days: 1,
                    description: 'Next business day morning delivery guaranteed',
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod.id === opt.id
                        ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod.id === opt.id}
                        onChange={() => setShippingMethod(opt)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {opt.name}
                        </p>
                        <p className="text-xs text-slate-400">{opt.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {opt.fee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `$${opt.fee.toFixed(2)}`
                      )}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Payment Options
                    </h3>
                    <p className="text-xs text-slate-400">Secure 256-bit encrypted checkout</p>
                  </div>
                </div>
              </div>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod({ ...paymentMethod, type: 'card' })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold gap-1.5 transition-all ${
                    paymentMethod.type === 'card'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod({ ...paymentMethod, type: 'upi' })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold gap-1.5 transition-all ${
                    paymentMethod.type === 'upi'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-indigo-600" />
                  <span>UPI / NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod({ ...paymentMethod, type: 'cod' })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold gap-1.5 transition-all ${
                    paymentMethod.type === 'cod'
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod.type === 'card' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentMethod.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        Expiration (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentMethod.expiry}
                        onChange={handlePaymentChange}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                        CVC Security Code
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          name="cvc"
                          value={paymentMethod.cvc}
                          onChange={handlePaymentChange}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentMethod.cardName}
                      onChange={handlePaymentChange}
                      placeholder="Alex Turner"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod.type === 'upi' && (
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    UPI ID / Virtual Payment Address
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={paymentMethod.upiId}
                    onChange={handlePaymentChange}
                    placeholder="username@okhdfcbank or user@upi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-slate-400">
                    A payment request will be triggered on your UPI app upon placing order.
                  </p>
                </div>
              )}

              {paymentMethod.type === 'cod' && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white">Cash on Delivery</p>
                  <p>Pay in cash or UPI scan when your books arrive at your doorstep.</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl text-sm font-bold transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order (${finalOrderTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Review Sidebar */}
        <div className="lg:col-span-4 sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            Order Review ({cartItems.length} items)
          </h3>

          {/* Book items preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={`${item.book.id}-${item.format}`}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-9 h-12 object-cover rounded-md shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {item.book.title}
                    </p>
                    <p className="text-slate-400">
                      Qty: {item.quantity} • {item.format}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-white shrink-0">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promotional Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Shipping ({shippingMethod.name})</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {shippingMethod.fee === 0 ? (
                  <span className="text-emerald-600">FREE</span>
                ) : (
                  `$${shippingMethod.fee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${tax.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Total Due
              </span>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                ${finalOrderTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
