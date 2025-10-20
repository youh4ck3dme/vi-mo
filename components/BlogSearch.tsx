import React from 'react';

interface BlogSearchProps {
  onSearch: (searchTerm: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  return (
    <div className="relative flex-grow">
      <input
        type="search"
        placeholder="Hľadať v článkoch..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-3 pr-10 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-brand-teal focus:border-brand-teal transition"
        aria-label="Hľadať v článkoch"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default BlogSearch;