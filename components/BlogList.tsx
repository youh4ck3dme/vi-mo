// Fix: Implement the BlogList component to display a list of articles with search and filtering functionality.
import React, { useState, useMemo } from 'react';
import { useArticles } from '../hooks/useArticles';
import BlogCard from './BlogCard';
import SkeletonLoader from './SkeletonLoader';
import BlogSearch from './BlogSearch';
import CategoryFilter from './CategoryFilter';

const BlogList: React.FC = () => {
  const { articles, isLoading } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Všetky kategórie');

  const categories = useMemo(() => {
    const allCategories = articles.map(article => article.category);
    return ['Všetky kategórie', ...Array.from(new Set(allCategories))];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        // Filter by category
        if (selectedCategory !== 'Všetky kategórie' && article.category !== selectedCategory) {
          return false;
        }
        // Filter by search term (title or content)
        if (searchTerm) {
          const lowercasedTerm = searchTerm.toLowerCase();
          return (
            article.title.toLowerCase().includes(lowercasedTerm) ||
            article.content.toLowerCase().includes(lowercasedTerm)
          );
        }
        return true;
      });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <div>
      <header className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white sm:text-5xl">Náš Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
          Tipy, triky a novinky zo sveta sťahovania, vypratávania a upratovania priamo od profesionálov.
        </p>
      </header>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <BlogSearch onSearch={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {isLoading ? (
        <SkeletonLoader count={6} />
      ) : filteredArticles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map(article => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white">Nenašli sa žiadne články</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Skúste zmeniť filter alebo hľadaný výraz.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;