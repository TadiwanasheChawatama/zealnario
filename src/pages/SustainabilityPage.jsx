import Header from "../components/Header";
import { FaWater, FaRecycle, FaHandsHelping, FaBoxOpen } from "react-icons/fa";
import SustainableCard from "../components/SustainableCard";
import SustainableGoal from "../components/SustainableGoal";
import sustainable from "../assets/images/sustainable.jpg";

const SustainabilityPage = () => {
  const cards = [
    {
      id: "1",
      heading: "Sustainable Materials",
      text: "We use organic, recycled, and sustainably sourced materials in our collections.",
      icon: <FaRecycle />,
    },
    {
      id: "2",
      heading: "Water Conservation",
      text: "Our production processes are designed to minimize water usage and prevent pollution.",
      icon: <FaWater />,
    },
    {
      id: "3",
      heading: "Fair Labour",
      text: "We ensure fair wages and safe working conditions throughout our supply chain.",
      icon: <FaHandsHelping />,
    },
    {
      id: "4",
      heading: "Sustainable Packaging",
      text: "All our packaging is made from recycled and biodegradable materials.",
      icon: <FaBoxOpen />,
    },
  ];

  const goals = [
    {
      id: "1",
      heading: "100%",
      text: "Sustainable Materials by 2025",
    },
    {
      id: "2",
      heading: "-50%",
      text: "Carbon Footprint Reduction",
    },
    {
      id: "3",
      heading: "0%",
      text: "Sustainable Materials by 2025",
    },
  ];

  return (
    <>
      <Header
        heading={"Our Commitment to Sustainability"}
        expo={"Fashion with a Conscience"}
      />
      <section className="bg-white text-gray-800 py-4 mx-auto text-center">
        <div className="sus-container">
          <div className="sustainability-intro mb-5">
            <img
              src={sustainable}
              alt="Sustainable Fashion"
              className="mx-auto"
            />
            <p className="intro-text mx-auto">
              At ZealNario, sustainability isn't just a trend—it's a commitment
              woven into every fiber of our business. We believe that luxury
              fashion can coexist with environmental responsibility.
            </p>
          </div>

          <div className="sustainability-pillars">
            <h2 className="text-left font-bold text-2xl my-12">
              Our Sustainability Pillars
            </h2>
            <div className="pillars-grid">
              {cards.map((card) => (
                <SustainableCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <div className="sustainability-goals">
            <h2 className="text-left font-bold text-2xl my-12">
              Our 2024 Goals
            </h2>
            <div className="goals-grid">
              {goals.map((goal) => (
                <SustainableGoal key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SustainabilityPage;
