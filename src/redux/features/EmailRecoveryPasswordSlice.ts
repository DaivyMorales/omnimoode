import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const EmailRecoveryPasswordSlice = createSlice({
  name: "EmailRecoveryPassword",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = EmailRecoveryPasswordSlice.actions;
export default EmailRecoveryPasswordSlice.reducer;
