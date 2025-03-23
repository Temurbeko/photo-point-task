import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
const Header: React.FC = () => {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 right-0 z-50 shadow-xl backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors"
        >
          Photo Point Shop 🛒
        </Link>

        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-yellow-300 transition-colors"
                } text-lg`}
              >
                Catalog
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/cart"
                className={`${
                  location.pathname === "/cart"
                    ? "text-yellow-300 font-semibold"
                    : "hover:text-yellow-300 transition-colors"
                } text-lg`}
              >
                Cart
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-6 bg-yellow-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
