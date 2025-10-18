import React from 'react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  const baseClasses = 'fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-2xl text-white font-semibold transition-all duration-300 z-50';
  const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const visibilityClasses = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses} ${visibilityClasses}`} role="alert">
      {message}
    </div>
  );
};

export default Toast;
