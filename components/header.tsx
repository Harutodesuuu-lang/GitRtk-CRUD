"use client";

import { useState } from "react";
import CartIcon from "@/component/i-tech-cards/cart";
import { Button } from "@/components/ui/button";
import { reset, resetCart } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/type/hook";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.cartCount);
  const cartTotal = useAppSelector((state) => state.counter.cartTotal);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-end gap-2 bg-background/80 px-4 py-2 backdrop-blur">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          aria-label="Cart"
          className="relative"
          onClick={() => setIsCartOpen((prev) => !prev)}
        >
          <CartIcon />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {count}
            </span>
          )}
        </Button>

        {isCartOpen && (
          <div className="absolute right-0 mt-2 w-44 rounded-md border bg-background p-3 shadow-md">
            <p className="mb-2 text-sm">Items: {count}</p>
            <p className="mb-3 text-sm">Total: ${cartTotal.toFixed(2)}</p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                dispatch(resetCart());
                dispatch(reset());
                setIsCartOpen(false);
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
      <ModeToggle />
    </div>
  );
}
