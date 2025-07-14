import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import CategoryGrid from "../components/CategoryGrid";
import PulseLoader from "../components/PulseLoader";

const AllProductsPage = () => {
  const {categoryId} = useParams()
  const [categoryItems, setCategoryItems] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArrivals = async () => {
    try {
      const res = await fetch(`/api/categories/${categoryId}`);
      const category = await res.json();

      const resProducts = await fetch(`/api/products?productCategory=${categoryId}`);
      const products = await resProducts.json();

      const resCollection = await fetch("/api/collections/");
      const dataCollections = await resCollection.json();


      const categoryItems = products.map((product)=>{
        if(product){
            const imgPath = "../assets/images/";
            const imgSrc = new URL(
              `${imgPath}${product.productGallery[3]}`,
              import.meta.url
            ).href;

            const collection = dataCollections.find(
              (coll) => coll.id == product.productCollection
            );
            if(collection && !(collections.find((coll)=>coll.id === collection.id))){
              setCollections((prev) =>
                prev.some((c) => c.id == collection.id) ? prev : [...prev, collection]
              );
            }
            
            return {
              ...product,
              imgSrc: imgSrc,
            };
        }
      })

      setCategoryItems(categoryItems.slice(1));
      setFilteredProducts(categoryItems.slice(1));
      setFeaturedProduct(categoryItems[0]);
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      null;
    }
  };

  useEffect(() => {
    fetchArrivals();
  }, [categoryId]);

  const handleCategoryChange = (category) => {
    if (!(category == collections.length + 2)) {
      const filteredCate = collections.find((collection) => collection.id == category);
      if (filteredCate) {
        const filteredProds = categoryItems.filter(
          (prod) => prod.productCategory == filteredCate.id
        );
        setFilteredProducts(filteredProds);
        console.log(filteredProds);
      }
    } else {
      setFilteredProducts(categoryItems);
    }
  };


  if (loading) {
    return (
      <>
        <Header heading={"All Products"} expo={"Explore our Collection"} />
        <div className="all-categories">
          <PulseLoader />
        </div>
      </>
    );
  }

  return (
    <section>
      <Header
        heading={"All Products"} expo={"Explore our Collection"}
      />
      {/* <!-- Featured New Arrival --> */}
      <section className="featured-arrival">
        <div className="container">
          <div className="featured-product relative bg-gray-100 p-8 rounded-3xl shadow-2xl overflow-hidden">
            <div className="featured-image relative">
              <img
                src={featuredProduct.imgSrc}
                alt={featuredProduct.productDescription}
                className="w-full h-[450px] object-cover rounded-3xl transform transition-transform duration-500 ease-in-out hover:scale-110"
              />
              <div className="featured-badge absolute top-6 left-6 bg-pink-500 text-white px-5 py-3 rounded-full text-lg font-bold tracking-wide uppercase shadow-md">
                Just Launched
              </div>
            </div>

            <div className="featured-details mt-8 space-y-6">
              <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                {featuredProduct.productName}
              </h2>
              {featuredProduct.productDescription}
              <p className="featured-description text-lg text-gray-700"></p>

              <div className="price flex items-baseline gap-3 font-semibold text-pink-600">
                {/* <span className="line-through text-gray-400">
                  Was $499.99
                </span> */}
                <span className="text-xl">
                  Just ${featuredProduct.productPrice}
                </span>
              </div>

              <div className="cta-btn mt-6 flex gap-6">
                <Link
                  to={`/products/${featuredProduct.id}`}
                  className="btn bg-pink-600 text-white rounded-md px-6 py-3 inline-block transform transition-all duration-300 ease-in-out hover:bg-pink-700 hover:scale-105"
                >
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryGrid
        categoryChange={handleCategoryChange}
        filteredProducts={filteredProducts}
        categories={collections}
      />
    </section>
  );
};

export default AllProductsPage;

