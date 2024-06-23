"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";
import { Product } from "@/app/lib/types/product.interfase";
import Image from "next/image";

type Props = { products: Product[] };

export default function Search({ products }: Props) {
  const [text, setText] = useState("");

  const filteredProducts =
    text === ""
      ? products
      : products.filter(
          (product: Product) =>
            product.title
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(text.toLowerCase().replace(/\s+/g, ""))
          // ||
          // element?.info
          //   ?.toLowerCase()
          //   .replace(/\s+/g, "")
          //   .includes(text.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <section className="mt-2">
      <div className="flex flex-col md:flex-row items-center gap-4 my-4">
        <strong>Products</strong>
        <input
          type="search"
          className="max-w-md w-full border border-black px-3 py-2 rounded-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full border border-black rounded px-3 py-2 mb-2"
          >
            <strong>{product.title}</strong>
            <p>Price: {product.price}</p>

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

            <div className="flex gap-2">
              <Link
                href={{ pathname: "/admin/edit", query: { id: product.id } }}
                className="button"
              >
                Edit
              </Link>

              <form
                action={async () => {
                  await deleteProduct(product.id);
                }}
              >
                <input name="id" type="hidden" value={product.id} readOnly />
                <SubmitButton label="Delete" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
