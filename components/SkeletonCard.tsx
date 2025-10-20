import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-300 dark:bg-slate-700"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 w-1/3 bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="h-6 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
        <div className="space-y-2">
            <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-4 w-full bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="h-5 w-1/4 bg-slate-300 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;