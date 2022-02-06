import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import Base from "./Base";
import Card from "./Card";

import { getProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        swal("Oops", data.error, "error");
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Welcome to Shopyle" description="Explore your true style.">
      <div className="container">
        <p className="text-white mb-5 display-6 text-center">
          Explore the tshirts
        </p>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <Card product={product} />
              </div>
            );
          })}
        </div>

        <hr class="dropdown-divider my-5" />

        <div className="row">
          <div className="col-md-6">
            <img
              src="https://i.ibb.co/K0h48LP/five.jpg"
              alt="image1"
              className="left-image rounded shadow-sm"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <p className="py-3 text-white-200" style={{ textAlign: "justify" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text
            </p>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <p className="py-3 text-white-200" style={{ textAlign: "justify" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text
            </p>
          </div>
          <div className="col-md-6 ">
            <img
              src="https://i.ibb.co/1RcHNmW/four.jpg"
              alt="image1"
              className="left-image rounded shadow-sm"
            />
          </div>
        </div>

        <hr class="dropdown-divider mt-5" />
      </div>
    </Base>
  );
}

export default Home;
