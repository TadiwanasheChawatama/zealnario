import SectionHeader from "./SectionHeader";
import { useState,useEffect } from "react";
import FeaturedCard from "./FeaturedCard";

const HomeFeatured = () => {

  const [images, setImages] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery/");
      const data = await res.json();
      
      const resProducts = await fetch(`/api/products/`)
      const products = await resProducts.json();

      const gallery = data.map((item) => {
        if (item) {
          const product = products.find((prod)=>prod.id==item.productId)

          const imgPath = "../assets/images/";
          const imgSrc = new URL(`${imgPath}${item.image}`, import.meta.url)
            .href;
          return {
            ...item,
            productName: product.productName,
            productPrice: product.productPrice,
            imgSrc,
          };
        }
      });
      setImages(gallery.slice(0,4));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <section id="featured" className="featured-products">
      <SectionHeader
        heading={"Featured Collection"}
        text={"Discover our most coveted pieces"}
      />
      <div className="product-grid">
        {images.map((item) => (
          <FeaturedCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default HomeFeatured;
