import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// 🛍️ Product Table
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: real("price").notNull(),
  description: text("description"),
  imgUrl: text("img_url"),
});

// 🧾 Invoice Table
export const invoices = sqliteTable("invoices", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerName: text("customer_name").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
  totalAmount: real("total_amount").notNull(),
});

// 🧩 Invoice Item Table
export const invoiceItems = sqliteTable("invoice_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invoiceId: integer("invoice_id")
    .references(() => invoices.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
});

// 🛒 Order Table
export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  reqTime: text("req_time").default("CURRENT_TIMESTAMP"),
  tranId: text("tran_id").notNull(), // transaction id from payment gateway
  amount: real("amount").notNull(),
});

// 🔗 Relations (optional for Drizzle ORM relational querying)
export const productsRelations = relations(products, ({ many }) => ({
  invoiceItems: many(invoiceItems),
  orders: many(orders),
}));

export const invoicesRelations = relations(invoices, ({ many }) => ({
  invoiceItems: many(invoiceItems),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
  product: one(products, {
    fields: [invoiceItems.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
}));
