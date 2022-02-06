import React, { useState, useEffect } from "react";
import OtherBase from "../core/OtherBase";
import { Link } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    createdProduct,
    formData,
    loading,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        preloadCategories();
        setValues((prev) => ({
          ...prev,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        }));
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
      } else {
        setValues((prev) => ({
          ...prev,
          categories: data,
          formData: new FormData(),
        }));
      }
    });
  };

  useEffect(() => {
    if(match.params.productId) {
      preload(match.params.productId);
    }
  }, [match.params.productId]);

  // TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} updated successfully</h4>
    </div>
  );

  const createProductForm = () => (
    <form onSubmit={onSubmit}>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control bg-dark border border-secondary text-light fs-6"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control bg-dark border border-secondary text-light fs-6"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control bg-dark border border-secondary text-light fs-6"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange("category")}
          className="form-select bg-dark border border-secondary text-light fs-6"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control bg-dark border border-secondary text-light fs-6"
          placeholder="Stock"
          value={stock}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          className="form-control bg-dark border border-secondary text-light fs-6"
          placeholder="choose a file"
        />
      </div>

      <button type="submit" className="btn btn-outline-success mb-3">
        <i className="fas fa-pen me-2 fs-6 "></i> Update Product
      </button>
    </form>
  );

  return (
    <OtherBase showCopywrite={false}>
      <h2 className="mb-4 h5 text-secondary">
        <i className="fas fa-pen me-3 fs-6 "></i>
        <span className="me-2">Update product</span>
        {loading && (
          <span
            className="spinner-grow spinner-grow-sm pe-2"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <Link
          className="btn btn-sm btn-outline-secondary float-end"
          to={`/admin/products`}
        >
          <span className="">
            {" "}
            <i className="fas fa-arrow-left me-2 fs-6 "></i>Go Back
          </span>
        </Link>
      </h2>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-6 col-md-4">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </OtherBase>
  );
};

export default UpdateProduct;
