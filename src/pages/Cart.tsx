import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCartStore } from "../store/cartStore";
const Cart: React.FC = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Cart Items
            </h2>
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/"
                className="text-indigo-600 hover:underline font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-96">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
