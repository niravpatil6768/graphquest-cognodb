import { configureStore } from "@reduxjs/toolkit";

import developerReducer from "../features/developers/developerSlice";

export const store = configureStore({
    reducer: {
        developers: developerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;