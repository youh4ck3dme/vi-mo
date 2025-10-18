export interface Article {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  district: string;
  content: string; // HTML content
  keywords: string[];
  datePublished: string;
}
