import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import SkipToContentLink from './components/SkipToContentLink';
import SkeletonLoader from './components/SkeletonLoader';
import { articles } from './data/articles';
import { injectLocalBusinessSchema } from './utils/seo';
import { ToastProvider } from './contexts/ToastContext';
import LoadingSpinner from './components/LoadingSpinner';
import BlogPostSkeleton from './components/BlogPostSkeleton';

// Lazy load components for better performance
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  // Inject global schema for the business on initial app load
  React.useEffect(() => {
    injectLocalBusinessSchema();
  }, []);

  return (
    <Router>
      <ToastProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <SkipToContentLink />
          <Header />
          <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route 
                path="/blog" 
                element={
                  <Suspense fallback={<SkeletonLoader />}>
                    <BlogList articles={articles} />
                  </Suspense>
                } 
              />
              <Route 
                path="/blog/:slug" 
                element={
                  <Suspense fallback={<BlogPostSkeleton />}>
                    <BlogPost articles={articles} />
                  </Suspense>
                } 
              />
              <Route 
                path="*" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotFound />
                  </Suspense>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <BackToTopButton />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;
