import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//step to create reducer
export interface CounterState {
  value: number;
  cartCount: number;
  cartTotal: number;
}
//1.define initital state
const initialState: CounterState = {
  value: 0,
  cartCount: 0,
  cartTotal: 0,
};
//2.define reducer that contain logic(action) of reducer
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    addByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    addToCart: (
      state,
      action: PayloadAction<{ quantity: number; unitPrice: number }>,
    ) => {
      const { quantity, unitPrice } = action.payload;
      state.cartCount += quantity;
      state.cartTotal += quantity * unitPrice;
    },
    decrement: (state) => {
      state.value = Math.max(0, state.value - 1);
    },
    reset: (state) => {
      state.value = 0;
    },
    resetCart: (state) => {
      state.cartCount = 0;
      state.cartTotal = 0;
    },
  },
});
//3.export action of reducer
export const {
  increment,
  addByAmount,
  addToCart,
  decrement,
  reset,
  resetCart,
} = counterSlice.actions;
//4. export reducer
export default counterSlice.reducer;
