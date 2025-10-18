import React from 'react';
import { Article } from '../types';
import BlogCard from './BlogCard';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, allArticles }) => {
  // Defenzívna podmienka na zabránenie chyby, ak by dáta neboli pripravené
  if (!currentArticle || !allArticles) {
    return null;
  }

  const related = allArticles
    .filter(
      (article) =>
        article && // Extra kontrola pre prípad poškodených dát
        article.category === currentArticle.category && article.slug !== currentArticle.slug
    )
    .slice(0, 2); // Zobraziť maximálne 2 súvisiace články

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 py-12 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Podobné články</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {related.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
