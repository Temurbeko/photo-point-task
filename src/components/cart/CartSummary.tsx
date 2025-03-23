import React from "react";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
const CartSummary: React.FC = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Order Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between text-lg text-gray-700">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-700">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
          </span>
        </div>
        {shippingCost > 0 && (
          <div className="text-sm text-gray-500">
            Add {formatCurrency(50 - subtotal)} more for free shipping
          </div>
        )}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-xl text-gray-800">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-colors">
          Proceed to Checkout
        </button>
        <button
          onClick={clearCart}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
