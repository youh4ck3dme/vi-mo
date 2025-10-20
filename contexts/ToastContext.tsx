import React, { createContext, useState, useCallback, ReactNode } from 'react';
import Toast, { ToastType } from '../components/Toast';

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Allow animation to finish before clearing message
    setTimeout(() => setToastMessage(''), 300);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        message={toastMessage} 
        type={toastType} 
        isVisible={isVisible} 
        onClose={handleClose} 
      />
    </ToastContext.Provider>
  );
};