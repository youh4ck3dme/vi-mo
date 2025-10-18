
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface BlogListProps {
  articles: Article[];
}

const BlogList: React.FC<BlogListProps> = ({ articles }) => {
  return (
    <div className="space-y-8">
       <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">Sprievodca Sťahovaním v Bratislave</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">Všetko, čo potrebujete vedieť pre bezproblémové sťahovanie vo vašej mestskej časti. Tipy, triky a profesionálne rady od VI&MO.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="p-6 flex flex-col h-full">
              <div>
                <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full mb-3">{article.district}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">{article.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{article.metaDescription}</p>
              </div>
              <div className="mt-auto">
                <span className="font-semibold text-orange-500 group-hover:underline">
                  Čítať viac &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
