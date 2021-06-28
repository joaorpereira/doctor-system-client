import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { reducers } from "./rootReducers";

const persistConfig = {
  key: "@doctorSystem",
  storage,
};

export const persistedReducers = persistReducer(persistConfig, reducers);
