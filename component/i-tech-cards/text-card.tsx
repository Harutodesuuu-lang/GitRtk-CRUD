"use client";
import { useAppSelector } from "@/lib/type/hook";

export default function TextCard() {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <section>
      <p>Global state: {count}</p>
    </section>
  );
}
