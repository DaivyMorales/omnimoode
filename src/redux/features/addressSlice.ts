import { Address } from '@/types';
import { createSlice, Draft } from '@reduxjs/toolkit';

const initialState = {
  addresses: [] as Address[],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    deleteAddressById: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
  },
});

export const { setAddresses, deleteAddressById } = addressSlice.actions;
export default addressSlice.reducer;
