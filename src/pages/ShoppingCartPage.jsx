import { useEffect, useState } from "react";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import ClipLoad from "../components/ClipLoad";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ShoppingCartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubTotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const maxQuantity = 10;

  const fetchCart = async () => {
    try {
      const resCart = await fetch("/api/cart");
      const cartData = await resCart.json();

      const resProducts = await fetch("/api/products");
      const productData = await resProducts.json();

      const enrichedCart = cartData.map((item) => {
        const product = productData.find((p) => p.id == item.productId);
        return {
          ...item,
          name: product?.productName,
          price: product?.productPrice,
          colour: product?.productColour,
          vat: product?.productVat,
          shipping: product?.productShipping,
          tax: product?.productTax,
          weight: product?.productWeight,
          image: product?.productGallery[2],
        };
      });

      setCart(enrichedCart);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleProductQuantity = async (product, quantity) => {
    const update = {
      ...product,
      quantity,
    };
    try {
      const fetchProduct = async () => {
        const res = await fetch(`/api/cart/${product.id}`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(update),
        });

        const data = await res.json();
        setCart((prevCart) =>
          prevCart.map((item) => {
            if (item.id === product.id) {
              return { ...item, quantity };
            }
            return item;
          })
        );
      };
      fetchProduct();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let tax = 0;
    let shipping = 0;
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.quantity * item.price;
      const itemTax = itemTotal * item.tax;
      const itemshipping = item.shipping * item.quantity;

      total += itemTotal;
      tax += itemTax;
      shipping += itemshipping;
    });

    setTaxTotal(Math.round(tax * 100) / 100);
    setSubTotal(Math.round(total * 100) / 100);
    setShippingTotal(Math.round(shipping * 100) / 100);
  }, [cart]);

  const deleteItem = async (id) => {
    let userResponse = confirm("Are you sure you want to remove this item??");
    if (userResponse) {
      try {
        const res = await fetch(`/api/cart/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          toast.error("Error deleting item!!", {
            toastId: "del-error",
          });
          throw new Error(`Error deleting item: ${res.status}`);
        }
        await fetchCart();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const emptyCart = async () => {
    if (confirm("Are you sure you want to empty your cart?")) {
      try {
        await Promise.all(
          cart.map((item) =>
            fetch(`/api/cart/${item.id}`, { method: "DELETE" })
          )
        );
        await fetchCart();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
      toast.success("Promo code applied: 10% off!", {
        toastId: "promo-success",
      });
    } else {
      toast.error("Invalid promo code", {
        toastId: "promo-error",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Header
          heading={"Shopping Cart"}
          expo={"Thank you For shopping with us"}
        />
        <section className="cart-page">
          <div className="container">
            <div className="cart-container">
              <div className="cart-items">
                <ClipLoad />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header
          heading={"Shopping Cart"}
          expo={"Thank you For shopping with us"}
        />
        <section className="cart-page">
          <div className="container">
            <div className="cart-container">
              <div className="cart-items text-center">
                <h2 className="text-xl font-semibold my-4">
                  Your cart is empty.
                </h2>
                <Link
                  to="/shop"
                  className="btn-primary mt-2 text-center inline-block"
                >
                  Go to Shop
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const totalAfterDiscount =
    Math.round((subtotal + shippingTotal + taxTotal) * (1 - discount) * 100) /
    100;

  return (
    <>
      <Header
        heading={"Shopping Cart"}
        expo={"Thank you For shopping with us"}
      />
      <section className="cart-page">
        <div className="container">
          <div className="cart-container grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold my-2">Items Selected</h2>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  onQuantityChange={handleProductQuantity}
                  product={item}
                  onDelete={deleteItem}
                />
              ))}
              <button onClick={emptyCart} className="btn-danger mt-4">
                Empty Cart
              </button>
            </div>

            <div className="cart-summary bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                Order Summary
              </h2>

              <div className="summary-item flex justify-between text-gray-700 py-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-item flex justify-between text-gray-700 py-2">
                <span>Shipping</span>
                <span>${shippingTotal.toFixed(2)}</span>
              </div>
              <div className="summary-item flex justify-between text-gray-700 py-2">
                <span>Tax</span>
                <span>${taxTotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-item flex justify-between text-green-600 font-medium py-2">
                  <span>Discount</span>
                  <span>{-(discount * 100).toFixed(0)}%</span>
                </div>
              )}

              <div className="summary-item total flex justify-between py-3 mt-4 border-t text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${totalAfterDiscount.toFixed(2)}</span>
              </div>
              <div className="promo-code mt-6 flex gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={applyPromo}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Apply
                </button>
              </div>

              <button className="bg-black text-white py-3 mt-6 w-full rounded-lg hover:bg-gray-900 font-semibold transition">
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-pink-600 hover:text-pink-700 mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCartPage;
