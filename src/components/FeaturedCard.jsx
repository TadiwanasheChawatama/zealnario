import { Link } from "react-router-dom";

const FeaturedCard = ({ item }) => {
  // console.log(item);
  return (
    // <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group bg-white">
    // {/* Image & Hover Overlay */}
    // <div className="relative">
    //   <img
    //     src={item.imgSrc}
    //     alt={item.comment}
    //     className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
    //   />

    //   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
    //     <Link
    //       to={`/products/${item.productId}`}
    //       className="px-4 py-2 bg-white text-black font-semibold rounded-full shadow hover:bg-gray-200 transition"
    //     >
    //       Quick View
    //     </Link>
    //   </div>
    // </div>

    // {/* Info */}
    // <div className="p-4 text-center">
    //   <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
    //   <p className="text-pink-600 font-bold mt-1">${item.productPrice}</p>
    //   </div>
    // </div>
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden p-1">
      <div className="relative">
        <img
          src={item.imgSrc}
          alt={item.comment}
          className="w-full h-64 object-cover rounded-xl mx-auto"
        />
        <span className="absolute top-3 left-3 bg-pik-100 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          20% off
        </span>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">{item.productName}</h2>
          <span className="bg-pink-700 text-white text-sm px-3 py-1 rounded-full font-semibold">
            ${item.productPrice}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-2">
          {item.comment}
        </p>

        <div className="flex gap-2 mb-2">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            Best Seller
          </span>
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
            9 left
          </span>
        </div>

        <Link 
        to={`/products/${item.productId}`}
        className="block text-center bg-pink-700 text-white py-2 rounded-full font-semibold hover:bg-pink-800 transition">
          Quick View
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
