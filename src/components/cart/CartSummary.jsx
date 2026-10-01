import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Tag, ArrowRight, ShieldCheck, Truck, Check, X } from 'lucide-react';

export const CartSummary = () => {
  const {
    subtotal,
    discount,
    shippingFee,
    tax,
    total,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    isFreeShipping,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const freeShippingThreshold = 35;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal).toFixed(2);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      if (applyPromoCode(promoInput)) {
        setPromoInput('');
      }
    }
  };

  const handleQuickPromo = (code) => {
    applyPromoCode(code);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        Order Summary
      </h3>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Truck className="w-4 h-4 text-primary-600 shrink-0" />
          {isFreeShipping ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              🎉 Congratulations! You qualify for FREE shipping.
            </span>
          ) : (
            <span>
              Add <span className="font-bold text-primary-600">${amountNeededForFreeShipping}</span> more for FREE standard shipping!
            </span>
          )}
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isFreeShipping ? 'bg-emerald-500' : 'bg-primary-600'
            }`}
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Promo Code Form */}
      <div>
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (e.g. READ10)"
              className="w-full pl-9 pr-3 py-2 text-xs font-medium uppercase rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
          >
            Apply
          </button>
        </form>

        {/* Suggested Promos Quick Badges */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[11px] text-slate-500">
          <span>Try:</span>
          {['READ10', 'WELCOME20', 'FREESHIP'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => handleQuickPromo(code)}
              className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 text-primary-600 dark:text-primary-400 transition-colors"
            >
              {code}
            </button>
          ))}
        </div>

        {/* Applied promo badge */}
        {appliedPromo && (
          <div className="flex items-center justify-between mt-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>
                <strong>{appliedPromo.code}</strong> applied ({appliedPromo.description})
              </span>
            </div>
            <button
              type="button"
              onClick={removePromoCode}
              className="p-1 hover:text-emerald-950 dark:hover:text-white"
              aria-label="Remove promo code"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Discount ({appliedPromo?.code})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {shippingFee === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
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
          <div>
            <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
            <p className="text-[11px] text-slate-400">Including all taxes and shipping</p>
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout CTA */}
      <Link
        to="/checkout"
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Trust & Guarantee */}
      <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>256-bit Bank-grade Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;
