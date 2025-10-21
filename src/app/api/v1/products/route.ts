import { db } from "@/db";
import { products } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  price: z
    .number()
    .positive("Price must be positive")
    .max(999999, "Price too high"),
  description: z.string().max(500, "Description too long").optional(),
  imgUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = productSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid product data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(products)
      .values(validationResult.data)
      .returning();

    return NextResponse.json(newProduct[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
