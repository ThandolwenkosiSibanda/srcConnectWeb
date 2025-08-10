import React from "react";

import logo from "./logo.png";
const NavBar = () => {
  return (
    <React.Fragment>
      <header
        id="masthead"
        className="header ttm-header-style-01"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          className="site-branding"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
          <h5 style={{ color: "#000", marginTop: "10px" }}>SRC Connect</h5>
          <p style={{ color: "#000" }}>Your voice, our action</p>
        </div>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
