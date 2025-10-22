import { Page } from "@/components/Page";
import { fetchAllProduct } from "../../lib/api/products";
import { ListCardProduct } from "@/components/ListCard/ListCardProduct";
import { HomePage } from "@/components/container/HomePage";

export default async function page() {
  const products = await fetchAllProduct();

  console.log("products: ", products);

  return (
    <Page back={true}>
      {products ? (
        <HomePage products={products} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading
        </div>
      )}
    </Page>
  );
}
