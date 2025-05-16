import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.image} alt="" />
      <h3>{product.title.substr(0, 20)}</h3>
      <p>Rating:{product.rating.rate}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default Product;
