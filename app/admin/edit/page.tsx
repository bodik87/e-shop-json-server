import { getProduct, updateProduct } from "@/app/actions";
import SubmitButton from "@/app/components/submit-button";
import { Product } from "@/app/lib/types/product.interfase";
import { useState } from "react";
import EditForm from "./_components/edit-form";

type Props = { searchParams: { id: string } };

export default async function Edit({ searchParams }: Props) {
  const id = searchParams.id;
  const product: Product = await getProduct(id);

  return (
    <div>
      <strong>Edit product</strong>
      <EditForm id={id} product={product} />
    </div>
  );
}
