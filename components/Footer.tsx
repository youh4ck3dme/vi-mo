import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">VI&MO</h2>
            <p className="text-slate-400">Vaše sťahovanie, naša starosť.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-slate-200 uppercase">Služby</h3>
              <ul className="text-slate-400 space-y-2">
                <li><a href="https://viandmo.com/#sluzby" className="hover:underline">Sťahovanie</a></li>
                <li><a href="https://viandmo.com/#sluzby" className="hover:underline">Vypratávanie</a></li>
                <li><a href="https://viandmo.com/#sluzby" className="hover:underline">Balenie</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-slate-200 uppercase">Odkazy</h3>
              <ul className="text-slate-400 space-y-2">
                <li><a href="https://viandmo.com/#onas" className="hover:underline">O nás</a></li>
                <li><a href="/#/blog" className="hover:underline">Blog</a></li>
                <li><a href="https://viandmo.com/#kontakt" className="hover:underline">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-slate-200 uppercase">Právne</h3>
              <ul className="text-slate-400 space-y-2">
                <li><a href="https://viandmo.com/gdpr" className="hover:underline">Ochrana údajov</a></li>
                <li><a href="https://viandmo.com/obchodne-podmienky" className="hover:underline">Obchodné podmienky</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-slate-700 sm:mx-auto" />
        <div className="text-center text-slate-400">
          <span>© {currentYear} <a href="https://viandmo.com/" className="hover:underline">VI and MO s. r. o.</a> Všetky práva vyhradené.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;