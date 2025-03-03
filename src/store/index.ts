

import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cartSlice';
import authSlice from './features/authSlice';
import { paymentService } from './services/paymentService';
import { businessService } from './services/businessService';
import { packageService } from './services/packageService';
export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth:authSlice,
        [paymentService.reducerPath]: paymentService.reducer,
        [businessService.reducerPath]: businessService.reducer,
        [packageService.reducerPath]: packageService.reducer,
       
       
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(paymentService.middleware)
    .concat(businessService.middleware)
    .concat(packageService.middleware),
    });




    // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch