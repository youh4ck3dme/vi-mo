// Fix: Implement the useArticles hook for easy access to ArticleContext.
import { useContext } from 'react';
import { ArticleContext } from '../contexts/ArticleContext';

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};