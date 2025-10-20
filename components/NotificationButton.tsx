import React from 'react';
import usePushNotifications from '../hooks/usePushNotifications';
import useToast from '../hooks/useToast';
import LoadingSpinner from './LoadingSpinner';

const NotificationButton: React.FC = () => {
  const { 
    isSupported, 
    userConsent, 
    isSubscribed, 
    subscribeToNotifications, 
    unsubscribeFromNotifications,
    isSubscriptionLoading
  } = usePushNotifications();
  const { showToast } = useToast();

  const handleSubscribe = async () => {
    try {
      await subscribeToNotifications();
      showToast('Úspešne ste sa prihlásili na odber notifikácií!', 'success');
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message.includes('not granted') 
        ? 'Povolenie pre notifikácie nebolo udelené.'
        : 'Nepodarilo sa prihlásiť na odber.';
      showToast(message, 'error');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeFromNotifications();
      showToast('Odber notifikácií bol zrušený.', 'info');
    } catch (error) {
      console.error(error);
      showToast('Nepodarilo sa zrušiť odber.', 'error');
    }
  };

  if (!isSupported) {
    return null;
  }

  if (isSubscriptionLoading) {
    return <div className="p-2"><LoadingSpinner size="sm" /></div>;
  }
  
  if (userConsent === 'denied') {
    return (
        <button className="p-2 text-slate-400 cursor-not-allowed" disabled title="Notifikácie sú zablokované v prehliadači.">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.394 1.33a1 1 0 0 1 1.212 0l8 6A1 1 0 0 1 18 8v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 .606-.914l8-6zM5 16h10V8.307l-5-3.75-5 3.75V16z" clipRule="evenodd"/><path fillRule="evenodd" d="M10 10a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1z" clipRule="evenodd"/></svg>
        </button>
    );
  }

  if (isSubscribed) {
    return (
      <button onClick={handleUnsubscribe} className="p-2 text-brand-teal hover:text-brand-dark dark:hover:text-teal-300 transition-colors" title="Zrušiť odber notifikácií">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
      </button>
    );
  }

  return (
    <button onClick={handleSubscribe} className="p-2 text-slate-500 hover:text-brand-teal dark:hover:text-white transition-colors" title="Prihlásiť sa na odber notifikácií">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    </button>
  );
};

export default NotificationButton;