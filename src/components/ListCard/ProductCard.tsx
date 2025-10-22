"use client";

import { Button } from "@telegram-apps/telegram-ui";
import { Product } from "../../../lib/api";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
}

export function ProductCard({
  product,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
}: ProductCardProps) {
  const handleAddClick = () => {
    console.log("ADD CLICKED - FINALLY WORKING!");
    onAddToCart(product);
  };

  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        gap: "10px",
        padding: "15px 0",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "120px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <img src="/images/burger.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
        <div
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            padding: "5px",
            width: "13px",
            textAlign: "center",
            borderRadius: "100%",
            backgroundColor: "#F4AD39",
            zIndex: 3,
            fontSize: "10px",
          }}
        >
          {quantity}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "12px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            textAlign: "center",
          }}
        >
          {product.name}
        </div>{" "}
        <div>$ {product.price}</div>
      </div>

      {quantity === 0 ? (
        <Button
          onClick={handleAddClick}
          style={{
            width: "100px",
            backgroundColor: "#F4AD39",
            fontSize: "12px",
            borderRadius: "10px",
            color: "white",
            height: "30px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          ADD
        </Button>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 10,
            position: "relative",
          }}
        >
          <Button
            onClick={() => onDecrease(product)}
            style={{
              width: "30px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
              fontSize: "100px",
              height: "30px",
              fontWeight: "bold",
              zIndex: 10,
            }}
          >
            -
          </Button>
          <Button
            onClick={() => onIncrease(product)}
            style={{
              width: "30px",
              backgroundColor: "#F4AD39",
              color: "white",
              borderRadius: "10px",
              height: "30px",
              fontWeight: "bold",
              zIndex: 10,
            }}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}
