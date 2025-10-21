"use server";

import { CreateProductData, Product } from "./../../.types/prdoduct.d";
import { api } from "./base";

export const productsApi = {
  // Get all products
  getAll: (): Promise<Product[]> => api.get("/products"),

  // Get single product
  getById: (id: number): Promise<Product> => api.get(`/products/${id}`),

  // Create product
  create: (data: CreateProductData): Promise<Product> =>
    api.post("/products", data),
};
