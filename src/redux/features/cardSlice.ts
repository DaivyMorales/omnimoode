import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../types/index';

const initialState = {
  cards: [] as Cart[],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    deleteCardById: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    addCard: (state, action) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export const { setCards, deleteCardById,addCard } = cardSlice.actions;
export default cardSlice.reducer;
