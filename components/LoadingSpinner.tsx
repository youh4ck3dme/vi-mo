import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  return (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-brand-teal ${sizeClasses[size]}`} role="status">
        <span className="sr-only">Načítava sa...</span>
    </div>
  );
};

export default LoadingSpinner;