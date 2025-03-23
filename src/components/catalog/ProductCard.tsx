import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../api/types";
import { useCartStore, useIsInCart } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const isInCart = useIsInCart(product);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
    >
      <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-2 capitalize">
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-indigo-600">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
