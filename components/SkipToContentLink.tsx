import React from 'react';

const SkipToContentLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 px-4 py-2 bg-white dark:bg-slate-800 text-brand-teal dark:text-white rounded-md shadow-md"
    >
      Preskočiť na hlavný obsah
    </a>
  );
};

export default SkipToContentLink;