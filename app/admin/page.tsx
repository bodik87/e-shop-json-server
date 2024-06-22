import Link from "next/link";
import { getAllProducts } from "../actions";
import { Product } from "../lib/types/product.interfase";
import Search from "./_components/search";

type Props = {};

export default async function Admin({}: Props) {
  const products: Product[] = await getAllProducts();
  return (
    <>
      <Link href={"/admin/create"} className="button">
        Create product
      </Link>

      <Search products={products} />
    </>
  );
}
