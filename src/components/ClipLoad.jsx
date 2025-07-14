import ClipLoader from "react-spinners/ClipLoader";
const ClipLoad = ({ loading }) => {
  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    // height: "70vh",
  };
  return (
    <ClipLoader
      color={`var(--primary-color)`}
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default ClipLoad;
