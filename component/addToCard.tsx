"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/type/hook";

export default function AddCartBottom({ unitPrice }: { unitPrice: number }) {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <Button
      className="bg-green-600"
      disabled={count === 0}
      onClick={() => dispatch(addToCart({ quantity: count, unitPrice }))}
    >
      Add to Cart
    </Button>
  );
}
