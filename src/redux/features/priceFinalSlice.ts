import { createSlice } from '@reduxjs/toolkit';

interface IPriceFinal {
  priceFinal: number;
}

const initialState: IPriceFinal = {
  priceFinal: 0,
};

export const priceFinalSlice = createSlice({
  name: 'priceFinal',
  initialState,
  reducers: {
    setPriceFinal: (state, action) => {
      state.priceFinal = action.payload;
    },
  },
});

export const { setPriceFinal } = priceFinalSlice.actions;
export default priceFinalSlice.reducer;
