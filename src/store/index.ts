import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import persistedReducers from "./reduxPersist";
import { rootSagas } from "./rootSagas";
import { reducers } from "./rootReducers";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducers(reducers),
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);
