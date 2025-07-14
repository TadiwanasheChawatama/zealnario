import Header from "../components/Header";
import ValueCard from "../components/ValueCard";
import { FaLeaf, FaHandHoldingHeart, FaIndustry } from "react-icons/fa";
import aboutPic from "../assets/images/aboutPic.jpg";

const AboutPage = () => {
  const values = [
    {
      id: "1",
      heading: "Sustainability",
      text: "Committed to eco-friendly practices and materials",
      icon: <FaLeaf />,
    },
    {
      id: "2",
      heading: "Quality",
      text: "Uncompromising attention to detail and craftsmanship",
      icon: <FaHandHoldingHeart />,
    },
    {
      id: "3",
      heading: "Innovation",
      text: "Pushing boundaries in fashion and technology",
      icon: <FaIndustry />,
    },
  ];

  return (
    <>
      <Header
        heading={"Our Story"}
        expo={"One Man's Vision Revolutionizes Fashion"}
      />
      <section className="contact-section">
        <div className="story-section">
          <h2 className="text-left font-bold text-2xl my-12">Our Beginning</h2>
          <p>
            During a fateful trip to the fashion capital of Harare, young
            designer Henry Vambeya found himself struck by a profound sense of
            dissatisfaction. The opulent displays of clothing, while undeniably
            beautiful, lacked the depth of character and personal expression he
            craved. It was in that moment that Henry's destiny took a decisive
            turn. Returning home, Henry dedicated himself to creating a brand
            that would challenge the industry's conventions. Assembling a team
            of like-minded visionaries, he immersed himself in the creative
            process, drawing inspiration from diverse cultures and vibrant
            artistry. Through meticulous attention to detail and an unwavering
            commitment to quality, the brand Zealnario was born.
          </p>
          <img src={aboutPic} alt="Our Beginning" className="mx-auto my-10" />
          <p>
            Founded in 2020, ZealNario began with a simple vision: to create
            timeless fashion that combines luxury with sustainability. Our
            journey started in a small atelier in Milan, where our founder's
            passion for craftsmanship met contemporary design.
          </p>
        </div>
        <div className="values-section">
          <h2 className="text-left font-bold text-2xl my-12">Our Values</h2>
          <div className="values-grid">
            {values.map((val) => (
              <ValueCard key={val.id} value={val} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
