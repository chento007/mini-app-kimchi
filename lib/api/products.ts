"use server";

import { BASE_URL } from "@/constant/constant";
import { IProduct } from "../../.types/prdoduct";

export const fetchAllProduct = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const products: IProduct[] = await res.json();
  return products;
};
