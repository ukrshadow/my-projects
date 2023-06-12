import {
    configureStore,
} from '@reduxjs/toolkit';
import { api } from "./API/api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(api.middleware);
    }
})


export default store