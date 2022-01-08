import React from "react";
import { Link } from "react-router-dom";

const NavigationHeader = () => {
  return (
    <div className="w-100 bg-white rounded-bottom py-2">
      <div className="container">
        <div className="row  align-items-center">
          <h2 className="col text-center text-sm-start text-primary fw-bold">
            TELKOM
          </h2>
          <div className="w-100 d-block d-sm-none"></div>
          <div className="col text-center text-sm-end">
            <Link className="text-decoration-none fw-bold me-5" to="/">
              Home
            </Link>
            <Link
              className="text-decoration-none fw-bold"
              to="/custom-dashboard"
            >
              Custom Chart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
