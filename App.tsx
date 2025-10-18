import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import SkipToContentLink from './components/SkipToContentLink';
import LoadingSpinner from './components/LoadingSpinner';
import { articles } from './data/articles';
import { injectLocalBusinessSchema } from './utils/seo';

// Lazy load components for better performance
// Fix: Corrected import path for BlogList.
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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <SkipToContentLink />
        <Header />
        <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/blog" replace />} />
              <Route path="/blog" element={<BlogList articles={articles} />} />
              <Route path="/blog/:slug" element={<BlogPost articles={articles} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </Router>
  );
};

export default App;
