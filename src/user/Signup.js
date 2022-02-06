import React, { useState } from "react";
import AuthBase from "../core/AuthBase";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { Card } from "react-bootstrap";
import swal from "sweetalert";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
  });

  const { name, email, password, success, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      swal(
        "Oops",
        "There are some incomplete fields in your submission",
        "error"
      );
      return;
    }

    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            success: false,
            loading: false,
          });
          swal("Oops", data.error, "error");
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((err) => {
        swal("Oops", err.message, "error");
      });
  };

  const signUpForm = () => {
    return (
      <form onSubmit={onSubmit} className="p-3">
        <div className="form-group  mb-3">
          <label className="text-white-100 my-1">Name</label>
          <input
            className="form-control bg-dark border border-secondary text-light fs-6"
            onChange={handleChange("name")}
            type="text"
            value={name}
          />
        </div>
        <div className="form-group my-3">
          <label className="text-white-100 my-1">Email</label>
          <input
            className="form-control bg-dark border border-secondary text-light fs-6"
            onChange={handleChange("email")}
            type="email"
            value={email}
          />
        </div>

        <div className="form-group my-3">
          <label className="text-white-100 my-1 ">Password</label>
          <input
            onChange={handleChange("password")}
            className="form-control bg-dark border border-secondary text-light fs-6"
            type="password"
            value={password}
          />
        </div>
        <div className="d-grid">
          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-success btn-lg mt-3 "
            disabled={loading}
          >
            {!loading && <i className="fas fa-sign-in-alt me-2 fs-10"></i>}
            {loading && (
              <span
                class="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Register
          </button>
        </div>

        <hr className="dropdown-divider mt-4" />

        <p className="text-muted text-center mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-muted">
            Login
          </Link>{" "}
        </p>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };


  return (
    <AuthBase>
      {successMessage()}
      <div className="row justify-content-center mt-5 mb-3">
        <div className="col-xs-12 col-sm-6 col-md-4 text-left rounded ">
          <Card className="shadow position-relative">
            <Card.Body>
              <i className="fas fa-user-circle position-absolute start-50 translate-middle text-secondary profile-icon"></i>

              {signUpForm()}
            </Card.Body>
          </Card>
        </div>
      </div>
    </AuthBase>
  );
};

export default Signup;
