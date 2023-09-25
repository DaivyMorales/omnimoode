import { configureStore } from "@reduxjs/toolkit";
import NumberValidation from './features/NumberValidationSlice';
import { TypedUseSelectorHook, useSelector } from "react-redux";


export const store = configureStore({
  reducer: {
    NumberValidation
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
