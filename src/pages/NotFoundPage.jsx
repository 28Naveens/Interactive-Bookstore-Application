import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
        <BookX className="w-12 h-12 text-primary-500" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <span className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          404 Error: Page Not Found
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          This Page Has Gone Missing
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The chapter you were looking for doesn't exist in our library. Let's get you back on track!
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 pt-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </Link>
        <Link
          to="/books"
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Books</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
