const ValueCard = ({ value }) => {
  return (
    <div className="value-item text-center">
      <span className="pillar-item-inner flex justify-center">
        {value.icon}
      </span>
      <h3>{value.heading}</h3>
      <p>{value.text}</p>
    </div>
  );
};

export default ValueCard;
