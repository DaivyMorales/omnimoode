import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberValidation: 100000,
};

export const NumberValidationSlice = createSlice({
  name: "numberValidation",
  initialState,
  reducers: {
    generateNumber: (state) => {
      const min = 100000;
      const max = 999999;
      state.numberValidation =
        Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
});

export const { generateNumber } = NumberValidationSlice.actions;

export default NumberValidationSlice.reducer;
