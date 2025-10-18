import React from 'react';
import usePushNotifications from '../hooks/usePushNotifications';

const NotificationButton: React.FC = () => {
    const {
        isSupported,
        isSubscribed,
        permission,
        subscribe,
        unsubscribe,
        loading,
    } = usePushNotifications();

    if (!isSupported) {
        return null;
    }
    
    const getButtonText = () => {
        if (loading) return 'Spracovávam...';
        if (isSubscribed) return 'Zrušiť notifikácie';
        if (permission === 'denied') return 'Notifikácie blokované';
        return 'Prihlásiť sa na odber noviniek';
    };

    const handleClick = () => {
        if (isSubscribed) {
            unsubscribe();
        } else {
            subscribe();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading || permission === 'denied'}
            className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
            {getButtonText()}
        </button>
    );
};

export default NotificationButton;
