import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500" role="status">
        <span className="sr-only">Načítava sa...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
