import { Link } from "react-router-dom";
import homeAbout from "../assets/images/homeAbout.jpg";
import SectionHeader from "./SectionHeader";

const HomeAbout = () => {
  return (
    <section className="about-section">
      <SectionHeader
        heading={"Our Story"}
        text={"Crafting Elegance Since 2020"}
      />
 <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Text Content */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">About ZealNario</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ZealNario represents the pinnacle of contemporary fashion, where innovation meets timeless elegance. Our commitment to quality and sustainable practices sets us apart in the fashion industry.
          </p>
          <Link
            to="/about"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition"
          >
            Learn More
          </Link>
        </div>

        {/* Image */}
        <div>
          <img
            src={homeAbout}
            alt="Fashion Atelier"
            className="rounded-xl shadow-lg w-full object-cover"
            />
        </div>

      </div>

    </section>
  );
};

export default HomeAbout;
