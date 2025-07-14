import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import ProductCard from "./ProcuctCard";
import ClipLoad from "./ClipLoad";

const CategorySection = ({ category, page }) => {
  const [categoryProducts, SetCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(`/api/products?productCategory=${category.id}`);
        const data = await res.json();
        SetCategoryProducts(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchCategoryProducts();
  }, []);

  if (loading) {
    return (
      <>
        <section className="category-section" id={category.id}>
          <h2 className="category-title py-4">{category.name}</h2>
          <ClipLoad />
        </section>
      </>
    );
  }
  return (
    <section className="category-section" id={category.id}>
      <h2 className="category-title py-4">{category.name}</h2>
      <div className="product-grid">
        {categoryProducts.flatMap((product) =>
          page == "shop" ? (
            <CategoryCard key={product.id} product={product} />
          ) : (
            <ProductCard key={product.id} product={product} />
          )
        )}
      </div>
    </section>
  );
};

export default CategorySection;
