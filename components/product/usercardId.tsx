"use client";
import { useGetUserByIdQuery } from "@/lib/api/productApi";

export default function UserCardId() {
  const { data, isLoading } = useGetUserByIdQuery();
  console.log("Rtk data id", data);
  return (
    <section>
      <p> rtk query User By Id: {isLoading} </p>
      {isLoading ? <p>Is Loading Id</p> : <p> Data is ready Id</p>}
    </section>
  );
}
