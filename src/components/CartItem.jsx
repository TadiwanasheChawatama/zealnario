import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const CartItem = ({ product, onQuantityChange, onDelete }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const navigate = useNavigate();

  const handleQuantityIncrement = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(product, newQuantity);
    } else {
      toast.warn("Maxmum quantity is 10", {
        toastId: "quantity-warn-1",
      });
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(product, newQuantity);
    } else {
      toast.warn("Minimum quantity is 1", {
        toastId: "quantity-warn-2",
      });
    }
  };

  const imgPath = "../assets/images/";
  const imgSrc = new URL(`${imgPath}${product.image}`, import.meta.url).href;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full md:w-32 flex-shrink-0">
        <img
          src={imgSrc}
          alt={product.name}
          className="rounded-lg w-full h-32 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 text-gray-800 space-y-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">
          Size: {product.size} | Color: {product.color}
        </p>
        <p className="font-semibold text-pink-600">${product.price}</p>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleQuantityDecrement}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            max={10}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-12 text-center border rounded"
          />
          <button
            onClick={handleQuantityIncrement}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions and Total */}
      <div className="flex flex-col items-center gap-3 mt-4 md:mt-0">
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-500 hover:text-red-600"
        >
          <FaTrash size={18} />
        </button>
        <button
          onClick={() => navigate(`/products/${product.productId}`)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaEye size={18} />
        </button>
        <p className="font-bold text-sm text-gray-800">
          ${Math.round(quantity * product.price * 100) / 100}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
