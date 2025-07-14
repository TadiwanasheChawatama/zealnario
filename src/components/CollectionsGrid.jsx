import { Link } from "react-router-dom";

const CollectionsGrid = ({collection}) => {
  const imgPath = "../assets/images/";
  const imgsrc = new URL(
    `${imgPath}${collection.image}`,
    import.meta.url
  ).href;
  
  return (
    <div
    key={collection.id}
    className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
  >
    <img
      src={imgsrc}
      alt={collection.name}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800">
        {collection.name}
      </h2>
      <p className="text-gray-600 mt-2">{collection.description}</p>
      <Link
        to={`/collections/${collection.id}`}
        className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
      >
        Shop Now
      </Link>
    </div>
  </div>
  )
}

export default CollectionsGrid
