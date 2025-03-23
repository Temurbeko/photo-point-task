import React from "react";
import ProductGrid from "../components/catalog/ProductGrid";
import ProductSearch from "../components/catalog/ProductSearch";
import ProductFilters from "../components/catalog/ProductFilters";
import { useProducts } from "../hooks/useProducts";

const Catalog: React.FC = () => {
  const { products, categories, isLoading, error } = useProducts();
  console.log("--catalog--log");

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-red-100 border border-red-200 text-red-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="mt-2">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-block bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Product Catalog
      </h1>

      <ProductSearch />

      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-72 flex-shrink-0">
          <ProductFilters categories={categories} isLoading={isLoading} />
        </div>

        <div className="flex-1">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
