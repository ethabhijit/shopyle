import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-2",
  children,
}) => (
  <>
    <Menu />
    <div
      className="container-fluid p-0 bg-dark text-white"
      style={{ marginTop: "56px" }}
    >
      <div className="container pt-5 mb-5 text-center">
        <h2 className="display-5">{title}</h2>
        <p className="lead text-white-200">{description}</p>
        <button className="btn btn-outline-secondary btn-lg my-3">
          <i class="fas fa-search me-2 fs-5"></i>Explore Now
        </button>
        <hr class="dropdown-divider my-4" />
      </div>

      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container text-white-100 text-center">
        <p>If you got any questions, feel free to reach out!</p>
        <button className="btn btn-outline-secondary btn-lg ">
          Contact us
        </button>
      </div>
      <div className="container text-center my-3">
        <span className="text-muted">
          Copyright © {new Date().getFullYear()} Shopyle
        </span>
      </div>
    </footer>
  </>
);

export default Base;
