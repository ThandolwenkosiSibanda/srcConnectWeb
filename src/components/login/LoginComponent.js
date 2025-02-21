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
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="c-page-banner">
        <div
          className="sign-up-banner c-page-banner__header row background-primary"
          data-stretch-type="full"
        >
          <div className="col l9 offset-l1 s9">
            <h4 className=" " style={{ marginTop: "20px" }}>
              Sign In To Your Account
            </h4>
            <h5 className="c-page-banner__subheading">
              Benefits of signing into your account
            </h5>
            <div classNameName="c-page-banner__icons banner_icons">
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>
                <span> Trade discounts</span>
              </div>
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>
                <span> Keep track of all queries</span>
              </div>
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i class="fa fa-check" aria-hidden="true"></i>
                </span>
                <span> Keep track of all orders</span>
              </div>
            </div>
          </div>
          <div className="c-page-banner__header-background"></div>
        </div>
        <div className="c-page-banner__content row">
          <div className="col l7 offset-l1 background-greyscale-10">
            <div className="c-trade-credit__text">
              <p>
                In order to get access to trade prices, all you need to do is
                create an account and one of our Key Accounts Managers will be
                in touch.
              </p>
            </div>
            <div className="c-page-banner__form">
              <div className="account--log-in">
                <div className="row">
                  <div className="col l12 s12">
                    <span className="text--highlighter">
                      Do not have an account have an account ?{" "}
                      <Link
                        to={`/register`}
                        style={{ color: "#ffc107", marginLeft: "10px" }}
                      >
                        Sign Up
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12" style={{ marginTop: "20px" }}>
                    <h5>Login details</h5>

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
                      type="text"
                      placeholder=""
                      name={"password"}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div
                    className="row"
                    style={{ marginTop: "20px", marginBottom: "100px" }}
                  >
                    <div className="col s12">
                      <button
                        style={{
                          width: "100%",
                          backgroundColor: "#ffc107",
                          borderColor: "#ffc107",
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
