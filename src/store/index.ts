import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";

import { persistedReducers } from "./persistReducer";
import { rootSagas } from "./rootSagas";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducers,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);
