import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-brand-teal rounded-lg shadow-xl overflow-hidden">
      <div className="p-8 sm:p-12">
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          Potrebujete pomôcť so sťahovaním?
        </h2>
        <p className="mt-4 text-lg text-teal-100">
          Sme tu pre vás! Kontaktujte nás pre nezáväznú cenovú ponuku a nechajte starosti na nás.
        </p>
        <div className="mt-8">
          <a
            href="/#kontakt"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-brand-teal bg-white hover:bg-teal-50"
          >
            Získať ponuku
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;