import { Article } from '../types';

/**
 * Pomocná funkcia na aktualizáciu alebo vytvorenie meta tagu v <head>.
 * @param name - Atribút 'name' alebo 'property' tagu.
 * @param content - Obsah meta tagu.
 * @param attr - Typ atribútu ('name' alebo 'property').
 */
const updateMetaTag = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement;
  if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

/**
 * Pomocná funkcia na aktualizáciu alebo vytvorenie link tagu v <head>.
 * @param rel - Atribút 'rel' tagu.
 * @param href - Atribút 'href' tagu.
 */
const updateLinkTag = (rel: string, href: string) => {
  let element = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement;
  if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

/**
 * Vloží pole JSON-LD schém do <head> pomocou script tagu.
 * @param schemas - Pole objektov reprezentujúcich schémy.
 * @param scriptId - ID pre script tag.
 */
const injectSchemas = (schemas: object[], scriptId: string) => {
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);
}

/**
 * Vloží globálnu LocalBusiness schému pre firmu VI&MO.
 */
export const injectLocalBusinessSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "VI and MO s. r. o.",
      "image": "https://app.viandmo.com/images/icons/icon-512x512.png",
      "@id": "https://app.viandmo.com",
      "url": "https://app.viandmo.com",
      "telephone": "+421911275755",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Karpatské námestie 7770/10A",
        "addressLocality": "Bratislava",
        "postalCode": "831 06",
        "addressCountry": "SK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.21,
        "longitude": 17.15
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": ["https://viandmo.com/"] 
    };
    injectSchemas([schema], 'local-business-schema');
};

/**
 * Aktualizuje všetky SEO tagy a schémy pre konkrétny blogový článok.
 * @param article - Objekt článku.
 */
export const updateBlogPostSeo = (article: Article) => {
    document.title = article.metaTitle;
    const canonicalUrl = `https://app.viandmo.com/#/blog/${article.slug}`;

    // Základné meta tagy
    updateMetaTag('description', article.metaDescription);
    updateMetaTag('keywords', article.keywords.join(', '));
    updateLinkTag('canonical', canonicalUrl);

    // Open Graph & Twitter Card
    updateMetaTag('og:title', article.metaTitle, 'property');
    updateMetaTag('og:description', article.metaDescription, 'property');
    updateMetaTag('og:type', 'article', 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:image', 'https://app.viandmo.com/images/screenshots/screenshot2.png', 'property');
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', article.metaTitle);
    updateMetaTag('twitter:description', article.metaDescription);
    updateMetaTag('twitter:image', 'https://app.viandmo.com/images/screenshots/screenshot2.png');

    // Príprava a vloženie JSON-LD schém
    const schemas = [];

    // 1. Breadcrumb Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Blog",
        "item": "https://app.viandmo.com/#/blog"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": article.title
      }]
    });

    // 2. Article Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
      "headline": article.title,
      "description": article.metaDescription,
      "image": "https://app.viandmo.com/images/screenshots/screenshot2.png",  
      "author": { "@type": "Organization", "name": "VI&MO" },  
      "publisher": {
        "@type": "Organization",
        "name": "VI and MO s. r. o.",
        "logo": { "@type": "ImageObject", "url": "https://app.viandmo.com/images/icons/icon-512x512.png" }
      },
      "datePublished": article.datePublished
    });

    // 3. FAQ Schema (parsovanie z HTML)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.content;
    const faqItems = Array.from(tempDiv.querySelectorAll('.faq-item')).map(item => {
        const question = item.querySelector('h3')?.innerText;
        const answer = item.querySelector('p')?.innerText;
        if (question && answer) {
            return {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": { "@type": "Answer", "text": answer }
            };
        }
        return null;
    }).filter(Boolean);

    if (faqItems.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems
        });
    }
    
    injectSchemas(schemas, 'blog-post-schema');
};

/**
 * Vyčistí SEO tagy a schémy po opustení stránky článku.
 */
export const cleanupBlogPostSeo = () => {
    const schemaScript = document.getElementById('blog-post-schema');
    if (schemaScript) {
        schemaScript.remove();
    }
    // Reset na defaultné hodnoty
    document.title = 'VI&MO - Sťahovanie a Upratovanie Bratislava';
    updateMetaTag('description', 'Váš kompletný sprievodca sťahovaním v Bratislave. Tipy, triky a profesionálne služby od VI&MO pre bezstarostný presun.');
};
