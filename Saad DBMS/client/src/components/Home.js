import React from 'react'
import '../css/home.css'
import First from '../Images/4.png'
import Second from '../Images/3.png'
import Third from '../Images/1.png'

const Home = () => 

<div>

<header className="header">
      <h1 className="headtext"> E-Dealers </h1>
      <h2 className="headdesc mx-auto mt-2 mb-5">We deal in all kinds of wholsesale items.</h2>
      <a href="#about" className="btn2 js-scroll-trigger">Get Started..</a>
</header>
{/* About Section */}
<section id="about" className="about-section text-center">
      <div className="col-lg-8 mx-auto">
        <h2 className="aboutdesc">What is point of this website?</h2>
        <p className="aboutdesc2"> Actually, we have seen and bore the hassle of bringing the grocery item at the start of every month. This website is for all those people who wants to get the grocery items delivered at their doorsteps and that too at wholesale prices!   </p>
      </div>
</section>
{/* Items Section */}
<section className="grocerysection">
  <div className="itemdesc">
    <img className="itempic" src={First} alt="not find" />
    <div>
      <a href="/Grocery" className="btn3"> Household Grocery Items </a>
      <p className="grocerytext">Everything from flour,oil and ghee to cosmetic products is available here.</p>
    </div>
  </div>
{/* Item One Row */}
  <div className="itemdesc">
    <img className="itempic" src={Second} alt="not find" />
  </div>
  <div>
    <a href="/Fruit" className="button3"> Fruits </a>
    <p className="fruittext">All seasonal friuts are available at unbeatable prices.</p>
  </div>
{/* Project Two Row */}
  <div className="itemdesc">
    <img className="itempic" src={Third} alt="not find" />
  </div>
  <div>
    <a href="/Vegetable" className="button3"> Vegetables </a>
    <p className="fruittext">All kinds of vegetables available at a price you could only dream of!? </p>
  </div>
</section>
{/* Email Section */}
<section className="signup-section">
  <div className="loginbox1">
    <h2 className="inputtext1">For Complaints and queries, Email Us..</h2>
        <form className="form-inline d-flex">
          <input type="email" className="userinputtext1" id="inputEmail" placeholder="Enter your email address here..." />
          <button type="submit" className="complainbtn">Send</button>
        </form>
      </div>
</section>
</div>


export default Home