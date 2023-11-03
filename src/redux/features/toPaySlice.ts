import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  toPay: number;
  summedProducts: Record<string, boolean>;
  sendProduct: boolean;
};

const initialState: State = {
  toPay: 0,
  summedProducts: {},
  sendProduct: false,
};

export const ToPaySlice = createSlice({
  name: 'toPay',
  initialState,
  reducers: {
    setToPay: (state, action: PayloadAction<number>) => {
      state.toPay = action.payload;
    },
    sumToPay: (state, action: PayloadAction<number>) => {
      state.toPay += action.payload;
    },
    subtractToPay: (state, action: PayloadAction<number>) => {
      state.toPay -= action.payload;
    },

    markProductAsSummed: (state, action: PayloadAction<string>) => {
      state.summedProducts[action.payload] = true;
    },
    setSendProduct: (state, action: PayloadAction<boolean>) => {
      state.sendProduct = action.payload;
    },
  },
});

export const {
  sumToPay,
  subtractToPay,
  setToPay,
  markProductAsSummed,
  setSendProduct,
} = ToPaySlice.actions;
export default ToPaySlice.reducer;
