import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product } from "../api/types";
import { useCartStore, useIsInCart } from "../store/cartStore";
import { formatCurrency } from "../utils/formatCurrency";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const isInCart = useIsInCart(product);

  useEffect(() => {
    async function fetchProductById() {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductById();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }

      navigate("/cart");
    }
  };
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-96 bg-gray-300 rounded-lg"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              <div className="h-12 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="p-6 bg-red-100 border border-red-200 rounded-md">
          <h2 className="text-xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-red-700">
            {error?.message || "Product not found"}
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="mb-8">
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Back to Catalog
        </Link>
      </nav>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm mb-4 capitalize">
            {product.category}
          </p>
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-6">
              <span className="text-yellow-400 mr-2">★</span>
              <span className="text-lg text-gray-700">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>
          <div className="text-3xl font-bold text-indigo-600 mb-6">
            {formatCurrency(product.price)}
          </div>
          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center mb-8">
            <span className="mr-4 text-lg">Quantity:</span>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 transition-colors"
              >
                -
              </button>
              <span className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 text-gray-700">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
