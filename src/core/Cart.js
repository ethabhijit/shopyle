import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { loadCart } from "./helper/cartHelper";

import OtherBase from "./OtherBase";
import Card from "./Card";
import Payment from "./payment";

function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <>
        {Array.isArray(products) &&
          products.map((product, index) => {
            return (
              <div key={index} className="col-xs-12 col-sm-6 col-md-6 mb-4">
                <Card
                  key={index}
                  product={product}
                  removeFromCart={true}
                  addtoCart={false}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            );
          })}
      </>
    );
  };

  const CartEmptyMessage = ({ variant }) => (
    <div
      className="d-flex justify-content-start align-items-start w-100 "
      style={{ height: "50vh" }}
    >
      <Alert variant={variant}>
        <i className="fas fa-info-circle"></i>
        <span className="ml-5"> No products added in the cart.</span>
      </Alert>
    </div>
  );

  return (
    <OtherBase>
      <div className="row my-3">
        {Array.isArray(products) && products.length > 0 ? (
          <div className="col-xs-12 col-sm-6 col-md-6 mb-4">
            <div className="row">{loadAllProducts(products)}</div>
          </div>
        ) : (
          <CartEmptyMessage variant="info" />
        )}

        <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 col-md-6">
          {Array.isArray(products) && products.length !== 0 && (
            <Payment products={products} setReload={setReload} />
          )}
        </div>
      </div>
    </OtherBase>
  );
}

export default Cart;
