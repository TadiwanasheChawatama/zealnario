import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>ZEAL NARIO</h3>
          </div>
          <div className="footer-sections">
            <div className="footer-section">
              <h4>Shop</h4>
              <Link to="./new-arrivals">New Arrivals</Link>
              <Link to="./categories/t_shirts.html">T-Shirts</Link>
              <Link to="./categories/hoodies.html">Hoodies</Link>
            </div>
            <div className="footer-section">
              <h4>&nbsp;&nbsp;&nbsp;</h4>
              <Link to="./categories/accessories.html">Track-Suits</Link>
              <Link to="./categories/footwear.html">Rebirth</Link>
              <Link to="./categories/footwear.html">Tye and Dye</Link>
            </div>
            <div className="footer-section">
              <h4>About</h4>
              <Link to="/about">Our Story</Link>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="footer-section">
              <h4>&nbsp;&nbsp;&nbsp;</h4>
              <Link to="/about">Terms of Service</Link>
              <Link to="/about">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-social">
            <Link to="https://facebook.com/zealnario" target="_blank">
              <span>
                <FaFacebookF />
              </span>
            </Link>
            <Link to="https://instagram.com/zealnario" target="_blank">
              <span>
                <FaInstagram />
              </span>
            </Link>
            <Link to="https://pinterest.com/zealnario" target="_blank">
              <span>
                <FaPinterest />
              </span>
            </Link>
            <Link to="https://twitter.com/zealnario" target="_blank">
              <FaTwitter />
            </Link>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2024 Zealnario. All Rights Reserved</p>
            <div className="payment-methods">
              <span>
                <FaCcVisa />
              </span>
              <span>
                <FaCcMastercard />
              </span>
              <span>
                <FaCcAmex />
              </span>
              <span>
                <FaCcPaypal />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
