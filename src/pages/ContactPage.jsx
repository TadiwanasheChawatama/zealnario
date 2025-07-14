import { useState } from "react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    const newMail = {
      fname,
      email,
      subject,
      msg,
    };

    console.log(newMail);
    e.target.reset();
    setFname("");
    setEmail("");
    setMsg("");
    setSubject("");
    toast.success(
      "Message Sent Successfully! We're thrilled you reached out. We'll be in touch soon😊❤️", {
        toastId: "cp-success",
      }
    );
  };
  return (
    <>
      <Header heading={"Contact Us"} expo={"We'd Love to Hear from You"} />
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form">
              <h2 className="text-2xl uppercase font-bold text-center bg-indigo-100 mb-4 p-3">
                Leave Us a Message
              </h2>
              <form onSubmit={formSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">Name:</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter Your Fullname"
                    onChange={(e) => setFname(e.target.value)}
                    value={fname}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject:</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Enter The Subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Your Message"
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full font-bold uppercase text-center bg-indigo-100 mb-4 p-3"
                >
                  Send Message
                </button>
                {/* <PrimaryButton type={"submit"} btnContent={"Send Message"}/> */}
              </form>
            </div>
            <div className="contact-info bg-gray-100">
              <h2 className="text-2xl uppercase font-bold text-center bg-indigo-100 mb-4 p-3">
                Get in Touch
              </h2>
              <div className="info-item">
                {/* <i className="fas fa-map-marker-alt"></i> */}
                <span>
                  <FaMapMarker />
                </span>
                <div>
                  <h3 className="text-md font-bold">Address:</h3>
                  <Link to={"https//"}>123 Fashion Street, Milan, Italy</Link>
                </div>
              </div>
              <div className="info-item">
                {/* <i className="fas fa-phone"></i> */}
                <span>
                  <FaPhone />
                </span>
                <div>
                  <h3 className="text-md font-bold">Phone:</h3>
                  <Link to="tel:263716257623">+1 234 567 890</Link>
                </div>
              </div>
              <div className="info-item">
                {/* <i className="fas fa-envelope"></i> */}
                <span>
                  <FaEnvelope />
                </span>
                <div>
                  <h3 className="text-md font-bold">Email:</h3>
                  <Link to={"mailto: info@zealnario.com"}>
                    info@zealnario.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
