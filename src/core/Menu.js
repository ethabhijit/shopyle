import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff" };
  } else {
    return { color: "#ffffff8c" };
  }
};

const Menu = ({ history }) => (
  <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark shadow ">
    <div className="container">
      <Link class="navbar-brand" to="/">
        <i className="fab fa-shopify me-2"></i>
        Shopyle
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {isAutheticated() && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/cart"
              >
              <i class="fas fa-shopping-cart me-2 "></i>
                Cart
              </Link>
            </li>
          )}

          {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link"
                to="/admin/dashboard"
              >
              <i class="fas fa-user me-2 "></i>
                Dashboard
              </Link>
            </li>
          )}

          
          {!isAutheticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  <i className="fas fa-sign-in-alt me-2 fs-10"></i>
                  Login
                </Link>
              </li>
            </Fragment>
          )}
          {isAutheticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
              <i className="fas fa-sign-out-alt me-2 fs-10"></i>
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(Menu);
