import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface BlogCardProps {
  article: Article;
}

const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <div className="p-6 flex-grow">
        <p className="text-sm text-gray-500 mb-2">
          {article.district} &bull; {new Date(article.datePublished).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 h-20">
          <Link to={`/blog/${article.slug}`} className="hover:text-orange-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 flex-grow">{article.metaDescription.substring(0, 120)}...</p>
      </div>
      <div className="p-6 bg-gray-50">
        <Link 
          to={`/blog/${article.slug}`} 
          className="font-semibold text-orange-600 hover:text-orange-700 transition-colors group"
        >
          Čítať viac <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
