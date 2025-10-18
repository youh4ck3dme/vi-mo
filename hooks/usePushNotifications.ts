import { useState, useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/crypto';
import { VAPID_PUBLIC_KEY } from '../constants';
import useToast from './useToast';

type PushNotificationState = {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission;
  loading: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

const usePushNotifications = (): PushNotificationState => {
  const { showToast } = useToast();
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setIsSubscribed(!!subscription);
          setLoading(false);
        });
      });
    } else {
        setLoading(false);
    }
  }, []);

  const subscribe = async () => {
    setLoading(true);

    try {
      if (!isSupported) {
        throw new Error('Push notifikácie nie sú podporované v tomto prehliadači.');
      }
      
      const registration = await navigator.serviceWorker.ready;
      
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // TODO: Send subscription to your backend server
      // await fetch('/api/subscribe', { ... });

      console.log('User is subscribed:', subscription);
      setIsSubscribed(true);
      showToast('Úspešne prihlásené na odber noviniek!', 'success');
    } catch (err) {
      console.error('Failed to subscribe the user: ', err);
      const currentPermission = Notification.permission;
      setPermission(currentPermission);
      if (currentPermission === 'denied') {
        showToast('Nepodarilo sa prihlasiť: Notifikácie boli zamietnuté.', 'error');
      } else {
        showToast('Prihlásenie zlyhalo. Skúste to prosím znova.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const unsubscribe = async () => {
    setLoading(true);

    try {
      // Fix: Corrected property access from `service-worker` to `serviceWorker`.
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        const successful = await subscription.unsubscribe();
        if (successful) {
          console.log('User is unsubscribed.');
          setIsSubscribed(false);
          showToast('Odber noviniek bol úspešne zrušený.', 'success');
        } else {
          throw new Error('Unsubscription failed.');
        }
      }
    } catch (err) {
        console.error('Failed to unsubscribe the user: ', err);
        showToast('Zrušenie odberu zlyhalo. Skúste to prosím znova.', 'error');
    } finally {
        setLoading(false);
    }
  };

  return { isSupported, isSubscribed, permission, loading, subscribe, unsubscribe };
};

export default usePushNotifications;
