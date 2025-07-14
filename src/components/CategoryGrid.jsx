import { useState } from "react";
import CatergoryGridItem from "./CatergoryGridItem";
import LoadMore from "./LoadMore";

const CategoryGrid = ({ categoryChange,categories, filteredProducts }) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItemsToShow((prev) => prev + 2);
      setLoading(false);
    }, 1000);
  };
  
  const handleClick = (e) => {
    const categoryId = e.target.dataset.categoryid;
    categoryChange(categoryId);
    setItemsToShow(6);
  };

  return (
    <>
<section className="category-products py-12 bg-gray-50">
  <div className="container mx-auto px-6">
    {/* Filter Bar */}
    <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-6">
      {/* Categories */}
      <div className="flex gap-4 flex-wrap">
          <button
            className="filter-btn text-sm px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
            data-categoryid={categories.length + 2}
            key={categories.length + 2}
            onClick={handleClick}
          >
            All
          </button>
        {categories.map((category) => (
          <button
            className="filter-btn text-sm px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
            data-categoryid={category.id}
            key={category.id}
            onClick={handleClick}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <select className="filter-select text-sm text-gray-900 p-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500">
          <option value="">Sort By</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search items..."
          className="text-sm px-4 py-2 rounded-md border text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Products Grid */}
    <div className="new-arrivals-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
        filteredProducts
          .slice(0, itemsToShow)
          .map((item) => (
            <CatergoryGridItem key={item.id} item={item} />
          ))
        }
    </div>

    {/* Load More Button */}
    {itemsToShow < filteredProducts.length && (
  <LoadMore handleLoadMore={handleLoadMore} loading={loading} />
)}

    {/* <div className="text-center mt-8">
      <button
        className="page-btn px-6 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handleLoadMore}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div> */}
  </div>
</section>

    </>
  );
};

export default CategoryGrid;







































// import { useState } from "react";
// import CatergoryGridItem from "./CatergoryGridItem";
// import Gallery1 from "../assets/images/Gallery1.jpg";
// import LoadMore from "./LoadMore";

// const CategoryGrid = ({ categoryChange, categories, filteredCategories }) => {
//   const [itemsToShow, setItemsToShow] = useState(2);
//   const [loading, setLoading] = useState(false);

//   const handleLoadMore = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setItemsToShow(itemsToShow + 2);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleClick = (e) => {
//     const categoryId = e.target.dataset.categoryid;
//     categoryChange(categoryId);
//     setItemsToShow(6);
//   };

//   return (
//     <>
// <section className="category-products py-12 bg-gray-50">
//   <div className="container mx-auto px-6">
//     {/* Filter Bar */}
//     <div className="flex items-center justify-between mb-8 flex-col md:flex-row gap-6">
//       {/* Categories */}
//       <div className="flex gap-4 flex-wrap">
//         {categories.map((category) => (
//           <button
//             className="filter-btn text-sm px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
//             data-categoryid={category.id}
//             key={category.id}
//             onClick={handleClick}
//           >
//             {category.category}
//           </button>
//         ))}
//       </div>

//       {/* Sort Dropdown */}
//       <div className="flex items-center gap-4 mt-4 md:mt-0">
//         <select className="filter-select text-sm p-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500">
//           <option value="">Sort By</option>
//           <option value="newest">Newest First</option>
//           <option value="price-low">Price: Low to High</option>
//           <option value="price-high">Price: High to Low</option>
//         </select>

//         {/* Search Input */}
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search items..."
//           className="text-sm px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//     </div>

//     {/* Products Grid */}
//     <div className="new-arrivals-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {filteredCategories.flatMap((category) =>
//         category.products
//           .slice(0, itemsToShow)
//           .map((item) => (
//             <CatergoryGridItem key={item.dataProductId} item={item} />
//           ))
//       )}
//     </div>

//     {/* Load More Button */}
//     <LoadMore />
//     {/* <div className="text-center mt-8">
//       <button
//         className="page-btn px-6 py-3 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
//         onClick={handleLoadMore}
//       >
//         {loading ? "Loading..." : "Load More"}
//       </button>
//     </div> */}
//   </div>
// </section>

//     </>
//   );
// };

// export default CategoryGrid;
