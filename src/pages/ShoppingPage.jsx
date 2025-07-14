import { useEffect, useState } from "react";
import Header from "../components/Header";
import CategoryNav from "../components/CategoryNav";
import CategorySection from "../components/CategorySection";
import PulseLoader from "../components/PulseLoader";

const ShoppingPage = () => {
  const [categories, SetCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length + 2
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        SetCategories(data);
        setSelectedCategory(data.length + 2);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredCategories =
    selectedCategory == categories.length + 2
      ? categories
      : categories.filter((category) => category.id === selectedCategory);

  if (loading) {
    return (
      <>
        <Header heading={"Shop Now"} expo={"Browse our latest products"} />
        <div className="all-categories">
          <PulseLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header heading={"Shop Now"} expo={"Browse our latest products"} />

      <CategoryNav
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />
      <div className="all-categories">
        {filteredCategories.map((category) => (
          <CategorySection
            page={"shop"}
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </>
  );
};

export default ShoppingPage;
