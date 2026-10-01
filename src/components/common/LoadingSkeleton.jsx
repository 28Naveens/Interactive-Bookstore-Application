import React from 'react';

export const BookCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm animate-pulse flex flex-col h-full">
      <div className="w-full aspect-[2/3] bg-slate-200 dark:bg-slate-800 rounded-lg mb-4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2" />
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-4" />
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded w-24" />
      </div>
    </div>
  );
};

export const BookGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default BookCardSkeleton;
