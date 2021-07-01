import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSagas } from "./common/rootSagas";
import { reducers } from "./common/rootReducers";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSagas);
