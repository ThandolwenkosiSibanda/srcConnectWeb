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
            <div
              className="row copyright"
              style={{
                display: "flex",
                justifyContent: "center",
                // backgroundColor: "red",
                paddingBottom: "40px",
                paddingTop: "40px",
              }}
            >
              <div className="col-md-12 col-lg-12 ttm-footer2-center center">
                <span>© 2025 SRC Connect</span>
              </div>
              <div className="col-md-12 col-lg-12 ttm-footer2-center center">
                <span>Powered by Continuum Creative Agency</span>
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
