import { Link } from "react-router-dom";

const ProcuctCard = ({ product }) => {
  const imgPath = "../assets/images/";
  const imgsrc = new URL(
    `${imgPath}${product.productGallery[2]}`,
    import.meta.url
  ).href;
  return (
    <Link to={"/product"}>
      <div
        className="product-card max-w-[300px] "
        data-product-id={product.id}
        data-category={[product.productCategory]}
      >
        <div className="product-image">
          <img src={imgsrc} alt={product.productName} />
          {/* <div className="product-overlay">
          <Link to={"/product"} className="btn btn-primary rounded-md px-4 py-2 add-to-cart">Quick View</Link>
        </div> */}
        </div>
        <div className="product-info">
          <h3 className="font-bold">{product.productName}</h3>
          <p className="price">{product.productPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProcuctCard;
