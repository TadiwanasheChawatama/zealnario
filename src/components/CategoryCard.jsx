import { Link } from "react-router-dom";

const CategoryCard = ({ product }) => {
  const imgPath = "../assets/images/";
  const imgsrc = new URL(
    `${imgPath}${product.productGallery[1]}`,
    import.meta.url
  ).href;

  return (
<div
  className="max-w-[300px] relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 group"
  data-product-id={product.id}
  data-category={[product.productCategory]}
>
  {/* Product Image Section */}
  <div className="relative">
    <img
      src={imgsrc}
      alt={product.productName}
      className="w-full h-64 object-cover object-center transition-all duration-300 group-hover:opacity-80"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link
        className="btn bg-white text-black px-6 py-2 rounded-full text-sm font-semibold uppercase hover:bg-gray-200 transition-all duration-200"
        to={`/products/${product.id}/`}
      >
        Add to Cart
      </Link>
    </div>
  </div>

  {/* Product Information Section */}
  <div className="p-4">
    {/* Product Name */}
    <h3 className="font-bold text-lg text-gray-800 truncate">{product.productName}</h3>
    {/*  Product Price*/}
    <p className="text-xl font-semibold text-gray-900 mt-2">{product.productPrice}</p>
  </div>
</div>

  );
};

export default CategoryCard;
