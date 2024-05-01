import React, { useState , useEffect} from 'react';
import Image from 'next/image';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

  const handleNavToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setIsOpen(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${isOpen ? 'navbar-open' : 'navbar-hide'}`}>
        <div className="navbar-container">
            {/* <div class="navbar-brand">
                <a href="index.html">
                    <img src="images/zeallogo.png" alt="" className='img-logo'/>
                </a>
            </div> */}
            <ul class="navbar-nav-left">
                <li><a href="#">Menu</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Catergories</a></li>
            </ul>
            <ul class="navbar-nav-mid">
                <li><h2>ZEAL NARIO</h2></li>
            </ul>
            <ul class="navbar-nav-right">
                <li>
                    <button class="btn btn-dark-outline">Shop Now</button>
                </li>
                <li>
                    <button class="btn btn-dark btn-login">Login<img src="images/user.png" alt="" className="user-icon" /></button>
                </li>
                
            </ul>
        </div>
        <div className="nav-underline" id="nav-underline" onClick={handleNavToggle}>
          <img src="images/downarrow.png" alt="" />
        </div>
      </nav>
    </>
  );
}

export default Navbar;