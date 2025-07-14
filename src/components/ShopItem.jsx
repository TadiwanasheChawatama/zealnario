import { Link } from "react-router-dom";

const ShopItem = ({ item }) => {

const truncateText = (text, limit)=>{
  if(text.length> limit){
    return text.substring(0, limit + "...")
  }
  return text
}

  return (
    <Link
      to={`/products/${item.id}`}
      className="max-w-[300px] relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <img
        src={item.imgSrc}
        alt={item.productName}
        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6 transition-opacity duration-300 group-hover:bg-black/60">
        <div>
          <h3 className="text-pink-300 text-lg font-bold mb-1">
            {item.productName}
          </h3>
          <p className="text-pink-200 text-sm mb-2">{item.description}</p>

          <p className="text-pink-200 text-sm font-bold">${item.productPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShopItem;
