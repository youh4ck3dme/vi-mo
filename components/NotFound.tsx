import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-6xl font-extrabold text-brand-teal sm:text-8xl">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-brand-dark dark:text-white sm:text-4xl">Stránka sa nenašla</h2>
        <p className="mt-4 max-w-md text-slate-500 dark:text-slate-400">
            Ospravedlňujeme sa, ale stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
        </p>
        <a
            href="/#/"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-teal hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal transition-colors"
        >
            Späť na domovskú stránku
        </a>
    </div>
  );
};

export default NotFound;