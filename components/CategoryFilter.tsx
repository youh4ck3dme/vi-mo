import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex-shrink-0">
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="w-full md:w-auto px-4 py-3 rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-brand-teal focus:border-brand-teal transition"
        aria-label="Filtrovať podľa kategórie"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;