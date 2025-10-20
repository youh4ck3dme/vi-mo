import React from 'react';
import SkeletonCard from './SkeletonCard';

interface SkeletonLoaderProps {
  count: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;