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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => showToast('Odkaz skopírovaný do schránky!', 'success'))
      .catch(() => showToast('Nepodarilo sa skopírovať odkaz.', 'error'));
  };

  const socialLinks = [
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-1.5c-1 0-1.5.5-1.5 1.5V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>, color: 'text-[#1877F2]' },
    { name: 'Twitter', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.21 0-.42-.01-.62.84-.6 1.56-1.36 2.14-2.17z"/></svg>, color: 'text-[#1DA1F2]' },
    { name: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4c-.55 0-1 .45-1 1v16c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM8 18H5V9h3v9zm-1.5-10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 18h-3v-4.74c0-1.42-.6-2.26-1.66-2.26-1.04 0-1.58.74-1.84 1.45-.09.25-.11.59-.11.94V18h-3V9h3v1.32c.4-.73 1.4-1.47 2.9-1.47 2.16 0 3.8 1.42 3.8 4.44V18z"/></svg>, color: 'text-[#0077B5]' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p className="font-semibold text-brand-dark dark:text-slate-300 flex-shrink-0">Zdieľať článok:</p>
      <div className="flex items-center gap-2 flex-wrap">
        {socialLinks.map(link => (
          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.name}`} 
             className={`${link.color} hover:opacity-80 transition-opacity w-8 h-8`}>
            {link.icon}
          </a>
        ))}
        <button onClick={copyToClipboard} aria-label="Copy link" className="text-slate-500 hover:text-brand-teal transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;