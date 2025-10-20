import { useState, useEffect } from 'react';
import { VAPID_PUBLIC_KEY } from '../constants';
import { urlBase64ToUint8Array } from '../utils/crypto';

// This function can be expanded to send the subscription to a backend server
async function saveSubscription(subscription: PushSubscription): Promise<Response> {
  console.log('Subscription object: ', JSON.stringify(subscription));
  // In a real app, you'd send this to your server
  // Example:
  // return fetch('/api/save-subscription', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription),
  // });
  return new Promise(resolve => {
    setTimeout(() => {
        console.log("Simulating saving subscription to server.");
        resolve(new Response(null, { status: 201 }));
    }, 1000);
  });
}

const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [userConsent, setUserConsent] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setUserConsent(Notification.permission);
      
      navigator.serviceWorker.ready.then(registration => {
        return registration.pushManager.getSubscription();
      }).then(sub => {
        if (sub) {
          setIsSubscribed(true);
          setSubscription(sub);
        }
        setIsSubscriptionLoading(false);
      });
    } else {
        setIsSubscriptionLoading(false);
    }
  }, []);

  const subscribeToNotifications = async (): Promise<void> => {
    if (!isSupported) {
        throw new Error("Push notifications are not supported by this browser.");
    }
    
    setIsSubscriptionLoading(true);
    
    const consent = await Notification.requestPermission();
    setUserConsent(consent);

    if (consent !== 'granted') {
      setIsSubscriptionLoading(false);
      throw new Error('Permission for notifications was not granted.');
    }

    const registration = await navigator.serviceWorker.ready;
    const existingSubscription = await registration.pushManager.getSubscription();
    
    if (existingSubscription) {
        setIsSubscribed(true);
        setSubscription(existingSubscription);
        setIsSubscriptionLoading(false);
        return;
    }

    try {
        const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        const newSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        });

        await saveSubscription(newSubscription);

        setSubscription(newSubscription);
        setIsSubscribed(true);
    } catch (error) {
        console.error('Failed to subscribe the user: ', error);
        throw error;
    } finally {
        setIsSubscriptionLoading(false);
    }
  };

  const unsubscribeFromNotifications = async (): Promise<void> => {
    if (!subscription) return;
    
    setIsSubscriptionLoading(true);
    try {
        await subscription.unsubscribe();
        // Here you would also call your backend to remove the subscription
        console.log('Unsubscribed successfully.');

        setSubscription(null);
        setIsSubscribed(false);
    } catch (error) {
        console.error('Error unsubscribing', error);
        throw error;
    } finally {
        setIsSubscriptionLoading(false);
    }
  };

  return {
    isSupported,
    userConsent,
    isSubscribed,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    isSubscriptionLoading,
  };
};

export default usePushNotifications;