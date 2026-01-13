import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../api/apiConfig';

export const store = configureStore({
    reducer: {
        // Add the API reducer
        [productsApi.reducerPath]: productsApi.reducer,
    },
    // Add the API middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
