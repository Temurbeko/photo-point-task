import React, { useEffect, useState } from "react";
import { useFilterStore } from "../../store/filterStoreParams";

interface ProductFiltersProps {
  categories: string[];
  isLoading: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  isLoading,
}) => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  const [minPrice, setMinPrice] = useState(priceRange.min?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(priceRange.max?.toString() || "");

  useEffect(() => {
    const minVal = minPrice === "" ? null : parseFloat(minPrice);
    const maxVal = maxPrice === "" ? null : parseFloat(maxPrice);

    const timer = setTimeout(() => {
      setPriceRange(minVal, maxVal);
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, setPriceRange]);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-3 bg-gray-200 rounded-md focus:outline-none"
        >
          <span className="text-lg font-semibold text-gray-800">Filters</span>
          {isExpanded ? (
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } md:max-h-full md:opacity-100`}
      >
        <h3 className="font-semibold text-2xl mb-6 text-gray-800 hidden md:block">
          Filters
        </h3>

        <div className="mb-8">
          <h4 className="font-medium text-lg mb-3 text-gray-700">Category</h4>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-200 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="all-categories"
                  type="radio"
                  name="category"
                  checked={selectedCategory === null}
                  onChange={() => setSelectedCategory(null)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="all-categories" className="ml-3 text-gray-700">
                  All Categories
                </label>
              </div>

              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-3 text-gray-700 capitalize"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-lg mb-3 text-gray-700">
            Price Range
          </h4>
          <div className="flex space-x-4 p-0.5">
            <div className="flex-1">
              <label
                htmlFor="min-price"
                className="block text-sm text-gray-600"
              >
                Min
              </label>
              <input
                id="min-price"
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="max-price"
                className="block text-sm text-gray-600"
              >
                Max
              </label>
              <input
                id="max-price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-full mt-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            resetFilters();
            setMinPrice("");
            setMaxPrice("");
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-md font-medium transition-colors shadow-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
