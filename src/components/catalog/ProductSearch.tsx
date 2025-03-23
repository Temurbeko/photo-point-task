import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "../../utils/debounce";
import { useFilterStore } from "../../store/filterStoreParams";

const ProductSearch: React.FC = () => {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    [setSearchQuery]
  );

  useEffect(() => {
    debouncedSetSearch(localSearch);
  }, [localSearch, debouncedSetSearch]);

  const handleClear = () => {
    setLocalSearch("");
    setSearchQuery("");
  };

  return (
    <div className="mb-5">
      <div className="relative">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {localSearch ? (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
