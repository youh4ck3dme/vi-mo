import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';
import { updateBlogPostSeo, cleanupBlogPostSeo } from '../utils/seo';
import NotFound from './NotFound';
import SocialShare from './SocialShare';
import RelatedArticles from './RelatedArticles';
import CallToAction from './CallToAction';

interface BlogPostProps {
  articles: Article[];
}

const BlogPost: React.FC<BlogPostProps> = ({ articles }) => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  React.useEffect(() => {
    if (article) {
      updateBlogPostSeo(article);
      window.scrollTo(0, 0);
    }
    // Cleanup function
    return () => {
      cleanupBlogPostSeo();
    };
  }, [article]);

  if (!article) {
    return <NotFound />;
  }
  
  const canonicalUrl = `https://app.viandmo.com/#/blog/${article.slug}`;

  return (
    <>
      <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-xl">
        <header className="mb-8 border-b pb-6">
            <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-4">
                <Link to="/blog" className="hover:text-orange-500">Blog</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-700">{article.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {article.title}
            </h1>
            <p className="text-md text-gray-500">
            Publikované dňa: {new Date(article.datePublished).toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' })}
            &nbsp;&bull;&nbsp;Kategória: {article.category}
            </p>
        </header>

        <div
          className="prose prose-lg max-w-none prose-orange"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <footer className="mt-12 pt-8 border-t">
          <SocialShare url={canonicalUrl} title={article.title} />
        </footer>
      </article>

      <div className="mt-16">
        <RelatedArticles currentArticle={article} allArticles={articles} />
      </div>

      <div className="mt-16">
        <CallToAction />
      </div>
    </>
  );
};

export default BlogPost;
