import React, { useState, useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/crypto';

// UPOZORNENIE: Tento VAPID kľúč je len príklad. 
// V reálnej aplikácii ho nahraďte vlastným, vygenerovaným kľúčom.
const VAPID_PUBLIC_KEY = 'BNo5Y8c86v5iny1YmflpAGBVL5x1vjfk_I4I962k8sq8yCo0_buD3a_G8-3cmk2k8Tz2e-b6YCtX0kYDmAc_8Cg';

const NotificationButton: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isInitialising, setIsInitialising] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setNotificationPermission(Notification.permission);
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) {
            setIsSubscribed(true);
            setSubscription(sub);
          }
          setIsInitialising(false);
        });
      });
    } else {
        setIsInitialising(false);
    }
  }, []);

  const subscribeUser = async () => {
    if (!('serviceWorker' in navigator)) return;
    setIsActionLoading(true);
    try {
      const permissionResult = await Notification.requestPermission();
      setNotificationPermission(permissionResult);
      if (permissionResult !== 'granted') {
          alert('❗ Povolenie na notifikácie bolo zamietnuté. Ak si to rozmyslíte, môžete ho povoliť v nastaveniach prehliadača.');
          setIsActionLoading(false);
          return;
      }

      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.log('User is subscribed:', sub);
      
      // V produkcii odošlite 'sub' objekt na váš server
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify(sub), headers: {'Content-Type': 'application/json'} });

      setIsSubscribed(true);
      setSubscription(sub);
      alert('Skvelé! 🎉 Úspešne ste sa prihlásili na odber našich noviniek.');
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
      alert('Chyba 😟 Prihlásenie na odber notifikácií zlyhalo. Skúste to prosím znova.');
    }
    setIsActionLoading(false);
  };

  const unsubscribeUser = async () => {
    if (!subscription) return;
    setIsActionLoading(true);
    try {
      await subscription.unsubscribe();
      
      // V produkcii odošlite požiadavku na server na zrušenie odberu
      // await fetch('/api/unsubscribe', { method: 'POST', body: JSON.stringify({ endpoint: subscription.endpoint }), ... });

      console.log('User is unsubscribed.');
      setIsSubscribed(false);
      setSubscription(null);
      alert('Odhlásenie prebehlo úspešne. Bude nám za vami smutno! 👋');
    } catch (error) {
      console.error('Failed to unsubscribe the user: ', error);
      alert('Chyba 😟 Odhlásenie z odberu zlyhalo. Skúste to prosím neskôr.');
    }
    setIsActionLoading(false);
  };

  const handleClick = () => {
    if (notificationPermission === 'denied') {
        alert('Notifikácie sú zablokované. Prosím, povoľte ich v nastaveniach vášho prehliadača a obnovte stránku.');
        return;
    }

    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  };

  if (!('Notification' in window) || !('PushManager' in window)) {
    return <p className="text-sm text-gray-500 hidden md:block">Notifikácie nie sú podporované.</p>;
  }
  
  const isDisabled = isInitialising || isActionLoading || notificationPermission === 'denied';
  const buttonText = () => {
      if (isInitialising) return 'Načítava sa...';
      if (isActionLoading) return isSubscribed ? 'Odhlasujem...' : 'Prihlasujem...';
      return isSubscribed ? 'Zrušiť notifikácie' : 'Povoliť notifikácie';
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={isSubscribed ? 'Zrušiť odber notifikácií' : 'Povoliť odber notifikácií'}
      className={`px-3 py-2 md:px-4 text-sm font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap ${
        isSubscribed
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-orange-500 text-white hover:bg-orange-600'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {buttonText()}
    </button>
  );
};

export default NotificationButton;
