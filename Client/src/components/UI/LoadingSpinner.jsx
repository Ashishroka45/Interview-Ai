import React from "react";
import "./ui.scss";

const LoadingSpinner = ({ message = "Loading...", fullScreen = false }) => {
  return (
    <div className={`spinner-wrapper ${fullScreen ? "full-screen" : ""}`}>
      <div className="spinner-container">
        <div className="premium-spinner"></div>
        <p className="spinner-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
