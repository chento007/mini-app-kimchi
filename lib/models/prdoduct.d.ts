export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imgUrl?: string;
  stock: number;
  createdAt: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
  imgUrl?: string;
  stock?: number;
}