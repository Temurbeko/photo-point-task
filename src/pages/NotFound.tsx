import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-10">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-colors"
      >
        Return to Catalog
      </Link>
    </div>
  );
};

export default NotFound;
