
import { Article } from '../types';

// Fix: Provide mock data for blog articles to resolve import errors.
export const articles: Article[] = [
  {
    slug: 'stahovanie-v-bratislave-kompletny-sprievodca',
    title: 'Sťahovanie v Bratislave: Kompletný sprievodca pre bezstarostný presun',
    metaTitle: 'Sťahovanie Bratislava | Tipy a Triky od VI&MO',
    metaDescription: 'Plánujete sťahovanie v Bratislave? Prečítajte si náš kompletný sprievodca plný tipov a trikov, ako zvládnuť presun bez stresu. Služby od VI&MO.',
    keywords: ['sťahovanie', 'Bratislava', 'tipy', 'sprievodca', 'VI&MO'],
    content: `
      <h2>Plánovanie je kľúč</h2>
      <p>Sťahovanie môže byť stresujúce, ale dobré plánovanie je polovica úspechu. Dôležité je začať včas, ideálne niekoľko týždňov pred plánovaným termínom. Vytvorte si podrobný zoznam úloh, aby ste na nič nezabudli.</p>
      <img src="https://picsum.photos/seed/planovanie-stahovania/800/400" alt="Plánovanie sťahovania" class="rounded-lg my-6">
      <h3>Ako si vytvoriť harmonogram?</h3>
      <ul>
        <li><strong>4 týždne pred:</strong> Zabezpečte si sťahovaciu firmu, začnite triediť veci.</li>
        <li><strong>2 týždne pred:</strong> Zaobstarajte si baliaci materiál (krabice, pásky, fólie).</li>
        <li><strong>1 týždeň pred:</strong> Začnite baliť menej potrebné veci.</li>
        <li><strong>Deň pred:</strong> Zbaľte si "krabicu prvej pomoci" s nevyhnutnosťami na prvú noc.</li>
      </ul>
      <div class="faq-item my-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <h3>Ako začať s balením?</h3>
          <p class="mt-2">Začnite s vecami, ktoré používate najmenej. Knihy, sezónne oblečenie a dekorácie môžu ísť do krabíc ako prvé. Nezabudnite každú krabicu označiť jej obsahom a miestnosťou, kam patrí.</p>
      </div>
      <h2>Ako vybrať správnu sťahovaciu firmu?</h2>
      <p>Výber spoľahlivej firmy je zásadný. Hľadajte recenzie, pýtajte si cenové ponuky od viacerých firiem a overte si, či majú poistenie. Firma VI&MO ponúka komplexné služby s poistením a profesionálnym prístupom.</p>
    `,
    datePublished: '2023-10-26',
    district: 'Staré Mesto',
    category: 'Sťahovanie',
  },
  {
    slug: 'vypratavanie-pivnice-efektivne',
    title: 'Ako efektívne vypratať pivnicu? Tipy od profesionálov',
    metaTitle: 'Vypratávanie pivníc Bratislava | VI&MO',
    metaDescription: 'Máte plnú pivnicu a neviete kde začať? Naši experti z VI&MO vám poradia, ako na efektívne a rýchle vypratávanie pivnice v Bratislave.',
    keywords: ['vypratávanie', 'pivnica', 'Bratislava', 'upratovanie'],
    content: `
      <h2>Krok za krokom k čistej pivnici</h2>
      <p>Vypratávanie pivnice sa môže zdať ako náročná úloha, ale s našimi tipmi to zvládnete hravo. Základom je systematický prístup.</p>
      <h3>1. Vytrieďte všetko von</h3>
      <p>Vyneste všetko z pivnice na jedno miesto, kde budete mať dostatok svetla a priestoru na triedenie. To vám umožní vidieť, čo všetko vlastne máte.</p>
      <h3>2. Roztrieďte veci do kategórií</h3>
      <p>Vytvorte si štyri kopy: ponechať, darovať/predať, vyhodiť a recyklovať. Buďte nekompromisní – ak ste vec nepoužili viac ako rok, pravdepodobne ju už nepotrebujete.</p>
      <div class="faq-item my-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <h3>Kam s nepotrebnými vecami?</h3>
          <p class="mt-2">Veci roztrieďte na tie, ktoré chcete darovať, predať, recyklovať alebo vyhodiť. Zabezpečíme odvoz a ekologickú likvidáciu odpadu, vrátane nebezpečného materiálu.</p>
      </div>
      <h3>3. Upratovanie a organizácia</h3>
      <p>Keď je pivnica prázdna, dôkladne ju vyčistite. Následne si zorganizujte priestor pomocou regálov a úložných boxov. Veci, ktoré si nechávate, uložte prehľadne a logicky.</p>
    `,
    datePublished: '2023-11-15',
    district: 'Ružinov',
    category: 'Vypratávanie',
  },
  {
    slug: 'balenie-krehkych-veci-bezpecne',
    title: '5 tipov, ako bezpečne zabaliť krehké veci pri sťahovaní',
    metaTitle: 'Ako baliť sklo a porcelán | Tipy VI&MO',
    metaDescription: 'Sťahujete a bojíte sa o vaše krehké poklady? Prečítajte si 5 osvedčených tipov, ako bezpečne zabaliť sklo, porcelán a inú krehkú výbavu.',
    keywords: ['balenie', 'krehké veci', 'sklo', 'sťahovanie'],
    content: `
      <h2>Ochrana krehkých predmetov je priorita</h2>
      <p>Správne zabalenie krehkých vecí je jedným z najdôležitejších krokov pri sťahovaní. Tu sú osvedčené postupy.</p>
      <ol>
        <li><strong>Použite kvalitný materiál:</strong> Bublinková fólia, baliaci papier a pevné krabice sú základ.</li>
        <li><strong>Každý kus balte zvlášť:</strong> Zabaľte každý tanier, pohár alebo sošku samostatne do papiera alebo fólie.</li>
        <li><strong>Vyplňte prázdny priestor:</strong> V krabiciach nenechávajte voľné miesto. Vyplňte ho pokrčeným papierom alebo textíliami.</li>
        <li><strong>Ťažšie veci na spodok:</strong> Do krabice ukladajte ťažšie predmety naspodok a ľahšie navrch.</li>
        <li><strong>Jasne označte krabice:</strong> Na krabice napíšte veľkým písmom "KREHKÉ" a označte, ktorá strana je hore.</li>
      </ol>
      <div class="faq-item my-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <h3>Aké krabice sú najlepšie?</h3>
          <p class="mt-2">Používajte menšie, ale pevné, dvojvrstvové kartónové krabice. Sú ľahšie na manipuláciu a znižujú riziko, že budú príliš ťažké a pretrhnú sa.</p>
      </div>
    `,
    datePublished: '2023-12-01',
    district: 'Petržalka',
    category: 'Tipy a triky',
  }
];