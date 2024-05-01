import React from 'react'

function footer() {
  return (
    <>
      <footer id="main-footer">
      <ul>
            <li><a href="#"><img class="social-icons" src="images/linkedin.png" alt="" /></a></li>
            <li><a href="#"><img class="social-icons" src="images/github.png" alt="" /></a></li>
            <li><a href="#"><img class="social-icons" src="images/facebookblack.png" alt="" /></a></li>
            <li><a href="#"><img class="social-icons" src="images/pinterest.png" alt="" /></a></li>
        </ul>

          <div class="">
          <a href="#">Collaborate with Us</a> | <a href="#">Terms of use</a> | <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
          </div>
          <p className='text-color'>Copyright &copy; 2024 Zealnario All Rights Reserved</p>
      </footer>
    </>
  )
}

export default footer
