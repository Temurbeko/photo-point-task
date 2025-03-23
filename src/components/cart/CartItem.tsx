import React from "react";
import { CartItem as CartItemType } from "../../types/cart";
import { useCartStore } from "../../store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";

interface CartItemProps {
  item: CartItemType;
}
const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { product, quantity } = item;

  return (
    <div className="flex md:flex-nowrap flex-wrap justify-between gap-y-2 items-center py-6 border-b border-gray-200">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-3"
        />
      </div>

      <div className="flex-1 ml-6">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Subtotal: {formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>

      <div className="flex items-center ml-6 space-x-2 font-bold text-xl justify-center">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          -
        </button>
        <span className="w-10 text-center font-medium text-gray-800">
          {quantity}
        </span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(product.id)}
        className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
        aria-label="Remove item"
      >
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
