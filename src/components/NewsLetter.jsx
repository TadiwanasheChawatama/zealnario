import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const [mail, setMail] = useState("");
  const mailSubmit = (e) => {
    e.preventDefault();
    const newMail = {
      mail,
    };
    console.log(newMail);
    e.target.reset();
    toast.success(
      "You're now part of our inner circle! Expect exciting content, offers and updates", {
        toastId: "nl-success",
      }
    );
  };
  return (
    <>
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Join Our World</h2>
          <p>Subscribe for exclusive offers and style updates</p>
          <form onSubmit={mailSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setMail(e.target.value)}
              required
            />
            {/* <button type="submit" className="btn btn-primary">Subscribe</button> */}
            <PrimaryButton type={"submit"} btnContent={"Subscribe"} />
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
