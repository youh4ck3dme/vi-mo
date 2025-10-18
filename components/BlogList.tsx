import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import CategoryFilter from './CategoryFilter';
import CallToAction from './CallToAction';

interface BlogListProps {
  articles: Article[];
}

const BlogList: React.FC<BlogListProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const allCategories = articles.map(article => article.category);
    return [...new Set(allCategories)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        // Filter by category
        if (selectedCategory && article.category !== selectedCategory) {
          return false;
        }
        return true;
      })
      .filter(article => {
        // Filter by search term
        if (searchTerm.trim() === '') {
          return true;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(lowercasedTerm) ||
          article.metaDescription.toLowerCase().includes(lowercasedTerm) ||
          article.district.toLowerCase().includes(lowercasedTerm) ||
          article.keywords.some(keyword => keyword.toLowerCase().includes(lowercasedTerm))
        );
      });
  }, [articles, searchTerm, selectedCategory]);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Náš Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tipy, triky a novinky zo sveta sťahovania, vypratávania a upratovania v Bratislave.
        </p>
      </div>
      
      <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <div className="my-12">
        <CallToAction />
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Nenašli sa žiadne články</h2>
            <p className="text-gray-500">Skúste upraviť filtre alebo hľadaný výraz.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;