import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';
import BookCard from '../components/books/BookCard';
import QuickViewModal from '../components/books/QuickViewModal';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Truck,
  ShieldCheck,
  RefreshCw,
  Clock,
  Star,
  Search,
  BookOpen,
} from 'lucide-react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { books, categories, setSelectedCategory, setSearchQuery } = useBooks();
  const { addToCart } = useCart();

  const [heroSearch, setHeroSearch] = useState('');

  // Deal of the day countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      navigate('/books');
    }
  };

  const bestsellers = books.filter((b) => b.badge === 'Bestseller' || b.rating >= 4.8).slice(0, 4);
  const techPicks = books.filter((b) => b.category === 'Technology').slice(0, 4);
  const dealBook = books.find((b) => b.id === 'book-4') || books[0];

  return (
    <div className="space-y-16 pb-16">
      <QuickViewModal />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 text-xs font-bold border border-primary-200 dark:border-primary-800">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Over 15,000+ Curated Books for Curious Minds</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Find the books that <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 bg-clip-text text-transparent">
                  inspire, educate,
                </span>{' '}
                and enchant.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
                Dive into hand-picked bestsellers, hard-to-find technical deep-dives,
                timeless fiction, and transformative insights from world-class authors.
              </p>

              {/* Hero Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="max-w-xl mx-auto lg:mx-0 flex items-center bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-1 flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search by title, author, or genre..."
                    className="w-full px-3 py-2 text-sm text-slate-900 dark:text-white bg-transparent focus:outline-none placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Genre Chips */}
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start pt-2">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Trending:
                </span>
                {['Technology', 'Fiction', 'Business & Finance', 'Sci-Fi & Fantasy'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigate('/books');
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-2xs"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Glow behind book */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-indigo-500 rounded-3xl blur-2xl opacity-20 dark:opacity-30 -z-10" />

                {/* Hero Featured Book Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full">
                      ★ Editor's Choice of the Month
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Top Rated</span>
                  </div>

                  <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-book">
                    <img
                      src={books[0].coverImage}
                      alt={books[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
                      {books[0].title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      by {books[0].author}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-xl font-black text-slate-900 dark:text-white">
                          ${books[0].price.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-400 line-through ml-2">
                          ${books[0].originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Link
                        to={`/books/${books[0].id}`}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Value Props / Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Free Express Delivery
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                On all qualifying orders over $35
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                100% Secure Checkout
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Encrypted bank-level safety
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                30-Day Easy Returns
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hassle-free refunds & replacements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Genuine Print Editions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct from verified publishers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Reads</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bestselling Books
            </h2>
          </div>
          <Link
            to="/books"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 group"
          >
            <span>See All Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestsellers.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Deal of the Day Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-primary-950 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text & Timer */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Flash Deal of the Day</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                {dealBook.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                {dealBook.description}
              </p>

              {/* Countdown Timer */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Offer Expires In:
                </span>
                <div className="flex items-center gap-3 font-mono">
                  <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                    <span className="text-2xl font-black text-amber-400">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase">Hours</span>
                  </div>
                  <span className="text-xl font-bold text-slate-500">:</span>
                  <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                    <span className="text-2xl font-black text-amber-400">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase">Mins</span>
                  </div>
                  <span className="text-xl font-bold text-slate-500">:</span>
                  <div className="bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700 text-center">
                    <span className="text-2xl font-black text-amber-400">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase">Secs</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => addToCart(dealBook, 1, dealBook.formats[0])}
                  className="px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary-500/30"
                >
                  Claim 42% Off Now (${dealBook.price.toFixed(2)})
                </button>
                <Link
                  to={`/books/${dealBook.id}`}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Image Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 border-2 border-white/10">
                <img
                  src={dealBook.coverImage}
                  alt={dealBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech & Programming Staff Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Developer Library</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Technology & Architecture
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Technology');
              navigate('/books');
            }}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 group"
          >
            <span>Explore Tech Books</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techPicks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Reader Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Community Love
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Loved by 50,000+ Bookworms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The curated technical book collection is incredible. I found Designing Data-Intensive
              Applications and Clean Code delivered in pristine condition the very next morning!"
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Marcus Ross</p>
                <p className="text-[11px] text-slate-400">Senior Cloud Architect</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "PageTurner has replaced every other online bookstore for me. The interface is lightning
              fast, the promo discounts actually work, and the packaging is eco-friendly."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                SL
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Sarah Lin</p>
                <p className="text-[11px] text-slate-400">Literary Fiction Blogger</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
              "The checkout experience was seamless, and the ability to save items for later made it
              so convenient to build my personal reading wishlist."
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                DK
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Devin Kowalski</p>
                <p className="text-[11px] text-slate-400">Startup Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
