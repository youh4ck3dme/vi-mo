import React from 'react';
import { Article } from '../types';

interface BlogCardProps {
  article: Article;
}

const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  const snippet = article.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';

  return (
    <a href={`/#/blog/${article.slug}`} className="group block bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img src={`https://picsum.photos/seed/${article.slug}/400/200`} alt={article.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors"></div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">{article.category} &bull; {new Date(article.datePublished).toLocaleDateString('sk-SK')}</p>
        <h3 className="mt-2 text-xl font-bold text-brand-dark dark:text-white group-hover:text-brand-teal transition-colors">{article.title}</h3>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{snippet}</p>
        <span className="mt-4 inline-block font-semibold text-brand-teal group-hover:underline">Čítať viac &rarr;</span>
      </div>
    </a>
  );
};

export default BlogCard;