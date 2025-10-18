import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import { articles } from './data/articles';
import { injectLocalBusinessSchema } from './utils/seo';

const App: React.FC = () => {

  React.useEffect(() => {
    // Registrácia Service Workera
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registered with scope: ', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }

    // Vloženie globálnej LocalBusiness Schema pre SEO
    injectLocalBusinessSchema();

  }, []);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Navigate to="/blog" />} />
            <Route path="/blog" element={<BlogList articles={articles} />} />
            <Route path="/blog/:slug" element={<BlogPost articles={articles} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer id="kontakt" className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-orange-400">VI and MO s. r. o.</h2>
                <p className="mb-2 max-w-md mx-auto">Karpatské námestie 7770/10A, 831 06 Bratislava - Rača</p>
                <p className="mb-6">IČO: 56 811 322 | DIČ: 2122461176</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
                    <div className="text-center">
                        <h3 className="font-semibold text-lg">Sťahovanie</h3>
                        <p>Miroslav Danihel</p>
                        <a href="tel:+421911275755" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 block mt-1">+421 911 275 755</a>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-lg">Upratovanie</h3>
                        <p>Barbora Danihelová Huňková</p>
                        <a href="tel:+421918895730" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 block mt-1">+421 918 895 730</a>
                    </div>
                </div>
                 <a href="mailto:info@viandmo.com" className="block mt-6 text-orange-400 hover:text-orange-300 transition-colors duration-300">info@viandmo.com</a>
                 <p className="text-sm mt-8 text-gray-400">&copy; {new Date().getFullYear()} VI&MO. Všetky práva vyhradené.</p>
            </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
