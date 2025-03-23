import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  priceRange: PriceRange;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = (): FilterState => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("searchQuery") || "";
  const selectedCategory = searchParams.get("selectedCategory") || null;
  const min = searchParams.get("minPrice");
  const max = searchParams.get("maxPrice");

  const priceRange: PriceRange = {
    min: min ? Number(min) : null,
    max: max ? Number(max) : null,
  };

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      updateSearchParams({ searchQuery: query || null });
    },
    [updateSearchParams]
  );

  const setSelectedCategory = useCallback(
    (category: string | null) => {
      updateSearchParams({ selectedCategory: category || null });
    },
    [updateSearchParams]
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      updateSearchParams({
        minPrice: min !== null ? min.toString() : null,
        maxPrice: max !== null ? max.toString() : null,
      });
    },
    [updateSearchParams]
  );

  const resetFilters = useCallback(() => {
    updateSearchParams({
      searchQuery: null,
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
    });
  }, [updateSearchParams]);

  return {
    searchQuery,
    selectedCategory,
    priceRange,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    resetFilters,
  };
};
