import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearItems } from "../app/cartSlice";
import {
  ShoppingCartIcon,
  TrashIcon,
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearItems());
    }
  };

  const calculateTotal = () => {
    return cartItem.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen py-8 px-4 sm:px-6">
      <div className="flex items-center mb-6">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Continue Shopping
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cart Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ShoppingCartIcon className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">
                Your Cart ({cartItem.length}{" "}
                {cartItem.length === 1 ? "item" : "items"})
              </h1>
            </div>
            {cartItem.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Content */}
        {cartItem.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCartIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Cart Items */}
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain bg-white p-2 rounded-lg border border-gray-200"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400 mr-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 fill-current ${
                              i < Math.floor(item.rating.rate)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        <span className="text-gray-500 text-sm ml-1">
                          ({item.rating.count})
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <span className="w-8 text-center">1</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${calculateTotal()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold">${calculateTotal()}</span>
              </div>
              <button className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                Proceed to Checkout
                <ArrowLeftIcon className="h-5 w-5 ml-2 transform rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
