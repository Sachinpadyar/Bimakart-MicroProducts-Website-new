import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../api/apiConfig';
import { paymentApi } from '../api/paymentApi';
import { policyApi } from '../api/policyApi';

export const store = configureStore({
    reducer: {
        // Add the API reducer
        [productsApi.reducerPath]: productsApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [policyApi.reducerPath]: policyApi.reducer,
    },
    // Add the API middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            paymentApi.middleware,
            policyApi.middleware
        ),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
