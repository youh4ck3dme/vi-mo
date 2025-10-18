// Fix: Provide mock article data and export it.
import { Article } from '../types';

export const articles: Article[] = [
  {
    slug: 'stahovanie-v-bratislave-kompletny-sprievodca',
    title: 'Sťahovanie v Bratislave: Kompletný sprievodca pre bezstarostný presun',
    metaTitle: 'Sťahovanie Bratislava | Tipy a Triky od VI&MO',
    metaDescription: 'Plánujete sťahovanie v Bratislave? Prečítajte si nášho kompletného sprievodcu plného tipov a trikov, ako zvládnuť presun bez stresu. Profesionálne služby od VI&MO.',
    keywords: ['sťahovanie Bratislava', 'sťahovacia služba', 'tipy na sťahovanie', 'VI&MO', 'bezstarostné sťahovanie'],
    content: `
      <h1>Sťahovanie v Bratislave: Ako na to bez stresu?</h1>
      <p>Sťahovanie môže byť jednou z najstresujúcejších udalostí v živote. Ale s dobrou prípravou a správnym partnerom to môže byť hračka. V tomto článku vám prinášame kompletný sprievodca, ako zvládnuť sťahovanie v hlavnom meste ako profesionál.</p>
      
      <h2>1. Plánovanie je základ</h2>
      <p>Začnite s plánovaním aspoň mesiac vopred. Vytvorte si zoznam úloh, od triedenia vecí, cez zabezpečenie obalového materiálu, až po samotný deň D.</p>

      <div class="faq-item">
        <h3>Ako si vybrať správnu sťahovaciu firmu?</h3>
        <p>Hľadajte firmy s dobrými recenziami, transparentnými cenami a poistením. VI&MO ponúka kompletné služby na mieru vašim potrebám.</p>
      </div>

      <h2>2. Balenie s rozumom</h2>
      <p>Označujte si krabice podľa miestnosti a obsahu. Krehké veci baľte zvlášť a označte ich nápisom "KREHKÉ".</p>
    `,
    datePublished: '2023-10-26',
    district: 'Celá Bratislava',
    category: 'Sťahovanie',
  },
  {
    slug: 'upratovanie-po-stahovani',
    title: 'Upratovanie po sťahovaní: Prečo sa to oplatí nechať na profesionálov?',
    metaTitle: 'Upratovanie po Sťahovaní Bratislava | VI&MO',
    metaDescription: 'Ušetrite si čas a energiu. Zistite, prečo je profesionálne upratovanie po sťahovaní v Bratislave tou najlepšou voľbou. Čistý štart vo vašom novom domove s VI&MO.',
    keywords: ['upratovanie po sťahovaní', 'upratovacie služby Bratislava', 'čistota', 'VI&MO'],
    content: `
      <h1>Prečo si objednať upratovanie po sťahovaní?</h1>
      <p>Po náročnom sťahovaní je to posledné, na čo máte chuť, upratovanie. Profesionálna upratovacia služba vám zabezpečí, že starý byt odovzdáte v perfektnom stave a nový vás privíta žiarivou čistotou.</p>
      
      <div class="faq-item">
        <h3>Čo zahŕňa upratovanie po sťahovaní?</h3>
        <p>Komplexné čistenie od podláh, okien, až po kuchynskú linku a sanitu. Všetko podľa dohody a vašich požiadaviek.</p>
      </div>
    `,
    datePublished: '2023-10-20',
    district: 'Staré Mesto',
    category: 'Upratovanie',
  },
];
