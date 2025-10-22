"use client";
import React from "react";
import { IProduct } from "../../../.types/prdoduct";
import { ProductCard } from "../ListCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addToCart, decrease, increase } from "@/store/cartSlice";
import Link from "next/link";

interface Props {
  products: IProduct[];
}

export const HomePage: React.FC<Props> = ({ products }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const getProductQuantity = (productId: number): number => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCart(product));
  };

  const handleIncrease = (product: IProduct) => {
    dispatch(increase(product));
  };

  const handleDecrease = (product: IProduct) => {
    dispatch(decrease(product));
  };

  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap", // Added for better responsiveness
        }}
      >
        {products?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            quantity={getProductQuantity(p.id)} // Use the helper function
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>

      <Link
        href={"/view-order"}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#F4AD39",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: "15px",
          fontSize: "16px",
          cursor: "pointer",
          textDecoration: "none", // Added for Link styling
        }}
      >
        View Order ({totalItemsCount}){" "}
        {/* Show total quantity instead of item count */}
      </Link>
    </div>
  );
};
