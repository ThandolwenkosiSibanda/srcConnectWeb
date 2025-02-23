import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ErrorScreen = ({ message = "Something went wrong!" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const reloadPage = () => {
    navigate(location.pathname, { replace: true }); // Re-navigates to the same route without full reload
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h6 className="text-danger mb-3">{message}</h6>
    </div>
  );
};

export default ErrorScreen;
