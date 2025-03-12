import React, { useEffect, useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

const SignupComponent = ({
  form,
  setForm,
  handleChange,
  errorMessage,
  registerUser,
}) => {
  const [value, setValue] = useState("ZW");

  const handlePhone = (value) => {
    setForm({ ...form, phone: value });
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="c-page-banner">
        <div
          className="sign-up-banner c-page-banner__header row background-primary"
          data-stretch-type="full"
        >
          <div className="col l9 offset-l1 s9">
            <h4 className=" " style={{ marginTop: "20px" }}>
              Sign up for an Account
            </h4>
            <h5 className="c-page-banner__subheading">
              Benefits of creating an account
            </h5>
            <div classNameName="c-page-banner__icons banner_icons">
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
                <span> Trade discounts</span>
              </div>
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i className="fa fa-check" aria-hidden="true"></i>
                </span>
                <span> Dedicated account manager</span>
              </div>
              <div className="c-page-banner__icon">
                <span className="material-icons">
                  <i className="fa fa-check" aria-hidden="true"></i>
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
                      Already have an account ?{" "}
                      <Link
                        to={`/login`}
                        style={{ color: "#ffc107", marginLeft: "10px" }}
                      >
                        Login
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12" style={{ marginTop: "20px" }}>
                    <h5>Your details</h5>

                    <p style={{ textAlign: "center", color: "red" }}>
                      {errorMessage}
                    </p>
                  </div>
                </div>
                <div data-name="account-registered-form">
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>
                      Email<sup>*</sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name={"email"}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="row">
                    <div className="col s12 m6">
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label>
                          Name<sup>*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name={"name"}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <div className="col s12 m6">
                      <Form.Group className="mb-3" controlId="">
                        <Form.Label>
                          Surname<sup>*</sup>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          name={"surname"}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col l12 s12">
                      <Form.Label>
                        Phone<sup>* include country code</sup>
                      </Form.Label>

                      <PhoneInput
                        defaultCode="ZW"
                        country="ZW"
                        value={form.phone}
                        onChange={handlePhone}
                      />

                      <sub>
                        In case we need to contact you regarding your delivery
                      </sub>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "10px" }}>
                    <div className="col s12">
                      <Form.Label>Company Name (Optional)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        name={"company_name"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="row" data-name="buying-as-options">
                    <div className="col s12">
                      <div className="form-control">
                        <strong className="label">
                          Buying as<sup>*</sup>
                        </strong>
                      </div>
                    </div>
                    <div className="col s6">
                      <button className="btn btn-small btn-hollow">
                        Individual/Home Owner
                      </button>
                    </div>
                    <div className="col s6">
                      <button className="btn btn-small btn-hollow">
                        Contractor/Company
                      </button>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col s12">
                      <Form.Label>
                        Password<sup>*</sup>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        name={"password"}
                        onChange={handleChange}
                      />
                      <sup>*</sup>{" "}
                      <sub>
                        Must contain at least 1 uppercase letter, 1 number and
                        be at least 8 characters long.
                      </sub>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <Form.Label>
                        Password Confirmation<sup>*</sup>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        name={"password2"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col s12">
                      <div className="form-control">
                        <label for="user_mailing_list">
                          <input
                            name="user[mailing_list]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            type="checkbox"
                            value="1"
                            checked="checked"
                            name="user[mailing_list]"
                            id="user_mailing_list"
                          />
                          <span>
                            I would like to receive updates from Proqit Market.
                            See <Link to={`/privacy`}>Privacy Policy</Link>
                          </span>
                        </label>{" "}
                      </div>
                    </div>
                    <div className="col s12">
                      <div className="form-control">
                        <label for="user_terms_and_conditions">
                          <input
                            name="user[terms_and_conditions]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            data-name="terms-and-conditions"
                            type="checkbox"
                            value="1"
                            name="user[terms_and_conditions]"
                            id="user_terms_and_conditions"
                          />
                          <span>
                            I have read and accept the Proqit Market{" "}
                            <Link to={`/terms`}>Terms and Conditions</Link>
                          </span>
                        </label>{" "}
                      </div>
                    </div>
                  </div> */}
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
                        onClick={() => registerUser()}
                      >
                        Signup
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
