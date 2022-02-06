import React from "react";
import OtherBase from "../core/OtherBase";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email }
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card bg-dark border border-light shadow-lg">
        <h4 className="card-header  text-white "><i class="fas fa-bars me-2 fs-5"></i>Navigation</h4>
        <ul className="list-group list-group-flush ">
          <li className="list-group-item bg-dark border-bottom border-light rounded-0">
            <Link to="/admin/create/category" className="nav-link text-secondary">
             <i class="fas fa-plus-circle me-2 fs-6 "></i>Create Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark border-bottom border-light rounded-0">
            <Link to="/admin/categories" className="nav-link text-secondary">
              <i class="fas fa-tasks me-2 fs-6 "></i>Manage Categories
            </Link>
          </li>
          <li className="list-group-item bg-dark border-bottom border-light rounded-0">
            <Link to="/admin/create/product" className="nav-link text-secondary">
              <i class="fas fa-plus-circle me-2 fs-6 "></i>Create Product
            </Link>
          </li>
          <li className="list-group-item bg-dark border-bottom border-light rounded-0">
            <Link to="/admin/products" className="nav-link text-secondary">
               <i class="fas fa-tasks me-2 fs-6 "></i>Manage Products
            </Link>
          </li>
         
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4 bg-dark  border border-light shadow-lg">
        <h4 className="card-header"><i class="fas fa-info-circle me-2 fs-5"></i>Details</h4>
        <ul className="list-group">
          <li className="list-group-item bg-dark text-light">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item bg-dark text-light">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

        </ul>
      </div>
    );
  };
  return (
    <OtherBase showCopywrite={false}>
      <div className="row">
        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 my-1">{adminLeftSide()}</div>
        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9 my-1">{adminRightSide()}</div>
      </div>
    </OtherBase>
  );
};

export default AdminDashBoard;
