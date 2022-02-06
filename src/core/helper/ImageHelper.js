import React from "react";
import { API } from "../../backend";

function ImageHelper({ product }) {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

  return <img src={imageURL} alt="product" className="card-img-top" />;
}

export default ImageHelper;
