import { ProductRequest, UploadResponse } from "../type/product";

// Fetch data from Api Product
const baseAPI = process.env.NEXT_PUBLIC_API;

//fetch Product List
export async function fetchAllProducts() {
  const data = await fetch(`${baseAPI}/api/v1/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();
  return response;
}

// Insert Product to API
export async function insertProduct(product: ProductRequest) {
  const data = await fetch(`${baseAPI}/api/v1/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const response = await data.json();
  return response;
}

// Insert Image to Server
export async function InsertProducts(product: ProductRequest) {
  if (!baseAPI) throw new Error("NEXT_PUBLIC_API_URL is missing");
  const data = await fetch(`${baseAPI}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!data.ok) {
    const text = await data.text();
    throw new Error(`Insert product failed: ${data.status} ${text}`);
  }
  const response = await data.json();
  return response;
}

// Upload Images
export async function uploadImageToServer(file: File): Promise<UploadResponse> {
  if (!baseAPI) throw new Error("NEXT_PUBLIC_API_URL is missing");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${baseAPI}/api/v1/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${baseAPI}/api/v1/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
