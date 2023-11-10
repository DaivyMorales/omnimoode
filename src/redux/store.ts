import { configureStore } from '@reduxjs/toolkit';
import NumberValidation from './features/NumberValidationSlice';
import EmailRecoveryPassword from './features/EmailRecoveryPasswordSlice';
import cartSlice from './features/cartSlice';
import priceFinalSlice from './features/priceFinalSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { categoryApi } from './api/cotegoryApi';
import { productApi } from './api/productApi';
import { cartApi } from './api/cartApi';

export const store = configureStore({
  reducer: {
    NumberValidation,
    EmailRecoveryPassword,
    cartSlice,
    priceFinalSlice,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoryApi.middleware,
      productApi.middleware,
      cartApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
