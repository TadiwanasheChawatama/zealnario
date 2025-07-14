import PulseLoader from "react-spinners/PulseLoader";

const Loader = ({ loading }) => {
  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    height: "70vh",
  };
  return (
    <PulseLoader
      color={`var(--primary-color)`}
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default Loader;
