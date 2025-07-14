import { useState } from "react";
import { Link } from "react-router-dom";

const CategoryNav = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length + 2
  );

  const handleClick = (e) => {
    const category = e.target.dataset.category;
    onCategoryChange(category);
    setSelectedCategory(category);
  };

  return (
    <div className="category-nav">
      <Link
        className={`category-btn ${
          selectedCategory == categories.length + 2 ? "active" : ""
        }`}
        data-category={categories.length + 2}
        onClick={handleClick}
      >
        All Products
      </Link>
      {categories.map((category) => (
        <Link
          className={`category-btn ${
            selectedCategory === category.id ? "active" : ""
          }`}
          data-category={category.id}
          onClick={handleClick}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryNav;

// <div className="category-nav">
// <button
//   className="category-btn active"
//   data-category="all-categories"
//   onClick={handleClick}
// >
//   All Products
// </button>
// <button
//   className="category-btn"
//   data-category="tshirts"
//   onClick={handleClick}
// >
//   T-Shirts
// </button>
// <button
//   className="category-btn"
//   data-category="hoodies"
//   onClick={handleClick}
// >
//   Hoodies
// </button>
// <button
//   className="category-btn"
//   data-category="tracksuits"
//   onClick={handleClick}
// >
//   Tracksuits
// </button>
// <button
//   className="category-btn"
//   data-category="accessories"
//   onClick={handleClick}
// >
//   Accessories
// </button>
// </div>
