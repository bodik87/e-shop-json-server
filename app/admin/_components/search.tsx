"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";
import { Product } from "@/app/lib/types/product.interfase";

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
      <strong>Products</strong>
      <input
        type="search"
        className="max-w-md w-full ml-4 border px-3 py-2 rounded-full my-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full border border-black rounded px-3 py-2 mb-2"
          >
            <strong>{product.title}</strong>
            <p>Price: {product.price}</p>

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
