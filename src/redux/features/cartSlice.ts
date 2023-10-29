import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartProduct } from '@/types';

export const createCartProduct = createAsyncThunk(
  'cart/createCartProduct',
  async (body: object) => {
    try {
      const response = await axios.post('/api/cart/cartProduct', body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  'cart/deleteCartProduct',
  async (id: number, { dispatch }) => {
    try {
      const response = await axios.delete('/api/cart/cartProduct', {
        data: { id },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  cart: [] as CartProduct[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCartProduct.fulfilled, (state, action) => {
      state.cart.push(action.payload);
    });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
