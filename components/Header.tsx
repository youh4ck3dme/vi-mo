import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotificationButton from './NotificationButton';

const Header: React.FC = () => {
    const location = useLocation();

    const isLinkActive = (path: string) => {
        const currentPath = location.pathname;
        if (path === '/') {
            return currentPath === '/' || currentPath.startsWith('/blog');
        }
        return currentPath.startsWith(path);
    };

    return (
        <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/#/" className="text-2xl font-bold text-brand-teal">
                            VI&MO
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/#/" className={
                            `text-base font-medium transition-colors ${isLinkActive('/') ? 'text-brand-teal' : 'text-slate-500 hover:text-brand-dark dark:hover:text-white'}`
                        }>
                            Blog
                        </a>
                        <a href="https://viandmo.com/#sluzby" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-slate-500 hover:text-brand-dark dark:hover:text-white transition-colors">
                            Služby
                        </a>
                        <a href="https://viandmo.com/#kontakt" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-slate-500 hover:text-brand-dark dark:hover:text-white transition-colors">
                            Kontakt
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <NotificationButton />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;