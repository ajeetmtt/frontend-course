import React from "react";
import { Link } from "react-router-dom";

const linkItems = [
  {
    link: "men",
    text: "Men",
  },
  {
    link: "women",
    text: "Women",
  },
  {
    link: "kids",
    text: "Kdis",
  },
  {
    link: "cart",
    text: "Cart",
  },
];

//export const H1 = () => <h1>Hello</h1>;
export const Navbar = () => {
  return (
    <div
      className="w-full fixed h-16 shadow border-b-gray-400 flex justify-between items-center 
    "
    >
      <h1 className="text-4xl font-extrabold text-gray-800">LOGO</h1>
      <ul className="flex justify-center items-center gap-5">
        {linkItems.map((item, index) => (
          <Link
            className="px-3 py-2 border border-gray-800 rounded-2xl hover:bg-purple-600 "
            key={index}
          >
            <li>{item.text}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
