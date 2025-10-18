
import React from 'react';
import NotificationButton from './NotificationButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="/#/" className="text-2xl md:text-3xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
          <span className="text-orange-500">VI</span>&<span className="text-orange-500">MO</span> Blog
        </a>
        <NotificationButton />
      </div>
    </header>
  );
};

export default Header;
