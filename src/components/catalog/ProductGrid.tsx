import React from "react";
import { Product } from "../../api/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}
const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl h-80 animate-pulse shadow-md"
          ></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">No products found</h2>
        <p className="text-gray-500 mt-3">
          Try adjusting your search or filters to find what you need.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
