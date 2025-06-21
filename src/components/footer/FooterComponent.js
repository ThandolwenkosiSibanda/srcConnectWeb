import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <>
      <footer className="footer widget-footer ttm-bg ttm-bgimage-yes ttm-bgcolor-darkgrey ttm-textcolor-white clearfix">
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer"></div>

        <div className="sep_holder_box">
          <span className="sep_holder">
            <span className="sep_line"></span>
          </span>
        </div>
        <div className="bottom-footer-text">
          <div className="container">
            <div className="row copyright">
              <div className="col-md-12 col-lg-6 ttm-footer2-left">
                <span>
                  © 2025 Designed and Developed by Continuum Creative Agency{" "}
                </span>
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
