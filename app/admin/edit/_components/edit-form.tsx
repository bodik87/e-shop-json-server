"use client";

import { useState } from "react";
import { updateProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";
import { Product } from "@/app/lib/types/product.interfase";

type Props = {
  id: string;
  product: Product;
};

export default function EditForm({ id, product }: Props) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const actionUpdate = async () => {
    if (title && price) {
      await updateProduct({ id, title, price });
    }
    setTitle("");
    setPrice(0);
  };
  return (
    <form className="mt-4 flex flex-col gap-2" action={actionUpdate}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-fit border px-2 py-1.5"
        placeholder="Title"
      />

      <label>Price</label>
      <input
        name="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-fit border px-2 py-1.5"
        placeholder="Price"
      />

      <SubmitButton label="Save" />
    </form>
  );
}
