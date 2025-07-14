import { Link } from "react-router-dom";

const GalleryItem = ({ item }) => {
  return (
    <Link to={"/gallery"} className="relative overflow-hidden rounded-xl shadow-md group">
    <img
      src={item.imgSrc}
      alt={item.comment}
      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white text-center p-4">
      {/* <h3 className="text-xl font-bold mb-1">{item.comment}</h3> */}
      <p className="text-sm">{item.comment}</p>
    </div>
  </Link>

  );
};

export default GalleryItem;
