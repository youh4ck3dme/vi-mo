// Fix: Define the Article interface to be used across the application.
export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  content: string; // HTML content as a string
  datePublished: string; // ISO date string e.g., '2023-10-26'
  district: string;
  category: string;
}