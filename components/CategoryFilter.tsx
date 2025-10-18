// Fix: Implement the CategoryFilter component
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
          !selectedCategory
            ? 'bg-orange-500 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Všetky kategórie
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            selectedCategory === category
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
