import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddress: 0,
  showCard: 0,
  showCardForm: false,
  showCardFormEdit: 0,
};

export const showAlertsSlice = createSlice({
  name: 'showAlerts',
  initialState,
  reducers: {
    setShowAddress: (state, action) => {
      state.showAddress = action.payload;
    },
    setShowCard: (state, action) => {
      state.showCard = action.payload;
    },
    setShowCardForm: (state, action) => {
      state.showCardForm = action.payload;
    },
    setShowCardFormEdit: (state, action) => {
      state.showCardFormEdit = action.payload;
    },
  },
});

export const {
  setShowAddress,
  setShowCard,
  setShowCardForm,
  setShowCardFormEdit,
} = showAlertsSlice.actions;
export default showAlertsSlice.reducer;
