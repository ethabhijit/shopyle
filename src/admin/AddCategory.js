import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { Card, Spinner } from "react-bootstrap";
import OtherBase from "../core/OtherBase";

import { isAutheticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, token } = isAutheticated();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (!name) {
      swal("Oops", "Please provide a name of category", "error");
      return;
    }

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      setLoading(false);
      if (data.error) {
        swal("Oops", data.error, "error");
      } else {
        setName("");
        swal("Congratulations!", "The category is created!", "success");
      }
    });
  };

  const CreateCategoryForm = () => (
    <form onSubmit={onSubmit} className="pt-3">
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control bg-dark border border-secondary text-light mb-3 fs-6"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button type="submit" className="btn btn-success mb-3 me-2">
          {loading && <Spinner animation="grow" size="sm" className="me-1" />}
          Create
        </button>
        <Link
          className="btn btn-outline-secondary mb-3"
          to={`/admin/dashboard`}
        >
          <i className="fas fa-arrow-left me-2 fs-6 "></i> Go Back
        </Link>
      </div>
    </form>
  );

  return (
    <OtherBase showCopywrite={false}>
      <div className="row justify-content-center p-4">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
          <Card className="shadow">
            <Card.Body>
              <Card.Title>
                <i className="fas fa-plus-circle me-2 fs-6 text-secondary"></i>
                <span className="text-secondary">Create category</span>
              </Card.Title>
              <CreateCategoryForm />
            </Card.Body>
          </Card>
        </div>
      </div>
    </OtherBase>
  );
};

export default AddCategory;
