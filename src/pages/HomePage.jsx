import Hero from "../components/Hero";
import HomeAbout from "../components/homeAbout";
import Gallery from "../components/Gallery";
import HomeArrivals from "../components/HomeArrivals";
import HomeFeatured from "../components/HomeFeatured";
import HomeShop from "../components/HomeShop";
import { useEffect, useState } from "react";
import api from "../api"

const HomePage = () => {
// useEffect(() => {
//   fetch('http://127.0.0.1:8000/products/')
//     .then(response => {
//       console.log("Fetch response:", response);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log("Fetch data:", data);
//       setProducts(data);
//     })
//     .catch(err => {
//       console.log("Fetch error:", err);
//     });
// }, []);
useEffect(() => {
  api.get("products/")
    .then(res => {
      console.log("Response data:", res.data);
      // Check if response has pagination structure
      const productsData = res.data.results || res.data;
      setProducts(productsData);
    })
    .catch(err => {
      console.log("Error:", err.message);
    });
}, []);


  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products/");
      const data = await res.json();

      const products = data.map((prod) => {
        if (prod.productGallery) {
          let description = prod.productDescription[0]
          description = description.substring(0, 50) + "..."
          // console.log(description)
          const imgPath = "../assets/images/";
          const imgSrc = new URL(
            `${imgPath}${prod.productGallery[2]}`,
            import.meta.url
          ).href;
          return {
            ...prod,
            description,
            imgSrc,
          };
        }
      });
      setProducts(products.slice(0, 4));
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Hero />
      {/* <HomeAbout />
      <HomeArrivals />
      <Gallery />
      <HomeFeatured />
      <HomeShop
        heading={"Shop by Category"}
        text={"Find your perfect style"}
        products={products}
      /> */}
    </>
  );
};

export default HomePage;
