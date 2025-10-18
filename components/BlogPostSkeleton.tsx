import React from 'react';

const BlogPostSkeleton: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-xl animate-pulse">
      <header className="mb-8 border-b pb-6">
        <div className="mb-4 h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-4/5 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full"></div>
      </header>

      <div className="space-y-4">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-5/6"></div>
        <div className="h-24 bg-gray-200 rounded w-full mt-6"></div>
        <div className="h-5 bg-gray-200 rounded w-full"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      </div>
    </article>
  );
};

export default BlogPostSkeleton;
