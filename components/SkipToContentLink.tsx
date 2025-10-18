import React from 'react';

const SkipToContentLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-20 focus:p-4 focus:bg-orange-500 focus:text-white"
    >
      Preskočiť na hlavný obsah
    </a>
  );
};

export default SkipToContentLink;
