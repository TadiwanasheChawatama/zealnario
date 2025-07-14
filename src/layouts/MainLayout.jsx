import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsLetter from "../components/NewsLetter";

const MainLayout = () => {
  return (
    <>
      {/* <HamburgerMenu /> */}
      <Navbar />
      <Outlet />
      <ToastContainer />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default MainLayout;
