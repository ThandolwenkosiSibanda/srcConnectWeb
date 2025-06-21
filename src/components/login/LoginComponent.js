import React, { useEffect, useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import { Link } from "react-router-dom";

const SignupComponent = ({
  form,
  setForm,
  handleChange,
  errorMessage,
  handleLogin,
}) => {
  const [value, setValue] = useState("ZW");

  console.log("value", value);

  return (
    <div className="container" style={{ maxWidth: "500px", minHeight: "80vh" }}>
      <div className="c-page-banner">
        <div
          className="sign-up-banner c-page-banner__header row background-primary"
          data-stretch-type="full"
        >
          <div className="col l9 offset-l1 s9">
            <h4
              className=" "
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              Welcome Back
            </h4>
          </div>
          <div className="c-page-banner__header-background"></div>
        </div>
        <div className="c-page-banner__content row">
          <div className="col l7 offset-l1 background-greyscale-10">
            <div className="c-page-banner__form">
              <div className="account--log-in">
                <div className="row">
                  <div className="col s12" style={{ marginTop: "20px" }}>
                    <h5 style={{ textAlign: "center" }}>Login details</h5>

                    <p style={{ textAlign: "center", color: "red" }}>
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div data-name="account-registered-form">
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name={"email"}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      name={"password"}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div
                    className="row"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    <div className="col s12">
                      <button
                        style={{
                          width: "100%",
                          backgroundColor: "#bd2a2b",
                          borderColor: "#bd2a2b",
                          color: "#fff",
                        }}
                        classNameName="btn btn-primary"
                        onClick={() => handleLogin()}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-target="nudge-modals-container"></div>
      <div data-target="modals-container"></div>
    </div>
  );
};

export default SignupComponent;
