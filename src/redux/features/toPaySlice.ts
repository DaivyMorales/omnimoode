import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  toPay: number[];
  sendProduct: boolean;
};

const initialState: State = {
  toPay: [],
  sendProduct: false,
};

export const ToPaySlice = createSlice({
  name: 'toPay',
  initialState,
  reducers: {
    setToPay: (state, action: PayloadAction<number[]>) => {
      state.toPay = action.payload;
    },

    setSendProduct: (state, action: PayloadAction<boolean>) => {
      state.sendProduct = action.payload;
    },
  },
});

export const { setToPay, setSendProduct } = ToPaySlice.actions;
export default ToPaySlice.reducer;
