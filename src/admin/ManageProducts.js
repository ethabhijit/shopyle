import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import OtherBase from "../core/OtherBase";
import { deleteProduct, getProducts } from "./helper/adminapicall";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAutheticated();

  const preload = () => {
    setLoading(true);
    getProducts().then((data) => {
      if (data.error) {
        setLoading(false);
        console.log(data.error);
      } else {
        setLoading(false);
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <OtherBase showCopywrite={false}>
      <h2 className="mb-4 h5 text-secondary p-3">
        <i className="fas fa-tasks me-3 fs-6 "></i>
        <span className="me-2">Manage products</span>
        {loading && (
          <span
            className="spinner-grow spinner-grow-sm pe-2"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <Link
          className="btn btn-sm btn-outline-secondary float-end"
          to={`/admin/dashboard`}
        >
          <span className="">
            {" "}
            <i className="fas fa-arrow-left me-2 fs-6 "></i>Go Back
          </span>
        </Link>
      </h2>

      <div className="table-responsive-sm">
        <table className="table table-dark table-striped table-hover shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Sold</th>
              <th scope="col">Stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => {
                return (
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{product.name}</td>
                    <td className="text-secondary fw-bold">{product.price}</td>
                    <td className="text-primary fw-bold">{product.sold}</td>
                    <td className="text-info fw-bold">{product.stock}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-outline-success me-2 fs-7 btn-responsive"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <i className="fas fa-pen me-2 fs-7 icon-responsive"></i>Update
                      </Link>
                      <button
                        onClick={() => {
                          deleteThisProduct(product._id);
                        }}
                        className="btn btn-sm btn-danger fs-7 btn-responsive"
                      >
                        <i className="fas fa-trash me-2 fs-7 icon-responsive"></i>Delete
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
}

export default ManageProducts;
