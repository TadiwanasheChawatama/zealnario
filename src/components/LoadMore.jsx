
const LoadMore = ({loading, handleLoadMore}) => {

    // const [loading, setLoading] = useState(false);
    // const [itemsToShow, setItemsToShow] = useState(2);

    // const handleLoadMore = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //       setItemsToShow(itemsToShow + 2);
    //       setLoading(false);
    //     }, 1000);
    //   };
    
  return (
    <div className="text-center mt-8">
      <button
        onClick={handleLoadMore}
        disabled={loading}
        className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-md ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="w-5 h-5 mr-2 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            <i className="fas fa-arrow-down mr-2"></i>
            Load More
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMore;
