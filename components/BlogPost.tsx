// Fix: Implement the BlogPost component to display a single article.
import React, { useEffect } from 'react';
import { useArticles } from '../hooks/useArticles';
import NotFound from './NotFound';
import BlogPostSkeleton from './BlogPostSkeleton';
import RelatedArticles from './RelatedArticles.tsx';
import SocialShare from './SocialShare';
import CallToAction from './CallToAction';
import { updateBlogPostSeo, cleanupBlogPostSeo } from '../utils/seo';

interface BlogPostProps {
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const { getArticleBySlug, isLoading } = useArticles();
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (article) {
      updateBlogPostSeo(article);
    }
    // Cleanup function to reset SEO tags when the component unmounts
    return () => {
      cleanupBlogPostSeo();
    };
  }, [article]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!article) {
    return <NotFound />;
  }

  return (
    <article>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>{article.category}</span> &bull; <span>{new Date(article.datePublished).toLocaleDateString('sk-SK')}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-dark dark:text-white sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
        </header>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-lg prose-h2:text-brand-dark dark:prose-h2:text-white prose-h3:text-brand-dark dark:prose-h3:text-white prose-a:text-brand-teal hover:prose-a:text-brand-dark"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <hr className="my-12 border-slate-200 dark:border-slate-700" />
        
        <div className="flex flex-col gap-8">
            <SocialShare url={window.location.href} title={article.title} />
            <CallToAction />
        </div>

      </div>

      <RelatedArticles currentArticleSlug={article.slug} category={article.category} />
    </article>
  );
};

export default BlogPost;