import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearItems } from "../app/cartSlice";

const Cart = () => {
  const { cartItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handelClearCartItem = () => {
    dispatch(clearItems());
  };
  return (
    <div className="max-w-md mx-auto rounded-2xl shadow-md bg-yellow-500 my-5 p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-semibold">Cart Items- {cartItem.length}</h1>
        <button
          onClick={handelClearCartItem}
          className="bg-red-600 text-white rounded-md px-3 py-1 cursor-pointer"
        >
          Clear Cart
        </button>
      </div>
      {cartItem.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-base">Cart Is Empty</p>
          <Link to={"/"} className="underline text-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        cartItem.map((item) => (
          <div key={item.id} className="shadow-md flex hover:shadow-2xl">
            <img
              src={item.image}
              alt="image"
              className="size-16 object-contain rouded-md bg-white flex justify-center items-center"
            />
            <div className="flex-1 flex-col ">
              <p className="font-semibold ">{item.title}</p>
              <p className="">Price: ${item.price}</p>
              <p>Rating: {item.rating.rate}*</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
