import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-orange-500 text-white rounded-lg shadow-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Pripravení na bezstarostné sťahovanie?
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
        Nechajte ťažkú prácu na nás. Kontaktujte nás ešte dnes pre nezáväznú cenovú ponuku a naplánujte si sťahovanie s profesionálmi.
      </p>
      <a
        href="https://viandmo.com/#kontakt"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Získať Ponuku Zdarma
      </a>
    </div>
  );
};

export default CallToAction;
