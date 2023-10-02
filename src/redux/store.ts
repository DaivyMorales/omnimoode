import { configureStore } from "@reduxjs/toolkit";
import NumberValidation from "./features/NumberValidationSlice";
import EmailRecoveryPassword from "./features/EmailRecoveryPasswordSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    NumberValidation,
    EmailRecoveryPassword,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
