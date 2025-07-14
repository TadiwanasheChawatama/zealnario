import { useNavigate } from "react-router";
import Arrival2 from "../assets/images/Arrival2.jpg";
import Gallery3 from "../assets/images/Gallery3.jpg";
import { useEffect, useState } from "react";

const PromotionsPage = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const imgPath = "../assets/images/";

  const fetchPromo = async () => {
    try {
      const resPromo = await fetch("/api/promotions/");
      const dataPromo = await resPromo.json();

      const resProducts = await fetch("/api/products/");
      const products = await resProducts.json();

      const combinedPromoProducts = dataPromo
        .map((promo) => {
          const product = products.find((prod) => prod.id == promo.productId);
          if (product) {
            const imgSrc = new URL(
              `${imgPath}${product.productGallery[1]}`,
              import.meta.url
            ).href;

            const discountPrice =
              product.productPrice * (1 - promo.discount / 100);
            return {
              ...product,
              imgSrc: imgSrc,
              promoName: promo.name,
              promoDescription: promo.description,
              promoDiscount: promo.discount,
              discountPrice: discountPrice,
              promoStartDate: promo.startDate,
              promoEndDate: promo.endDate,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setPromotions(combinedPromoProducts);
      console.log(combinedPromoProducts)
    } catch (e) {
      console.log(e);
    } finally {
      null;
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Promotions
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={product.imgSrc}
              alt={product.promoDescription}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.promoDescription}
              </h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-400 line-through text-sm">
                  ${product.productPrice.toFixed(2)}
                </span>
                <span className="text-pink-600 font-bold">
                  ${product.discountPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {" "}
                <span className="font-medium text-gray-700">
                  {product.promoStart}
                </span>{" "}
                -{" 5 days to go"}
                <span className="font-medium text-gray-700">
                  {product.promoEnd}
                </span>
              </p>
              <button
                onClick={() => handleClick(product.id)}
                className="mt-4 bg-pink-600 text-white w-full py-2 rounded hover:bg-pink-700 transition"
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionsPage;
