// CategoryFilterButton.js
import React from "react";

const CategoryFilterButton = ({ categories, selectedCategory, onChange }) => {
  return (
    <span className="category">
      <select
        className="category-btn"
        value={selectedCategory}
        onChange={onChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </span>
  );
};

export default CategoryFilterButton;
