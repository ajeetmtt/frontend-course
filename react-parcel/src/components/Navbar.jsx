import React from "react";
import { Link } from "react-router-dom";

//export const H1 = () => <h1>Hello</h1>;
export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>LOGO</h1>
      <ul className="menu_Items">
        <Link to="/men">
          <li>MEN</li>
        </Link>
        <Link to="/women">
          <li>WOMEN</li>
        </Link>
        <Link to="/kids">
          <li>KIDS</li>
        </Link>
        <Link to="/cart">
          <li>CART</li>
        </Link>
        <Link to="/video">
          <li>Video</li>
        </Link>
      </ul>
    </div>
  );
};
