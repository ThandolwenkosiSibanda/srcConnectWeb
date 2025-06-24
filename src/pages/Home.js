import NavBar from "../components/navBar/NavBar";
import FooterPage from "../components/footer/FooterComponent";

const Home = () => {
  return (
    <>
      <div className="page">
        <NavBar />

        <div className="site-main" style={{ minHeight: "80vh" }}>
          <div className="sidebar ttm-sidebar-left pt-40 pb-40 clearfix"></div>
        </div>

        {/* Footer */}
        <FooterPage />
      </div>
    </>
  );
};

export default Home;
