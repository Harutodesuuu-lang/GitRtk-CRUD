import Image from "next/image";
import { Metadata } from "next";
import ProductListClient from "@/component/i-tech-cards/product-lists-client";
import { fetchAllProducts } from "@/lib/data/products";
import { useAppSelector } from "@/lib/type/hook";
import ICard from "@/component/i-tech-cards/i-card";
import TextCard from "@/component/i-tech-cards/text-card";
import ProductCard from "@/components/product/productcard";

import UserCardId from "@/components/product/usercardId";
export const metadata: Metadata = {
  title: "Ishop -Home",
  description: "I shop probode electronic",
};
export default function Home() {
  return (
    <main>
      <ICard />
      <TextCard />
      <ProductCard />
      <UserCardId />
      <ProductListClient fetchProducts={fetchAllProducts()} />
    </main>
  );
}
