
# VI&MO - PWA Blog a Notifikačný Systém

Toto je dokumentácia pre PWA (Progressive Web App) pre firmu VI&MO. Aplikácia slúži ako informačný blog a platforma pre zasielanie push notifikácií zákazníkom.

## Časť 1: Deployment a Nastavenie (Frontend)

Tento projekt je postavený na React + TypeScript a štýlovaný pomocou Tailwind CSS.

### Kroky pre Deployment

1.  **Build Projektu**: Zbuildite React aplikáciu. Vytvorí sa adresár `dist` (alebo `build`).
    ```bash
    npm install
    npm run build
    ```

2.  **Upload Súborov**: Nahrajte obsah adresára `dist` do koreňového adresára vášho hostingu (napr. `public_html` na `app.viandmo.com`).

3.  **Nahrajte Verejné Súbory**: Uistite sa, že nasledujúce súbory sú v koreňovom adresári vášho webu:
    *   `manifest.json`
    *   `sw.js` (service worker)
    *   `offline.html`
    *   adresár `images/` s ikonami a screenshotmi

4.  **HTTPS**: Vaša doména **musí** bežať na HTTPS. Service workers a push notifikácie vyžadujú bezpečné pripojenie.

5.  **Overenie Service Workera**: Otvorte v prehliadači Chrome DevTools -> Application -> Service Workers a overte, že `sw.js` je aktivovaný a beží.

---

## Časť 2: Nastavenie Push Notifikácií (Backend)

Backend je potrebný na ukladanie odberov (subscriptions) a odosielanie push notifikácií. Nižšie sú príklady pre **Node.js** s Express.js.

### 1. Inštalácia Závislostí

Vytvorte si na serveri `package.json` a nainštalujte potrebné balíčky.

**`package.json`**
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
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "web-push": "^3.4.5",
    "dotenv": "^10.0.0" 
  }
}
```
Spustite inštaláciu: `npm install`

### 2. Vytvorenie VAPID Kľúčov

VAPID kľúče autentifikujú váš server u push služby. Vygenerujte ich raz a uložte si ich.

```bash
npx web-push generate-vapid-keys
```

Výstup uložte do `.env` súboru.

**`.env.example`**
```
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:info@viandmo.com
```

### 3. Serverový Kód

Toto je príklad `server.js`, ktorý handled ukladanie odberov a odosielanie notifikácií.

**`server.js`**
```javascript
// Načítanie premenných prostredia
require('dotenv').config();

const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;
const vapidSubject = process.env.VAPID_SUBJECT;

webpush.setVapidDetails(vapidSubject, publicVapidKey, privateVapidKey);

// V reálnej aplikácii by ste subscriptions ukladali do databázy
// Napr. PostgreSQL, MongoDB, atď.
let subscriptions = [];

// Endpoint na uloženie nového odberu
app.post('/api/subscribe', (req, res) => {
    const subscription = req.body;
    
    // Tu by ste mali pridať logiku na overenie a uloženie do databázy
    // Uistite sa, že neukladáte duplicity
    if (!subscriptions.some(sub => sub.endpoint === subscription.endpoint)) {
        subscriptions.push(subscription);
        console.log('Nové prihlásenie na odber pridané.');
    }
    
    res.status(201).json({ message: 'Subscription saved.' });
});

// Endpoint na odoslanie notifikácie
app.post('/api/send-notification', (req, res) => {
    const notificationPayload = {
        title: req.body.title,
        body: req.body.body,
        icon: req.body.icon || 'https://app.viandmo.com/images/icons/icon-192x192.png',
        url: req.body.url,
        actions: [
          {"action":"view","title":"Zobraziť"},
          {"action":"book","title":"Objednať"},
          {"action":"dismiss","title":"Zatvoriť"}
        ]
    };

    const payload = JSON.stringify(notificationPayload);

    const promises = subscriptions.map(sub => 
        webpush.sendNotification(sub, payload).catch(err => {
            // Ak je subscription neplatná (404, 410), mali by ste ju odstrániť z DB
            if (err.statusCode === 404 || err.statusCode === 410) {
                console.log('Subscription has expired or is no longer valid: ', err);
                // Tu by mala byť logika na odstránenie 'sub' z databázy
                subscriptions = subscriptions.filter(s => s.endpoint !== sub.endpoint);
            } else {
                console.error('Error sending notification, error code: ', err.statusCode);
            }
        })
    );

    Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Notifications sent successfully.' }))
        .catch(err => {
            console.error("Error sending notifications: ", err);
            res.sendStatus(500);
        });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Push server beží na porte ${PORT}`);
});
```

### 4. Databázová Schéma (Príklad pre PostgreSQL)

```sql
CREATE TABLE push_subscriptions (
    id SERIAL PRIMARY KEY,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## Časť 3: Testovanie PWA

Použite **Lighthouse** v Chrome DevTools na auditovanie PWA.

### Checklist Testovania

- [ ] **HTTPS**: Aplikácia je načítaná cez HTTPS.
- [ ] **Service Worker**: Je registrovaný a aktívny.
- [ ] **Manifest**: Je správne linkovaný a validný.
- [ ] **PWA Inštalácia**: Prehliadač ponúka možnosť "Pridať na plochu".
- [ ] **Offline Režim**: Aplikácia načíta offline stránku pri strate pripojenia.
- [ ] **Push Subscription**: Tlačidlo "Povoliť Notifikácie" funguje.
    - [ ] Po kliknutí sa zobrazí žiadosť o povolenie.
    - [ ] Po povolení sa subscription odošle na server.
    - [ ] Tlačidlo zmení stav na "Zrušiť notifikácie".
- [ ] **Push Notifikácie**:
    - [ ] Server dokáže odoslať notifikáciu.
    - [ ] Notifikácia sa zobrazí na desktope aj mobile.
    - [ ] Kliknutie na notifikáciu (akcia "view") otvorí správnu URL.
    - [ ] Akcie "book" a "dismiss" fungujú podľa očakávaní.
- [ ] **Responzivita**: Aplikácia vyzerá a funguje dobre na rôznych zariadeniach.

---

## Časť 4: Publikovanie Blogových Článkov

Vygenerované HTML články sú pripravené na vloženie do WordPressu.

### Kroky pre WordPress

1.  Prihláste sa do administrácie WordPress.
2.  Prejdite do `Články` -> `Pridať nový`.
3.  V pravom hornom rohu editora Gutenberg prepnite z `Vizuálny editor` na `Editor kódu`.
4.  Skopírujte celý HTML kód článku a vložte ho do editora.
5.  Prepnutím späť na `Vizuálny editor` overte, či sa všetko zobrazuje správne.
6.  Nastavte `Názov článku`, `URL slug`, `Meta Title` a `Meta Description` (pomocou SEO pluginu ako Yoast alebo Rank Math).
7.  Pridajte `Hlavný obrázok` a nastavte kategóriu/štítky.
8.  Publikujte článok.
9.  Nezabudnite pridať `Schema Markup` (FAQPage, LocalBusiness), ktorý je pripravený v JSON-LD formáte, do hlavičky stránky alebo cez príslušný plugin.

---
**Veľa úspechov s novou PWA!** 🚀
