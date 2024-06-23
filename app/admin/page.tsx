import Link from "next/link";
import { getAllProducts } from "../actions";
import { Product } from "../lib/types/product.interfase";
import Search from "./_components/search";
import Pagination from "../components/pagination";
import { PER_PAGE } from "../lib/types/constatns";

export default async function Admin({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products: Product[] = await getAllProducts();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? PER_PAGE;

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = products.slice(start, end);
  return (
    <>
      <Link href={"/admin/create"} className="button">
        Create product
      </Link>

      <Search products={products} entries={entries} />

      <Pagination
        path={"/admin"}
        length={products.length}
        hasNextPage={end < products.length}
        hasPrevPage={start > 0}
      />
    </>
  );
}
