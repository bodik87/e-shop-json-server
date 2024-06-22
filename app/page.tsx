import Link from "next/link";
import { getAllProducts } from "./actions";
import { Product } from "./lib/types/product.interfase";

export default async function Home() {
  const products: Product[] = await getAllProducts();
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border-2 rounded p-2 mb-2">
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="mt-2">Price: {product.price}</p>
          </div>
        ))}
      </div>

      <Link className="font-medium" href={`/admin`}>
        Admin
      </Link>
    </>
  );
}
