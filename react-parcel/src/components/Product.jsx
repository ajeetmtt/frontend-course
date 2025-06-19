import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItems } from "../app/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  console.log(product);
  const handelCartItem = () => {
    dispatch(addItems(product));
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link key={product.id} to={`/product/${product.id}`}>
        <div className="relative">
          <img
            className="w-full h-48 object-contain p-4 bg-gray-50"
            src={product.image}
            alt={product.title}
          />
          {product.rating.rate >= 4 && (
            <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
              Limited Deal
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-gray-900 font-medium mb-2 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating.rate)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm ml-1">
              ({product.rating.count})
            </span>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={handelCartItem}
        className="bg-blue-500 text-white rounded-2xl cursor-pointer py-2 px-4"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
