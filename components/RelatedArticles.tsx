// Fix: Implement the RelatedArticles component to display related blog posts.
import React from 'react';
import { useArticles } from '../hooks/useArticles';
import BlogCard from './BlogCard';

interface RelatedArticlesProps {
  currentArticleSlug: string;
  category: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticleSlug, category }) => {
  const { articles } = useArticles();

  const relatedArticles = articles
    .filter(article => article.category === category && article.slug !== currentArticleSlug)
    .slice(0, 3); // Show up to 3 related articles

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 sm:mt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-brand-dark dark:text-white sm:text-3xl mb-8">
          Súvisiace články
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map(article => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;