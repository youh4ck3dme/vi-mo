import React from 'react';
import useToast from '../hooks/useToast';

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const { showToast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Odkaz skopírovaný do schránky!', 'success');
    }, (err) => {
      console.error('Could not copy text: ', err);
      showToast('Nepodarilo sa skopírovať odkaz.', 'error');
    });
  };

  return (
    <div className="text-center">
      <h4 className="text-lg font-bold text-gray-700 mb-4">Zdieľať tento článok</h4>
      <div className="flex justify-center items-center space-x-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors duration-300"
          >
            <span className="sr-only">{link.name}</span>
            {link.name === 'Facebook' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>}
            {link.name === 'Twitter' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-1.459 0-2.896-.086-4.333-.254 2.679 1.728 5.855 2.746 9.248 2.746 11.08 0 17.145-9.176 17.145-17.146 0-.262-.006-.523-.017-.783a12.394 12.394 0 0 0 3.027-3.127z"/></svg>}
            {link.name === 'LinkedIn' && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z"/></svg>}
          </a>
        ))}
        <button
            onClick={copyToClipboard}
            aria-label="Copy link to clipboard"
            className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-orange-500 hover:text-white transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
