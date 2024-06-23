"use client";

import { useState } from "react";
import { updateProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";
import { Product } from "@/app/lib/types/product.interfase";
import Image from "next/image";

type Props = {
  id: string;
  product: Product;
};

export default function EditForm({ id, product }: Props) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product?.image);

  const actionUpdate = async () => {
    if (title && price) {
      await updateProduct({ id, title, price, image });
    }
    setTitle("");
    setPrice(0);
    setImage(undefined);
  };

  return (
    <form className="mt-4 flex flex-col gap-2" action={actionUpdate}>
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full max-w-lg border px-2 py-1.5"
        placeholder="Title"
      />

      <label>Price</label>
      <input
        name="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full max-w-lg border px-2 py-1.5"
        placeholder="Price"
      />

      <label>Image path</label>
      <input
        name="image"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full max-w-lg border px-2 py-1.5"
        placeholder="Image path"
      />

      <SubmitButton label="Save changes" />
    </form>
  );
}
