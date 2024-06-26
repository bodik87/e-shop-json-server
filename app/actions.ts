"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Product } from "./lib/types/product.interfase";
import { redirect } from "next/navigation";

const API_URL = "https://json-server-vercel-shop.vercel.app/api";

export async function getAll(page: string | undefined) {
  const response = await fetch(`${API_URL}products?_page=${page}&_limit=2`);
  const products = await response.json();
  revalidatePath("/");
  return products;
}

export async function getAllProducts() {
  const response = await fetch(`${API_URL}products`);
  const products = await response.json();
  revalidatePath("/");
  return products;
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}products/${id}`);
  const product = await response.json();
  revalidatePath("/admin/edit");
  return product;
}

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as string;

  if (title && price) {
    await fetch(`${API_URL}products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: randomUUID(), title, price, image }),
    });
    revalidatePath("/admin");
    redirect("/admin");
  }
}

export async function updateProduct(product: Product) {
  console.log(product);
  await fetch(`${API_URL}products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: string) {
  await fetch(`${API_URL}products/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  revalidatePath("/admin");
}
