"use client";
import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/type/hook";

export default function ICard() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  return (
    <section>
      <h1>This is the ICard one and Only {count}</h1>
      <div className="flex items-center justify-center gap-3">
        <Button variant="destructive" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <p>{count}</p>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </div>
    </section>
  );
}
