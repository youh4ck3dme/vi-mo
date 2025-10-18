import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonLoader: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-300 rounded-lg w-1/2 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
      </div>
       <div className="mb-12 h-12 bg-gray-200 rounded-full w-full"></div>
       <div className="mb-8 flex flex-wrap justify-center gap-2">
            <div className="h-9 bg-gray-200 rounded-full w-28"></div>
            <div className="h-9 bg-gray-200 rounded-full w-36"></div>
            <div className="h-9 bg-gray-200 rounded-full w-40"></div>
       </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
