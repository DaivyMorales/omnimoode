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

    updateCard: (state, action) => {
      const updatedCard = action.payload;
      state.cards = state.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
    },
  },
});

export const { setCards, deleteCardById, addCard,updateCard } = cardSlice.actions;
export default cardSlice.reducer;
