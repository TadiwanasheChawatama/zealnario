import React from 'react'

function LandingPage() {
  return (
    <>
        <div className="bg-showcase">
          <div className="showcase-info">
            <div className="showcase-title">WELCOME <br /><img className="showcase-logo" src="images/zeallogo.png" alt="" /><span className='text-color brand-name'>ZEAL NARIO</span></div>
            <p className="showcase-description">We Deliver: <br />Quality, extraordinary clothing. Meticulously crafted garments that make you confident and stylish. <br/><span className='text-color'> Embrace fashion with us!</span></p>
            <h3 className="showcase-subtitle">Visit us</h3>
            <ul className="social-media-links">
              <li><a href="https://www.instagram.com/zealnario" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/zealnario" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
            <a href="#" className="btn-main animate">
              <div className="hover"></div>
              <span>Read More</span>
            </a>
          </div>
        </div>
    </>
  )
}

export default LandingPage
