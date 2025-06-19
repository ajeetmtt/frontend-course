import React from "react";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../hooks/useGetSingleProduct";
import { StarIcon } from "@heroicons/react/24/solid";

const ProductDetails = () => {
  const { productID } = useParams();
  const singleProduct = useGetSingleProduct(productID);

  if (!singleProduct)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-2xl text-gray-600">
          Loading product details...
        </div>
      </div>
    );

  const { title, description, image, category, price, rating } = singleProduct;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-8 max-h-[500px]"
          />
        </div>

        {/* Product Details */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {title}
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(rating?.rate)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {rating?.rate} ({rating?.count} reviews)
            </span>
          </div>

          <div className="mb-8">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            <span className="ml-2 text-sm text-gray-500">+ Free Shipping</span>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Category</h2>
            <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
