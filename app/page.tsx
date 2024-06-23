import Link from "next/link";
import { getAllProducts } from "./actions";
import { Product } from "./lib/types/product.interfase";
import Image from "next/image";
import Pagination from "./components/pagination";
import { PER_PAGE } from "./lib/types/constatns";

export default async function Home({
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {entries.map((product) => (
          <div key={product.id} className="border-2 rounded p-2 mb-2">
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="mt-2">Price: {product.price}</p>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className="w-full object-contain bg-gray-200 rounded"
                priority
                quality={100}
              />
            ) : (
              <Image
                src={"/prod.svg"}
                alt={product.title}
                width={200}
                height={200}
                className="w-full object-contain bg-gray-200 rounded"
                priority
                quality={100}
              />
            )}
          </div>
        ))}
      </div>

      <Pagination
        path={"/"}
        length={products.length}
        hasNextPage={end < products.length}
        hasPrevPage={start > 0}
      />

      <Link className="flex mt-8 font-medium" href={`/admin`}>
        Admin
      </Link>
    </>
  );
}
