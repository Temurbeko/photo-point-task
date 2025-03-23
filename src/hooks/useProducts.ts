import { useState, useEffect, useMemo } from "react";
import { fetchProducts, fetchCategories } from "../api/products";
import { Product } from "../api/types";
import { useFilterStore } from "../store/filterStoreParams";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { searchQuery, selectedCategory, priceRange } = useFilterStore();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;

      const matchesMinPrice =
        priceRange.min === null || product.price >= priceRange.min;
      const matchesMaxPrice =
        priceRange.max === null || product.price <= priceRange.max;

      return (
        matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  return {
    products: filteredProducts,
    categories,
    isLoading,
    error,
  };
}
