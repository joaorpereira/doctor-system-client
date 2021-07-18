import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { Reducer, CombinedState } from "redux";

export default (reducers: Reducer<CombinedState<any>>) => {
  const persistedReducers = persistReducer(
    {
      key: "@doctor_system",
      storage,
      whitelist: ["authReducers"],
    },
    reducers
  );
  return persistedReducers;
};
