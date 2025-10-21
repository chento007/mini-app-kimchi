import { useState, useEffect } from "react";
import { Product, productsApi } from "../lib/api";
import { CreateProductData } from "../.types/prdoduct";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (err) {
      console.log("error: ", err);

      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (
    productData: CreateProductData
  ): Promise<Product> => {
    setError(null);
    try {
      const newProduct = await productsApi.create(productData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create product";
      setError(message);
      throw new Error(message);
    }
  };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
  };
};
