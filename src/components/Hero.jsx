import homeVid from "../assets/videos/homeVid.mp4";
import { FaFacebookF, FaXing, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <video src={homeVid} muted loop autoPlay></video>
      <div className="overlay"></div>
      <div className="hero-content">
        <div className="logo">
          <h4>ZEAL NARIO</h4>
        </div>
        <div className="text">
          <h2>Never Stop</h2>
          <h3>Elevating Your Style</h3>
          <p>
            {" "}
            Zealnario, the renowned fashion label, stuns with its bold and
            innovative collections. Its commitment to cutting-edge style and
            quality cements its trailblazer status in high fashion.
          </p>
          <Link to="/shop" className="btn-main animate">
            <div className="hover"></div>
            <span>See What We Have</span>
          </Link>
        </div>
        <div className="hero-soc">
          <ul className="social">
            <li>
              <Link to="#">
                <span>
                  <FaFacebookF />
                </span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>
                  <FaXing />
                </span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>
                  <FaInstagram />
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
