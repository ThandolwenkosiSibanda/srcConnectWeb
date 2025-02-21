import React, { useEffect, useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const ForgotPasswordComponent = ({
  form,
  setForm,
  errorMessage,
  handleChange,
}) => {
  return (
    <>
      <div className="" style={{ padding: "10px", marginBottom: "30px" }}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "500px" }}>
            <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name={"email"}
                onChange={handleChange}
              />
            </Form.Group>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Link to={`/login`} style={{ color: "#ffc107" }}>
                Login
              </Link>
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
              }}
              className="btn btn-primary"
              // onClick={() => console.log("save")}
            >
              Send Reset Link
            </button>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div class="text--center">
            Want to create a new account?{" "}
            <Link
              to={`/register`}
              style={{ color: "#ffc107", marginLeft: "10px" }}
            >
              Sign Up
            </Link>{" "}
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
