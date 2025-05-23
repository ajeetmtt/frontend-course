import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../hooks/useGetSingleProduct";

const ProductDetails = () => {
  const { productID } = useParams();
  const singlePorduct = useGetSingleProduct(productID);
  if (!singlePorduct) return <h1>Loading...</h1>;
  const { title, description, image, category, price, rating } = singlePorduct;

  return (
    <div className="product">
      <img src={image} alt="" />
      <h3>{title}</h3>
      <h3>{description}</h3>
      <p>Rating:{rating?.rate}</p>
      <p>Price: {price}</p>
      <p>Category: {category}</p>
    </div>
  );
};

export default ProductDetails;
