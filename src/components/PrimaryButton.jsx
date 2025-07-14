const PrimaryButton = ({ btnContent, type }) => {
  return (
    <button
      className="inline-block uppercase py-3 px-6 text-white btn-primary rounded-md font-bold"
      type={type}
    >
      {btnContent}
    </button>
  );
};

export default PrimaryButton;
