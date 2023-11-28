import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAlertAddress: false,
};

export const showAlertAddressSlice = createSlice({
  name: 'showAlertAddress',
  initialState,
  reducers: {
    setShowAlertAddress: (state, action) => {
      state.showAlertAddress = action.payload;
    },
  },
});

export const { setShowAlertAddress } = showAlertAddressSlice.actions;
export default showAlertAddressSlice.reducer;
