import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "src/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL! || "libsql://kimchi-stagging-3-chento.aws-ap-northeast-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjEwNjE2NjksImlkIjoiN2RjNjNlNGMtY2YyMC00NDBlLTljZjEtZDUxODI5MTNkMDFkIiwicmlkIjoiNzFmNzM5ZjYtYTM2ZS00NzM5LTg2ZmUtMDI0OGJiZDgxZThlIn0.SxxfBGq4Q8ObV3ZJ6PEBn7WWCn1ysy4YhdjYvIWHXGwSSLzziWKVi9xJAxiB-qjy1h9-KsN1qDf_rFt8n8dMBw"
  },
});