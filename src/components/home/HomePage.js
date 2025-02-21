import React from 'react';

import { connect } from 'react-redux';
import BestSellers from '../product/BestSellers';
import { GiShoppingCart } from 'react-icons/gi';
import { PiTruckThin, PiPiggyBankThin} from 'react-icons/pi';
import {BsCurrencyExchange} from 'react-icons/bs';
import Brands from '../product/Brands';
import Story from '../product/Story';
import { Link } from 'react-router-dom';







const HomePage = () => {


	return (
		<>
		    <main className="main">

          
        <div className='nav-banner-top'>
           <p className='nav-banner-top-text'>ISSUE WITH MATERIALS ESTIMATES ? or a SPECIFIC REQUIREMENT? <Link className="link-tag" to={`/plans`}>CLICK HERE AND SEND YOUR QUERY THROUGH</Link> </p>
           <p className='nav-banner-top-text'>CALL /APP NOW: +263 778 091 005 | MON - FRI 7:00AM to 5:00PM</p>

        </div>


          <div className="container">

<div className='small-banner-top'>
  <div className='small-banner-top-item'> 

  
    <div> <GiShoppingCart  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>One Stop Shop</h6>
    <p className='small-banner-top-item-text'>Everything a call or click away</p>
    </div>
  </div>

  <div className='small-banner-top-item'> 
    <div><PiTruckThin  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Speedy Delivery</h6>
    <p className='small-banner-top-item-text'>Same day delivery on hundreds of products
</p>
    </div>
  </div>

  <div className='small-banner-top-item'> 
  <div><PiPiggyBankThin  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Competitive Prices</h6>
    <p className='small-banner-top-item-text'>Massive savings on hundreds of products</p>
    </div>
  </div>
  <div className='small-banner-top-item'> 
     <div><BsCurrencyExchange  size={35}/></div>
    <div>
    <h6 className='small-banner-top-item-heading'>Flexible Payment Methods</h6>
    <p className='small-banner-top-item-text'>Everything a call or click away</p>
    </div>
  </div>

</div>


            <div className="c-hero row c-row--margin-small">
              <div className="c-hero__left col l7 s12 background-primary">
                <div className="c-hero__item">
                  <div className="c-hero__item-content">
                    <h1 className="c-hero__heading c-hero__heading__trade">SAVE MORE WITH A TRADE ACCOUNT</h1> 
                    <h3 className="c-hero__subheading"> Register and get discounted trade prices</h3> 
                  </div>
                  <div className="c-hero__item-image">
                    {/* <!--  <img width="350" height="438" alt="Roll of insulation" src="../res.cloudinary.com/materials-market/image/upload/q_auto%2cf_auto/assets/factory-pattern/home/main-hero-image-desktop.png" /> --> */}
                  </div>
                </div>
                {/* <!-- <a className="btn" href="sign-up.html">Register Now</a> --> */}
              </div>
              <div className="c-hero__right col l5 s12">
                <div className="c-hero__item c-hero__item--need-help background-greyscale-10 desktop">
                  <div className="c-hero__item-content">
                    {/* <!-- <h4 className="c-hero__heading"> <span className="material-icons">&#xe625;</span>NEED HELP WITH A PROJECT?</h4> --> */}
                    {/* <!-- <h4 className="c-hero__subheading">Get in touch with our expert team today for help & advice.</h4> --> */}
                      <a className="btn" href="contact-us/index.html">
                      Contact Us Today <span>&#8250;</span>
                    </a>
                  </div>
                  <div className="c-hero__item-image">
                     <img loading="lazy" width="223" height="220" alt="Smiling trade person, wearing a hard hat" src="../res.cloudinary.com/materials-market/image/upload/q_auto%2cf_auto/assets/factory-pattern/home/trade-credit-hero-desktop.png" /> 
                  </div>
                </div>
                <div className="c-hero__item c-hero__item--trade-credit background-primary">
                  {/* <!-- <h3 className="c-hero__heading">BUY NOW, PAY IN 30 DAYS</h3> --> */}
                  {/* <!-- <h4 className="c-hero__subheading">Check if you're eligible for a Trade Credit Account today</h4> --> */}
                  <div className="c-hero__item--cta">
                    <div className="c-hero__item--cta__primary">
                      {/* <!-- <a className="btn" href="credit_applications/index.html">Apply for Trade Credit</a> --> */}
                    </div>
                    <div className="c-hero__item--cta__secondary trade-credit-logo">
                      <p>Powered by</p> 
                      <a target="_blank" className="image-link" rel="noopener noreferrer" href="https://www.kriya.co/"><img width="80" height="20" alt="Kriya" src="../res.cloudinary.com/materials-market/image/upload/q_auto%2cf_auto/assets/factory-pattern/kriya-putty.png" /></a> 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Product Categories */}
            {/* <div className="c-banner row c-row--margin-default">
              <div className="col s12">
                <div className="row valign-wrapper background-primary">
                  <div className="col l4 s12">
                    <h2 className="c-banner__heading">Top product categories</h2>
                  </div>
                  <div className="col l8 s12 center-align row">
                    <div className="c-banner__item col l2 s2">
                      <a href="insulation/insulation-boards.html">
                        
                        <p className="c-banner__item-text">Insulation Boards</p>
                      </a>
                    </div>
                                       <div className="c-banner__item col l2 s2">
                      <a href="building-materials/timber.html">
                        <img className="c-banner__item-image" width="109" height="109" alt="Sawn Treated Timber " src="../res.cloudinary.com/materials-market/image/upload/q_auto%2cf_auto/assets/factory-pattern/home/categories/timber.png" />
                        <p className="c-banner__item-text">Timber</p>
                      </a>
                    </div> 
                    <div className="c-banner__item col l2 s2">
                      <a href="insulation/insulation-slabs.html">
                        
                        <p className="c-banner__item-text">Insulation Slabs</p>
                      </a>
                    </div>
                    <div className="c-banner__item col l2 s2">
                      <a href="plasterboard-drylining/plasterboard.html">
                        
                        <p className="c-banner__item-text">Plasterboard</p>
                      </a>
                    </div>
                    <div className="c-banner__item col l2 s2">
                      <a href="building-materials/sheet-materials.html">
                        
                        <p className="c-banner__item-text">Sheet Materials</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
             {/* Top Product Categories */}


             <div>

Trust Pilot
             </div>
  


            <BestSellers/>

            
            <Brands />

            <Story />

        </div>
      </main>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, {})(HomePage);
