import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} VI and MO s. r. o. Všetky práva vyhradené.</p>
        <p className="mt-2">
          <a href="https://viandmo.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors">
            Navštívte našu hlavnú stránku
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
