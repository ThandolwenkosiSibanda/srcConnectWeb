import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

const PageTitle = ({ name }) => {
  return (
    <>
      <div
        className="ttm-page-title-row"
        style={{
          backgroundColor: "#ffd200",
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="page-title-heading">
                  <h1
                    className="title"
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                      marginLeft: "10px",
                    }}
                  >
                    {name}
                  </h1>
                </div>
                <div className="breadcrumb-wrapper">
                  <span className="mr-1" style={{ color: "#fff" }}>
                    <i className="ti ti-home"></i>
                  </span>
                  <Link to={`/`} style={{ color: "#fff", fontSize: "13px" }}>
                    Home
                  </Link>

                  <span
                    className="ttm-bread-sep"
                    style={{ color: "#fff", fontSize: "13px" }}
                  >
                    &nbsp;/&nbsp;
                  </span>
                  <span
                    className="ttm-textcolor-skincolor"
                    style={{ color: "#fff", fontSize: "13px" }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
