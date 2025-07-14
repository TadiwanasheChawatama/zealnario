import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import CategoryGrid from "../components/CategoryGrid";
import PulseLoader from "../components/PulseLoader";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const [newArrivals, setNewArrivals] = useState([]);
  const [collection, setCollection] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const res = await fetch(`/api/collections/${collectionId}`);
      const collection = await res.json();
      setCollection(collection);

      const resProducts = await fetch("/api/products/");
      const products = await resProducts.json();

      const resCategories = await fetch("/api/categories/");
      const dataCategories = await resCategories.json();

      const collectionItems = products
        .filter((product) => product.productCollection == collectionId)
        .map((product) => {
          if (!product.productGallery || product.productGallery.length < 7) {
            console.log(`Product ${product.id} is missing images`);
            return null;
          }

          const imgPath = "../assets/images/";
          const imgSrc = new URL(
            `${imgPath}${product.productGallery[6]}`,
            import.meta.url
          ).href;

          const category = dataCategories.find(
            (cate) => cate.id == product.productCategory
          );

          if (category) {
            setCategories((prev) =>
              prev.some((c) => c.id === category.id)
                ? prev
                : [...prev, category]
            );
          } else {
            console.log(`Category not found for product ${product.id}`);
          }

          return { ...product, imgSrc };
        })
        .filter((item) => item !== null);
      console.log(collectionItems);

      if (collectionItems.length > 0) {
        setNewArrivals(collectionItems.slice(1));
        setFilteredProducts(collectionItems.slice(1));
        setFeaturedProduct(collectionItems[0]);
      } else {
        console.log("No products found for this collection");
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCategoryChange = (category) => {
    if (!(category == categories.length + 2)) {
      const filteredCate = categories.find((cate) => cate.id == category);
      if (filteredCate) {
        const filteredProds = newArrivals.filter(
          (prod) => prod.productCategory == filteredCate.id
        );
        setFilteredProducts(filteredProds);
        console.log(filteredProds);
      }
    } else {
      setFilteredProducts(newArrivals);
    }
  };
  if (loading) {
    return (
      <section>
        <Header
          heading={"Collection Name"}
          expo={"Latest Additions to Our Collection"}
        />
        {/* <!-- Featured New Arrival --> */}
        <section className="featured-arrival">
          <div className="container">
            <PulseLoader loading={loading} />
          </div>
        </section>
      </section>
    );
  }

  return (
    <section>
      <Header heading={collection.name} expo={collection.description} />
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
        categories={categories}
      />
    </section>
  );
};
export default CollectionPage;
