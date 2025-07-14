import { Link } from "react-router-dom";

const CatergoryGridItem = ({ item }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
    {/* Product Image Section */}
    <div className="relative">
      <img
        src={item.imgSrc}
        alt={item.productName}
        className="w-full h-72 object-cover object-center"
      />
      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition-all duration-300">
          <Link to={`/products/${item.id}`} className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200">
            Quick View
          </Link>
        </div>
        {/* New Tag */}
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase">
          New
        </div>
      </div>

      {/* Product Information Section */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">{item.productName}</h3>
        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mt-2">
          ${item.productPrice}
        </p>

      </div>
    </div>


  );
};

export default CatergoryGridItem;
