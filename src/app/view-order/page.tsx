"use client";
import { Page } from "@/components/Page";
import { AppDispatch, RootState } from "@/store";
import { decrease, increase } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ViewOrderPage() {
  const [paymentMethod, setPaymentMethod] = useState("aba");

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  console.log("cart: ", cartItems);

  // Calculate totals
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Page back={true}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h3 style={{ margin: 0 }}>YOUR ORDER</h3>
        <Link
          href={"/"}
          style={{
            color: "green",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Edit
        </Link>
      </div>

      {/* Cart Items List */}
      <div style={{ padding: "20px" }}>
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Your cart is empty
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "15px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontSize: "12px",
                }}
              >
                Image
              </div>

              {/* Product Details */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  {item.product.name}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "8px",
                  }}
                >
                  ${item.product.price}
                </div>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      backgroundColor: "red",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => dispatch(decrease(item.product))}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #ddd",
                      backgroundColor: "#F4AD39",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => dispatch(increase(item.product))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "right",
                }}
              >
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #e0e0e0",
            padding: "20px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontSize: "16px",
            }}
          >
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 15px",
                borderRadius: "8px",
                border:
                  paymentMethod === "khqr-aba"
                    ? "2px solid #F4AD39"
                    : "2px solid #e5e7eb",
                cursor: "pointer",
              }}
              onClick={() => setPaymentMethod("khqr-aba")}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "khqr-aba"}
                  onChange={() => setPaymentMethod("khqr-aba")}
                  style={{ width: "16px", height: "16px", color: "#F4AD39" }}
                />
                <div style={{ height: "100%" }}>
                  <img
                    src="/images/aba-bank.svg"
                    alt="ABA Bank"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "6px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ABA KHQR
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Scan to pay with any banking app
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: "#F4AD39",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log("Proceeding to checkout");
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </Page>
  );
}
