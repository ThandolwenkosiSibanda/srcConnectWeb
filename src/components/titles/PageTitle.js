import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

const PageTitle = ({ name }) => {
  return (
    <>
      <div
        className="ttm-page-title-row"
        style={{
          backgroundColor: "#bd2a2b",
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTitle;
