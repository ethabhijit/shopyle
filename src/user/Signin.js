import React, { useState } from "react";
import AuthBase from "../core/AuthBase";
import { Redirect, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import swal from "sweetalert";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      swal(
        "Oops",
        "There are some incomplete fields in your submission",
        "error"
      );
      return;
    }

    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          swal("Oops", data.error, "error");
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) => {
        swal("Oops", err.message, "error");
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <form onSubmit={onSubmit} className="p-3">
        <div className="form-group mb-3">
          <label className="text-white-100 my-1">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            className="form-control bg-dark border border-secondary text-light fs-6"
            type="email"
          />
        </div>

        <div className="form-group my-3">
          <label className="text-white-100 my-1">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            className="form-control  bg-dark border border-secondary text-light fs-6"
            type="password"
          />
        </div>

        <div className="d-grid">
          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-success btn-lg mt-3"
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
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg mt-3"
            data-bs-toggle="modal"
            data-bs-target="#credentialModal"
          >
            <i className="fas fa-user me-2 fs-10"></i>
            Get Test Credentials
          </button>
        </div>

        <hr className="dropdown-divider mt-4" />

        <p className="text-muted text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-muted">
            Register
          </Link>{" "}
        </p>
      </form>
    );
  };

  const ModalBox = () => {
    return (
      <div className="modal fade" id="credentialModal" tabindex="-1">
        <div className="modal-dialog ">
          <div className="modal-content  bg-light-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="credentialModalLabel">
                User & Admin Credentials
              </h5>
            </div>
            <div className="modal-body ">
              <table className="table table-sm text-white-200 ">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">User</th>
                    <td>naruto@test.com</td>
                    <td>12345</td>
                  </tr>
                  <tr>
                    <th scope="row">Admin</th>
                    <td>a@gmail.com</td>
                    <td>12345</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AuthBase>
      {performRedirect()}

      <div className="row justify-content-center mt-5 mb-3">
        <div className="col-xs-12 col-sm-6 col-md-4 text-left rounded ">
          <Card className="shadow position-relative">
            <Card.Body>
              <i className="fas fa-user-circle position-absolute start-50 translate-middle text-secondary profile-icon"></i>
              <ModalBox />
              {signInForm()}
            </Card.Body>
          </Card>
        </div>
      </div>
    </AuthBase>
  );
};

export default Signin;
