import LoadMore from "./LoadMore"

const ProductPortfolio = ({ productName, productGallery , loading, handleLoadMore, btnDisable}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-10 text-center">
        Featured on Product
      </h2>
      <section className="portfolio">
        {productGallery.map((imgSrc, index) => (
          <img
            src={imgSrc}
            key={index}
            height="200px"
            width="200px"
            alt={productName}
          />
        ))}
      </section>

      {!btnDisable &&
      
      <LoadMore loading={loading} handleLoadMore={handleLoadMore}/>
      }
    </>
  );
};

export default ProductPortfolio;
