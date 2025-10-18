import { useState, useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/crypto';
import { VAPID_PUBLIC_KEY } from '../constants';

type PushNotificationState = {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission;
  loading: boolean;
  error: Error | null;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
};

const usePushNotifications = (): PushNotificationState => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setIsSubscribed(!!subscription);
        });
      });
    }
  }, []);

  const subscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isSupported) {
        throw new Error('Push notifications are not supported.');
      }
      
      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        setIsSubscribed(true);
        setLoading(false);
        return;
      }

      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // TODO: Send subscription to your backend server
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(subscription),
      // });

      console.log('User is subscribed:', subscription);
      setIsSubscribed(true);
    } catch (err) {
      console.error('Failed to subscribe the user: ', err);
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
      if (Notification.permission === 'denied') {
        setPermission('denied');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const unsubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        // TODO: Send request to backend to remove subscription
        // await fetch('/api/unsubscribe', { ... });
        
        const successful = await subscription.unsubscribe();
        if (successful) {
          console.log('User is unsubscribed.');
          setIsSubscribed(false);
        } else {
          throw new Error('Unsubscription failed.');
        }
      }
    } catch (err) {
        console.error('Failed to unsubscribe the user: ', err);
        if (err instanceof Error) {
            setError(err);
        } else {
            setError(new Error(String(err)));
        }
    } finally {
        setLoading(false);
    }
  };

  return { isSupported, isSubscribed, permission, loading, error, subscribe, unsubscribe };
};

export default usePushNotifications;
