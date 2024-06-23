import Link from "next/link";
import { getAll, getAllProducts } from "./actions";
import { Product } from "./lib/types/product.interfase";
import Image from "next/image";
import Pagination from "./components/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const allProducts: Product[] = await getAllProducts();
  const products: Product[] = await getAll(searchParams?.page);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
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

      <Pagination totalPages={allProducts.length} />

      <Link className="font-medium" href={`/admin`}>
        Admin
      </Link>
    </>
  );
}
