// Fix: Implement the main App component to structure the application, set up routing, and resolve the module import error.
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ArticleProvider } from './contexts/ArticleContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import BackToTopButton from './components/BackToTopButton';
import SkipToContentLink from './components/SkipToContentLink';
import { injectLocalBusinessSchema } from './utils/seo';

const BlogPostPage = () => {
  const { slug } = useParams();
  if (!slug) return <NotFound />;
  return <BlogPost slug={slug} />;
};

function App() {
  useEffect(() => {
    injectLocalBusinessSchema();
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <ArticleProvider>
          <Router>
            <SkipToContentLink />
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
              <Header />
              <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <Routes>
                  <Route path="/" element={<BlogList />} />
                  <Route path="/blog" element={<BlogList />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <BackToTopButton />
            </div>
          </Router>
        </ArticleProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
