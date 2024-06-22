"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Product } from "./lib/types/product.interfase";
import { redirect } from "next/navigation";

export async function getAllProducts() {
  const response = await fetch("http://localhost:4002/products");
  const products = await response.json();
  revalidatePath("/");
  return products;
}

export async function getProduct(id: string) {
  const response = await fetch(`http://localhost:4002/products/${id}`);
  const product = await response.json();
  revalidatePath("/admin/edit");
  return product;
}

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;

  if (title && price) {
    await fetch("http://localhost:4002/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: randomUUID(), title, price }),
    });
    revalidatePath("/admin");
    redirect("/admin");
  }
}

export async function updateProduct(product: Product) {
  await fetch(`http://localhost:4002/products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await fetch(`http://localhost:4002/products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  revalidatePath("/admin");
}
