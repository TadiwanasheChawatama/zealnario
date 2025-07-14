import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [nav, setNav] = useState("menu");
  const [categories, setCategories] = useState([])

  const fetchCategories = async()=>{
    try {
      const res = await fetch("/api/categories/")
      const data = await res.json();
      setCategories(data.slice(0,7))
    } catch (e) {
      console.log(e)
    }
  }

useEffect(()=>{
  fetchCategories()
},[])

  const activateNav = () => {
    nav == "menu" ? setNav("menu active") : setNav("menu");
  };

  return (
    <>
      <HamburgerMenu hamClicked={activateNav} nav={nav} />
      <aside id="navbar" className={nav}>
        <ul>
          {/* Existing nav links */}
          <li>
            <NavLink to="/" onClick={activateNav}>
              Home
            </NavLink>
          </li>
          
          {categories &&
          <li className="dropdown">
            <NavLink to="/" className="dropbtn">
              Categories
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/new-arrivals" onClick={activateNav}>
                New Arrivals
              </NavLink>
              {categories.map((category=>(
              <NavLink to={`/categories/${category.id}`} onClick={activateNav}>
                {category.name}
              </NavLink>
              )))}
              

              {/* <NavLink to="/collections" onClick={activateNav}>
                Hoodies
              </NavLink>
              <NavLink to="/collections" onClick={activateNav}>
                Accessories
              </NavLink>
              <NavLink to="/collections" onClick={activateNav}>
                Tracksuits
              </NavLink> */}
            </div>
          </li>
}


          <li>
            <NavLink to="/collections" onClick={activateNav}>
              Collections
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" onClick={activateNav}>
            Gallery
            </NavLink>
          </li>


          <li>
            <NavLink to="/shop" onClick={activateNav}>
              Shop Now
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" onClick={activateNav}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/promo" onClick={activateNav}>
              Promotions
            </NavLink>
          </li>
          <li>
            <NavLink to="/sustainability" onClick={activateNav}>
              Sustainability
            </NavLink>
          </li>

          {/* Auth links - Sign In / Sign Up */}
          {/* Sign In / Sign Up Links */}
          <li className="mt-2">
            <NavLink
              to="/signin"
              onClick={activateNav}
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-all duration-300 ease-in-out mt-2 inline-flex items-center gap-2"
            >
              <FaSignInAlt />
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              onClick={activateNav}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out mt-2 inline-flex items-center gap-2"
            >
              <FaUserPlus />
              Sign Up
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
