import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Heart, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for subscribing to the PageTurner Book Club!');
    setEmail('');
  };

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Page<span className="text-primary-400">Turner</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curating exceptional reading experiences. Discover timeless classics, groundbreaking
              science fiction, cutting-edge technology guides, and transformative non-fiction.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                Join our Book Club Newsletter
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl max-w-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You're subscribed! Enjoy 10% off with promo code <strong>READ10</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address..."
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Genres */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Top Genres
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Technology & Software
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Science Fiction & Fantasy
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Business & Economics
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Self-Help & Mindset
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition-colors">
                  Mystery & Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>24/7 Dedicated Reader Support</li>
              <li>Free Shipping on Orders $35+</li>
              <li>30-Day Hassle-Free Returns</li>
              <li>100% Genuine Print Guarantee</li>
              <li className="text-xs pt-2 text-slate-500">
                Contact: support@pageturner.read
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 PageTurner Books Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for book lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
