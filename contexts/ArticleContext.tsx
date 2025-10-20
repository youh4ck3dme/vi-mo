// Fix: Implement ArticleContext to provide article data to the application.
import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { articles as allArticles } from '../data/articles';
import { Article } from '../types';

interface ArticleContextType {
  articles: Article[];
  isLoading: boolean;
  getArticleBySlug: (slug: string) => Article | undefined;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleProvider: React.FC<ArticleProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching
    setTimeout(() => {
      setArticles(allArticles);
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, []);

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
  };

  const value = useMemo(() => ({
    articles,
    isLoading,
    getArticleBySlug,
  }), [articles, isLoading]);

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};