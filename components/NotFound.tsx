import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-24">
        <h1 className="text-6xl md:text-8xl font-extrabold text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Stránka sa nenašla</h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            Ľutujeme, ale stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
        </p>
        <Link 
            to="/blog" 
            className="inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
        >
            Späť na blog
        </Link>
    </div>
  );
};

export default NotFound;
