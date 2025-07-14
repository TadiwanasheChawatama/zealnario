// import { FaWater, FaRecycle, FaHandsHelping, FaBoxOpen } from "react-icons/fa";

const SustainableCard = ({ card }) => {
  return (
    <div className="pillar-item text-center">
      <span className="pillar-item-inner flex justify-center">{card.icon}</span>
      <h3>{card.heading}</h3>
      <p>{card.text}</p>
    </div>
  );
};

export default SustainableCard;
