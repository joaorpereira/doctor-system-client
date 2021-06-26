import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { rootSagas } from "./sagas/rootSagas";
import { reducers } from "./ducks/rootReducers";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSagas);
