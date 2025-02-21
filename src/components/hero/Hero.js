import React from 'react';



const Hero = () => {


	return (
		<>
            <div className="c-hero row c-row--margin-small">
              <div className="c-hero__left col l7 s12 background-primary">
                <div className="c-hero__item">
                  <div className="c-hero__item-content">
                    <h1 className="c-hero__heading c-hero__heading__trade">SAVE MORE WITH A TRADE ACCOUNT</h1> 
                    <h3 className="c-hero__subheading"> Register and get discounted trade prices</h3> 
                  </div>
                  <div className="c-hero__item-image">
                    <img width="350" height="438" alt="Roll of insulation" src="" /> 
                  </div>
                </div>
                {/* <!-- <a className="btn" href="sign-up.html">Register Now</a> --> */}
              </div>
              <div className="c-hero__right col l5 s12">
                <div className="c-hero__item c-hero__item--need-help background-greyscale-10 desktop">
                  <div className="c-hero__item-content">
                    <h4 className="c-hero__heading"> <span className="material-icons">&#xe625;</span>NEED HELP WITH A PROJECT?</h4>
                    <h4 className="c-hero__subheading">Get in touch with our expert team today for help & advice.</h4> 
                      <a className="btn" href="?">
                      Contact Us Today <span>&#8250;</span>
                    </a>
                  </div>
                  <div className="c-hero__item-image">
                     <img loading="lazy" width="223" height="220" alt="" src={"drill.jpg"} /> 
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
                      {/* <a target="_blank" className="image-link" rel="noopener noreferrer" href="https://www.kriya.co/"><img width="80" height="20" alt="Kriya" src="../res.cloudinary.com/materials-market/image/upload/q_auto%2cf_auto/assets/factory-pattern/kriya-putty.png" /></a>  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
		</>
	);
};



export default Hero;
