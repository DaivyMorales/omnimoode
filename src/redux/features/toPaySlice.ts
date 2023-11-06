import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductCalculated {
  id: number;
  value: number;
}

type State = {
  toPay: ProductCalculated[];
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
    setToPay: (state, action: PayloadAction<ProductCalculated>) => {
      state.toPay = [...state.toPay, action.payload];
    },

    addProductToPay: (state, action: PayloadAction<ProductCalculated>) => {
      state.toPay.push(action.payload);
    },

    setSendProduct: (state, action: PayloadAction<boolean>) => {
      state.sendProduct = action.payload;
    },
  },
});

export const { setToPay, addProductToPay, setSendProduct } = ToPaySlice.actions;
export default ToPaySlice.reducer;
