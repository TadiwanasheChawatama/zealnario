import SectionHeader from "./SectionHeader";
import ShopItem from "./ShopItem";

const HomeShop = ({ heading, text, products }) => {

  return (
    <section className="categories">
      <SectionHeader heading={heading} text={text} />
      <div className="category-grid">
        {products.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HomeShop;
