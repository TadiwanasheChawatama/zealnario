import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import Header from "../components/Header";
import HomeShop from "../components/HomeShop";
import ProductPortfolio from "../components/ProductPortfolio";
import PulseLoader from "../components/PulseLoader"

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [disableLoadMore, setDisableLoadMore]=useState(false)
  const [imagesToShow, setImagesToShow] = useState(4)
  const [disImage, setDisImage] = useState(0);
  const [size, setSize] = useState(null);
  const [productGallery, setProductGallery] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [relatedProducts, setRelatedProducts]= useState([])
  const [inCart, SetInCart] = useState(false);
  const imgPath = "../assets/images/";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const productData = await res.json();
        setProduct(productData);

        const resOtherProducts = await fetch(`/api/products/`);
        const otherProducts = await resOtherProducts.json()

        const relatedProducts = otherProducts.filter((prod)=>(prod.productCategory == productData.productCategory || prod.productCollection == productData.productCollection)&&!(productData.id==prod.id)).slice(0, 3).map((prod)=>{
          if(prod){
            const imgSrc = new URL(`${imgPath}${prod.productGallery[2]}`,import.meta.url).href
            return{
              ...prod,
              imgSrc
            }
          }
        })
        console.log(relatedProducts)
        setRelatedProducts(relatedProducts)
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product && product.productGallery && product.productImages) {
      const gallery = product.productGallery.map((item) => {
        return new URL(`${imgPath}${item}`, import.meta.url).href;
      });

      setProductGallery(gallery);
    }
    if (product.productImages) {
      const images = product.productImages.map((item) => {
        return new URL(`${imgPath}${item}`, import.meta.url).href;
      });

      setProductImages(images);
    }
  }, [product]);

  const handleNextImage = () => {
    if (productImages) {
      setDisImage((prevIndex) => (prevIndex + 1) % productImages.length);
    }
  };

  const handlePrevImage = () => {
    if (productImages) {
      setDisImage(
        (prevIndex) =>
          (prevIndex - 1 + productImages.length) % productImages.length
      );
    }
  };

  const handleSizeChange = (size) => {
    setSize(size);
  };


  const handleLoadMoreImages = ()=>{
    if(imagesToShow < productGallery.length){
      setBtnLoading(true)
      setTimeout(() => {
        setImagesToShow((prev)=>prev + 2)
        setBtnLoading(false)
      }, 500);
    }else{
      setDisableLoadMore(true)
    }
  }




  useEffect(() => {
    const checkInCart = async () => {
      try {
        const res = await fetch(`/api/cart?productId=${productId}`);
        const result = await res.json();
        const cartRes = result.some(
          (item) => (item.productId == productId) & (item.size == size)
        );
        SetInCart(cartRes);
        console.log(cartRes);
      } catch (e) {
        console.log(e);
      }
    };
    checkInCart();
  }, [productId, size, product]);

  const addToCart = () => {
    if (size) {
      const fetchCart = async () => {
        const addProduct = {
          productId: product.id,
          quantity: 1,
          size: size,
        };
        try {
          const res = await fetch(`/api/cart/`, {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify(addProduct),
          });
          SetInCart(true);
        } catch (e) {
          console.log(e);
        }
      };
      fetchCart();
    } else {
      toast.error("Please Select Size!", {
        toastId: "pp-error",
      });
    }
  };
  const viewCart = () => {
    navigate("/my-shopping-cart");
  };

  if (loading) {
    return (
      <>
      <Header heading={"View Product"} expo={"Elegant Fashion"} />
      <PulseLoader loading={loading} />
      </>
    )
  }

  return (
    <>
      <Header heading={"View Product"} expo={"Elegant Fashion"} />
      <section className="product-sect flex flex-col items-center justify-between md:flex-row">
        <div className="product-sect-details flex w-full md:w-3/7 flex-col order-3 md:order-1">
          <h2 className="font-bold uppercase text-2xl text-left">
            {product.productName}
          </h2>
          <div className="">
            <ul className="mb-5 text-left list-disc pl-4">
              {product.productDescription &&
                product.productDescription.map((desc) => (
                  <li key={desc}>{desc}</li>
                ))}
            </ul>
            <h3 className="mb-3 text-xl font-bold">Washing Instructions</h3>
            <ul className="mb-5 text-left list-disc pl-4">
              {product.productInstructions &&
                product.productInstructions.map((instr) => (
                  <li key={instr}>{instr}</li>
                ))}
            </ul>
          </div>
        </div>


        <div className="product-slider flex justify-center gap-10 items-center md:w-full md:w-3/7 order-1 md:order-2">
          <span>
            <FaArrowCircleLeft onClick={handlePrevImage} />
          </span>
          {productImages && (
            <img src={productImages[disImage]} alt={product.productName} />
          )}
          <span>
            <FaArrowCircleRight onClick={handleNextImage} />
          </span>
        </div>
        <div className="product-slider-nav w-[150px] md:w-1/7 order-2 md:order-3">

      
      <div className="product-slider-nav w-[150px] md:w-1/7 order-2 md:order-3">
  <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
    {["SM", "MD", "LG", "XL"].map((sizeOption) => (
      <button
        key={sizeOption}
        className={`px-3 py-1 border-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
          size ==sizeOption
            ? "bg-blue-500 text-white border-blue-600"
            : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"
        }`}
        onClick={() => handleSizeChange(sizeOption)}
      >
        {sizeOption}
      </button>
    ))}
  </div>
  </div>


  
  {inCart ? (
    <button
      className="w-full bg-blue-100 text-blue-700 border border-blue-400 rounded-md py-2 px-4 font-medium hover:bg-blue-200 transition-all"
      onClick={viewCart}
    >
      View in Cart -${product.productPrice}
    </button>
  ) : (
    <button
      className="w-full bg-blue-500 text-white border border-blue-600 rounded-md py-2 px-4 font-medium hover:bg-blue-600 transition-all"
      onClick={addToCart}
    >
      Add to Cart - ${product.productPrice}
    </button>
  )}
</div>

      </section>
      {productGallery && productGallery.length > 0 && (
        <ProductPortfolio
          productGallery={productGallery.slice(0, imagesToShow)}
          productName={product.productName}
          handleLoadMore={handleLoadMoreImages}
          loading={btnLoading}
          btnDisable={disableLoadMore}
        />
      )}
      <HomeShop heading={"Related Products"} text={"Browse Other Products"} products={relatedProducts} />
    </>
  );
};

export default ProductPage;
