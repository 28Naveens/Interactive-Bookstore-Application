import React, { useState } from 'react';
import StarRating from '../common/StarRating';
import { useBooks } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, MessageSquarePlus, Star } from 'lucide-react';

export const ReviewSection = ({ book }) => {
  const { addReview } = useBooks();
  const { user, openAuthModal } = useAuth();

  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState(user?.name || '');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const reviews = book.reviews || [];

  // Calculate rating distributions
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !title.trim()) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      user: userName.trim() || (user ? user.name : 'Anonymous Reader'),
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      comment: comment.trim(),
      verified: true,
    };

    addReview(book.id, newReview);
    setTitle('');
    setComment('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Rating Breakdown Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Overall score */}
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 pb-6 md:pb-0 md:pr-6">
          <span className="text-5xl font-black text-slate-900 dark:text-white mb-2">
            {book.rating}
          </span>
          <StarRating rating={book.rating} size="w-5 h-5" />
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Based on {book.reviewCount} customer ratings
          </span>
        </div>

        {/* Rating bars */}
        <div className="flex flex-col justify-center space-y-2">
          {distribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-2 text-xs">
              <span className="w-12 font-medium text-slate-600 dark:text-slate-400">
                {stars} star
              </span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right font-semibold text-slate-500">{count}</span>
            </div>
          ))}
        </div>

        {/* Write a review action */}
        <div className="flex flex-col items-center justify-center text-center pt-6 md:pt-0 md:pl-6 border-t md:border-t-0 border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            Read this book?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
            Share your thoughts and help fellow readers find their next favorite story.
          </p>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{showForm ? 'Close Review Form' : 'Write a Customer Review'}</span>
          </button>
        </div>
      </div>

      {/* Review Submission Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 border border-primary-200 dark:border-primary-900/60 p-6 rounded-2xl shadow-md space-y-4 animate-fade-in"
        >
          <h4 className="font-bold text-slate-900 dark:text-white text-base">
            Write Your Review for "{book.title}"
          </h4>

          {/* Star selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Overall Rating
            </label>
            <StarRating rating={rating} size="w-6 h-6" interactive onChange={setRating} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Alex Turner"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Review Headline / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. A gripping masterpiece!"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Detailed Feedback
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike? How was the writing style, characters, or actionable advice?"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          Customer Reviews ({reviews.length})
        </h4>

        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500 italic py-4">
            Be the first to write a review for this book!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {rev.user}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <StarRating rating={rev.rating} size="w-3.5 h-3.5" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {rev.title}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
