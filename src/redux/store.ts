import { configureStore } from "@reduxjs/toolkit";
import NumberValidation from "./features/NumberValidationSlice";
import EmailRecoveryPassword from "./features/EmailRecoveryPasswordSlice";
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { categoryApi } from './api/cotegoryApi'
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    NumberValidation,
    EmailRecoveryPassword,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([categoryApi.middleware, productApi.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;

