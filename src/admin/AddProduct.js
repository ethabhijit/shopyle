import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import OtherBase from "../core/OtherBase";

import { getCategories, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const AddProduct = () => {
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

  const { name, description, price, stock, categories, loading, formData } =
    values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((prev) => ({ ...prev, error: data.error }));
        swal("Oops", data.error, "error");
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
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !description || !price || !stock) {
      swal(
        "Oops",
        "There are some incomplete fields in your submission",
        "error"
      );
      return;
    }
    setValues({ ...values, error: "", loading: true });

    createaProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        swal("Oops", data.error, "error");
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
        swal("Congratulations!", "The product is added!", "success");
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const CreateProductForm = () => (
    <form onSubmit={onSubmit} className="p-2">
      <div className="form-group mb-3 pt-3">
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
          className="form-control bg-dark border border-secondary text-light fs-6"
          accept="image"
        />
      </div>

      <button type="submit" className="btn btn-success mb-3 me-2">
        {loading && (
          <span
            class="spinner-grow spinner-grow-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        Create
      </button>
      <Link className="btn btn-outline-secondary mb-3" to={`/admin/dashboard`}>
        <i className="fas fa-arrow-left me-2 fs-6 "></i> Go Back
      </Link>
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
                <span className="text-secondary">Create Product</span>
              </Card.Title>
              <CreateProductForm />
            </Card.Body>
          </Card>
        </div>
      </div>
    </OtherBase>
  );
};

export default AddProduct;
