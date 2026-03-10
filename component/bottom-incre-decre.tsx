"use client";
import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/type/hook";

export default function VariableBottom({ unitPrice }: { unitPrice: number }) {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const total = unitPrice * count;

  return (
    <section className="flex flex-col items-center justify-center gap-3">
      <p className="text-sm font-medium">Total: ${total.toFixed(2)}</p>
      <div className="flex items-center justify-center gap-3">
        <Button variant="destructive" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <p>Item Variable: {count}</p>
        <Button onClick={() => dispatch(increment())} className="bg-green-700">
          +
        </Button>
      </div>
    </section>
  );
}
