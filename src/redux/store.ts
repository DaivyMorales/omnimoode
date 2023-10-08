import { configureStore } from "@reduxjs/toolkit";
import NumberValidation from "./features/NumberValidationSlice";
import EmailRecoveryPassword from "./features/EmailRecoveryPasswordSlice";
import { categoryApi } from './api/cotegoryApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    NumberValidation,
    EmailRecoveryPassword,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([categoryApi.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;

