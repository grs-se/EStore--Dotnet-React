import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: "Redux counter with redux toolkit",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // Bit confusing: Redux advises not mutating state, but Redux Toolkit allows us to write mutating state code which is converted by the library Immer
  // "Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates".
  // Redux toolkit also creates the types for us using the name of the slice and the name of the reducer
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decrement: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const {increment, decrement} = counterSlice.actions;