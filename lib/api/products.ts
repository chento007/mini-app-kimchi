"use server";

import { BASE_URL } from "@/constant/constant";
import { IProduct } from "../../.types/prdoduct";

export const fetchAllProduct = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const products: IProduct[] = await res.json();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};