import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { isAutheticated } from "../auth/helper";
import OtherBase from "../core/OtherBase";
import { getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  // const { user, token } = isAutheticated();

  const preload = () => {
    setLoading(true);
    getCategories().then((data) => {
      if (data.error) {
        setLoading(false);
        console.log(data.error);
      } else {
        setLoading(false);
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <OtherBase showCopywrite={false}>
      <h2 className="mb-4 h5 text-secondary p-3">
        <i className="fas fa-tasks me-3 fs-6 "></i>
        <span className="me-2">Manage Categories</span>
        {loading && (
          <span
            className="spinner-grow spinner-grow-sm pe-2"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <Link
          className="btn btn-sm btn-outline-secondary float-end fs-7"
          to={`/admin/dashboard`}
        >
          <span className="">
            {" "}
            <i className="fas fa-arrow-left me-2 fs-7"></i>Go Back
          </span>
        </Link>
      </h2>

      <div className="table-responsive-sm">
        <table className="table table-dark table-striped table-hover shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{category.name}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-success me-2 fs-7"
                        to={`/admin/product/update/productId`}
                      >
                        <i className="fas fa-pen me-2 fs-7"></i>Update
                      </Link>
                      <button
                        onClick={() => {}}
                        className="btn btn-sm btn-danger fs-7"
                      >
                        <i className="fas fa-trash me-2 fs-7"></i>Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </OtherBase>
  );
};

export default ManageCategories;
