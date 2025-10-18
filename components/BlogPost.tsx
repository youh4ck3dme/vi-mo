import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';
import { updateBlogPostSeo, cleanupBlogPostSeo } from '../utils/seo';
import NotFound from './NotFound';

interface BlogPostProps {
  articles: Article[];
}

const BlogPost: React.FC<BlogPostProps> = ({ articles }) => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (article) {
        updateBlogPostSeo(article);
    }
    
    // Cleanup funkcia na resetovanie SEO tagov pri odchode zo stránky
    return () => {
        cleanupBlogPostSeo();
    };
  }, [article]);

  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="prose sm:prose-lg max-w-none prose-h1:text-gray-900 prose-h1:font-extrabold prose-h2:text-gray-800 prose-h2:font-bold prose-h2:border-b-2 prose-h2:border-orange-200 prose-h2:pb-2 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-strong:text-gray-800 prose-blockquote:border-orange-500 prose-li:marker:text-orange-500">
        <div className="mb-8 not-prose">
            <Link to="/blog" className="text-orange-600 hover:underline font-semibold">&larr; Späť na všetky články</Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default BlogPost;
