"use client";
import { useGetProductByIdQuery } from "@/lib/api/productApi";

export default function SingleCardId({ id }: { id: number }) {
  const { data, isLoading } = useGetProductByIdQuery(id);
  console.log("Rtk data id", data);
  return (
    <section>
      <p> rtk query By Id: {isLoading} </p>
      {isLoading ? <p>Is Loading Id</p> : <p> Data is ready Id</p>}
    </section>
  );
}
