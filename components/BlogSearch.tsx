import React from 'react';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-12">
      <label htmlFor="search-input" className="sr-only">
        Hľadať články
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hľadať články podľa názvu, lokality alebo kľúčového slova..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
        />
      </div>
    </div>
  );
};

export default BlogSearch;
