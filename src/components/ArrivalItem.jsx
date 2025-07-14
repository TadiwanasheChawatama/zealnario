import { Link } from "react-router-dom";

const ArrivalItem = ({ item }) => {
  const imgPath = "../assets/images/";
  const imgSrc = new URL(`${imgPath}${item.image}`, import.meta.url).href;

  return (
    <Link
      to={`/collections/${item.id}`}
      className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white group"
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs uppercase px-3 py-1 rounded-full shadow">
          New
        </span>
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold group-hover:text-pink-600 transition">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
    </Link>
  );
};

export default ArrivalItem;
