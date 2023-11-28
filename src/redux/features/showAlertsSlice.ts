import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddress: 0,
  showCard: 0,
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
  },
});

export const { setShowAddress, setShowCard } = showAlertsSlice.actions;
export default showAlertsSlice.reducer;
