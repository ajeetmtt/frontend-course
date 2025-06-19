import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const linkItems = [
  { link: "men", text: "Men" },
  { link: "women", text: "Women" },
  { link: "kids", text: "Kids" },
];

export const Navbar = () => {
  const { cartItem } = useSelector((state) => state.cart);

  return (
    <nav className="w-full fixed top-0 h-16 bg-white shadow-md z-50 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          ShopEase
        </Link>

        <div className="flex items-center space-x-6">
          {linkItems.map((item) => (
            <Link
              key={item.link}
              to={`/${item.link}`}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              {item.text}
            </Link>
          ))}

          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-indigo-600" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full flex items-center justify-center size-5">
              {cartItem.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
