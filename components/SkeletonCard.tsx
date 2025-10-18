import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="p-6 bg-gray-50">
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
