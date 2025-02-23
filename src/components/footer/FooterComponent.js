import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <>
      <footer className="footer widget-footer ttm-bg ttm-bgimage-yes ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>
        <div className="first-footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 widget-area">
                <div className="widget ttm-footer-cta-wrapper">
                  <h5>Join Our Newsletter Now!</h5>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-5 widget-area m-auto">
                <div className="widget ttm-footer-cta-wrapper">
                  <form
                    id="subscribe-form"
                    className="newsletter-form"
                    method="post"
                    action="#"
                    data-mailchimp="true"
                  >
                    <div
                      className="mailchimp-inputbox clearfix"
                      id="subscribe-content"
                    >
                      <p>
                        <i className="fa fa-envelope-o"></i>
                        <input
                          type="email"
                          name="email"
                          placeholder="Add Your Email.."
                          required=""
                        />
                      </p>
                      <p>
                        <input type="submit" value="SUBMIT" />
                      </p>
                    </div>
                    <div id="subscribe-msg"></div>
                  </form>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 widget-area">
                <div className="social-icons social-hover widget text-center">
                  <ul className="list-inline">
                    <li className="social-facebook">
                      <a
                        className="tooltip-top"
                        href="https://www.facebook.com/"
                        data-tooltip="Facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="social-twitter">
                      <a
                        className="tooltip-top"
                        href="https://twitter.com/"
                        data-tooltip="Twitter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="social-instagram">
                      <a
                        className="tooltip-top"
                        href="https://www.instagram.com/"
                        data-tooltip="instagram"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li className="social-linkedin">
                      <a
                        className="tooltip-top"
                        href="https://www.linkedin.com/in/"
                        data-tooltip="LinkedIn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>
        <div className="second-footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-2 widget-area m-auto">
                <div className="widget">
                  <div className="footer-logo">
                    <img
                      id="footer-logo-img"
                      className="img-center"
                      src=""
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 widget-area">
                <div className="widget widget_text ml-40">
                  <ul className="widget_info_text">
                    <li>
                      <i className="fa fa-map-marker"></i>
                      <strong>Our Main Branch</strong> <br /> Bulawayo ,
                      Zimbabwe
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
                <div className="widget widget_text">
                  <ul className="widget_info_text">
                    <li>
                      <i className="fa fa-envelope-o"></i>
                      <strong>Email US</strong> <br /> Info@proqitmarket.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
                <div className="widget widget_text">
                  <ul className="widget_info_text">
                    <li>
                      <i className="fa fa-phone"></i>
                      <strong>Call Us</strong> <br /> +263-778 091 005
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>
        <div className="third-footer">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 widget-area mr-auto">
                <div className="widget widget_text pr-25 clearfix">
                  <h3 className="widget-title">About Us</h3>
                  <div className="textwidget widget-text">
                    <p className="pb-10 text-justify">
                      We offer a one-stop shopping experience for all your
                      building material needs.As a leading group of specialist
                      online stores, we deliver top-quality building supplies
                      straight to your door. We pride ourselves on providing
                      everything you need to get the job done right—from bricks,
                      roofing materials, and plumbing supplies to sand,
                      flooring, and landscaping
                    </p>

                    <Link
                      to={`/contact_us`}
                      className="ttm-btn ttm-btn-size-sm ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
                      href="/html"
                      title=""
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 widget-area">
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Our Company</h3>
                  <ul className="menu-footer-quick-links">
                    <li>
                      <Link to={`/delivery`}>Delivery Policy</Link>
                    </li>
                    <li>
                      <Link to={`/legal`}>Legal Policy</Link>
                    </li>
                    <li>
                      <Link to={`/privacy`}>Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to={`/payments`}>Secure Payments</Link>
                    </li>
                    {/* <li>
                      <Link to={`/stores`}>Stores</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 widget-area">
                <div className="widget widget_nav_menu clearfix">
                  <h3 className="widget-title">Products</h3>
                  <ul className="menu-footer-quick-links">
                    <li>
                      <Link to={`/promotions`}>Promotions</Link>
                    </li>
                    <li>
                      <Link to={`/brand_new`}>New Products</Link>
                    </li>
                    <li>
                      <Link to={`/best_sellers`}>Best Sales</Link>
                    </li>
                    {/* <li>
                      <Link to={`/contact_us`}>Contact Us</Link>
                    </li> */}
                    {/* <li>
                      <Link to={`/sitemap`}>Site Map</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>
        <div className="bottom-footer-text">
          <div className="container">
            <div className="row copyright">
              <div className="col-md-12 col-lg-6 ttm-footer2-left">
                <span>Copyright © 2024 Proqit Market </span>
              </div>
              <div className="col-md-12 col-lg-6 ttm-footer2-right">
                <div className="supported_card-block">
                  <ul>
                    <li>
                      <img
                        src="images/supported_card/card-2.png"
                        alt="paypal"
                      />
                    </li>
                    <li>
                      <img
                        src="images/supported_card/card-3.png"
                        alt="western union"
                      />
                    </li>
                    <li>
                      <img src="images/supported_card/card-4.png" alt="visa" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a id="totop" href="#top">
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
};

export default FooterPage;
