import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  // function(f) { return f; }
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart} className="btn btn-outline-secondary mt-2 mb-2">
          <i class="fas fa-cart-plus me-2"></i>
          Add to cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
        <i class="fas fa-trash me-2"></i>
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div class="card text-white bg-dark shadow">
      <ImageHelper product={product} />
      <div class="card-body ">
        {getARedirect(redirect)}
        <h5 class="card-title">
          {cartTitle}
          <span class="badge border border-secondary float-end">
            <i class="fas fa-dollar-sign me-2"></i> {cartPrice}
          </span>
        </h5>
        <p class="card-text text-white-200">{cartDescrption}</p>
        {showAddToCart(addtoCart)}
        {showRemoveFromCart(removeFromCart)}
      </div>
    </div>
  );
};

export default Card;
