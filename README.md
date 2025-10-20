# VI&MO - Blog PWA Aplikácia

Toto je repozitár pre progresívnu webovú aplikáciu (PWA) pre sťahovaciu a upratovaciu firmu VI&MO v Bratislave. Aplikácia slúži ako SEO optimalizovaný blog a platforma pre zasielanie push notifikácií zákazníkom.

## Kľúčové Funkcie

- **Progresívna Webová Aplikácia (PWA):** Inštalovateľná na mobilné zariadenia aj desktopy, s podporou offline prístupu.
- **SEO Optimalizovaný Blog:** 27 unikátnych článkov zameraných na lokálne SEO pre Bratislavu a jej mestské časti.
- **Push Notifikácie:** Možnosť prihlásiť sa k odberu noviniek a ponúk cez push notifikácie.
- **Moderný Dizajn:** Responzívny dizajn s podporou tmavého režimu (Dark Mode).
- **Filtrovanie a Vyhľadávanie:** Jednoduché vyhľadávanie a filtrovanie článkov podľa kategórií.
- **Pokročilé SEO Techniky:** Dynamické meta tagy, JSON-LD schémy (Article, FAQ, Breadcrumb, LocalBusiness).

## Technológie

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **PWA:** Service Worker API, Web App Manifest
- **Routing:** React Router (HashRouter)

---

## Spustenie Projektu

### Požiadavky
- Node.js (verzia 18+)
- npm

### Inštalácia
1.  Naklonujte repozitár:
    ```bash
    git clone [URL repozitára]
    ```
2.  Prejdite do adresára projektu:
    ```bash
    cd [názov-adresára]
    ```
3.  Nainštalujte závislosti:
    ```bash
    npm install
    ```

### Spustenie v Development Režime
Spustí lokálny vývojový server (zvyčajne na `http://localhost:5173`) s hot-reloading.
```bash
npm run dev
```

### Build pre Produkciu
Skompiluje a optimalizuje aplikáciu pre produkčné nasadenie. Výsledné súbory budú v adresári `dist`.
```bash
npm run build
```

### Náhľad Produkčného Buildu
Spustí lokálny server, ktorý servíruje súbory z `dist` adresára. Užitočné pre overenie produkčného buildu pred nasadením.
```bash
npm run preview
```

---

## Príklad pre Backend (Node.js)

Pre plnú funkčnosť push notifikácií je potrebný backend, ktorý bude ukladať subskripcie a odosielať správy.

### `server.js` (Express.js)

```javascript
const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Nahraďte vašimi VAPID kľúčmi
const publicVapidKey = 'VÁŠ_VEREJNÝ_VAPID_KĽÚČ';
const privateVapidKey = 'VÁŠ_SÚKROMNÝ_VAPID_KĽÚČ';
const vapidMailto = 'mailto:info@viandmo.com';

webPush.setVapidDetails(vapidMailto, publicVapidKey, privateVapidKey);

// Tu by ste mali ukladať subskripcie do databázy (napr. PostgreSQL, MongoDB)
let subscriptions = [];

// Endpoint na uloženie subskripcie
app.post('/api/subscribe', (req, res) => {
    const subscription = req.body;
    // Overenie, či subskripcia už neexistuje
    if (!subscriptions.some(sub => sub.endpoint === subscription.endpoint)) {
        subscriptions.push(subscription);
        console.log('Nová subskripcia pridaná:', subscription.endpoint);
    }
    res.status(201).json({ message: 'Subscription saved.' });
});

// Endpoint na odoslanie notifikácie
app.post('/api/send-notification', (req, res) => {
    const notificationPayload = JSON.stringify(req.body);

    const promises = subscriptions.map(sub => 
        webPush.sendNotification(sub, notificationPayload).catch(err => {
            if (err.statusCode === 410 || err.statusCode === 404) {
                console.log('Subskripcia expirovala alebo je neplatná:', sub.endpoint);
                // Odstránenie neplatnej subskripcie z databázy
                subscriptions = subscriptions.filter(s => s.endpoint !== sub.endpoint);
            } else {
                console.error('Chyba pri odosielaní notifikácie:', err);
            }
        })
    );

    Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Notifikácie odoslané.' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

const port = 5000;
app.listen(port, () => console.log(`Server beží na porte ${port}`));
```

### `package.json` (dependencies)
```json
{
  "name": "viandmo-push-server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "web-push": "^3.4.5"
  }
}
```