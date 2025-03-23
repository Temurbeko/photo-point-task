import React from "react";
import { Link } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Photo Point Shop 🛒</h3>
            <p className="mt-2 text-sm">
              Your one-stop shop for quality products
            </p>
          </div>

          <div className="text-sm text-center md:text-right">
            <p>
              © {new Date().getFullYear()} Photo Point Shop 🛒. All rights reserved.
            </p>{" "}
            <p className="mt-2 space-x-2">
              <span>Built with React, TypeScript, and Tailwind CSS BY </span>
              <Link
                to="https://www.linkedin.com/in/temurbekunical/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1 px-3 py-1 font-bold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:shadow-2xl hover:scale-105 animate-pulse"
              >
                ✨ Тимурбеко
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
