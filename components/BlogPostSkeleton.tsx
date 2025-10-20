import React from 'react';

const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <header className="mb-8 space-y-4">
        <div className="h-5 w-1/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-10 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-8 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-5 w-1/2 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </header>
      <div className="space-y-4">
        <div className="h-6 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-5/6 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-48 my-6 w-full bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-6 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-3/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;