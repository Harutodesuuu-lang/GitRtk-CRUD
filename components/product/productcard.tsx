"use client";
import { useGetProductsQuery } from "@/lib/api/productApi";

export default function ProductCard() {
  const { data, isLoading } = useGetProductsQuery();
  console.log("Rtk data", data);
  return (
    <section>
      <p> rtk query: {isLoading} </p>
      {isLoading ? <p>Is Loading</p> : <p> Data is ready</p>}
    </section>
  );
}
