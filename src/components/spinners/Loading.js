import React from "react";

const BigLoading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="spinner-border"
        style={{
          width: "6rem",
          height: "6rem",
          borderWidth: "0.5rem",
          borderColor: "#ffd200",
          borderRightColor: "transparent", // Creates the spinning effect
        }}
        role="status"
      ></div>
    </div>
  );
};

export default BigLoading;
