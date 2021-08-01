import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { Reducer } from "redux";
import { CompaniesSliceState } from "./ducks/companiesSlice";
import { ClientsSliceState } from "./ducks/clientsSlice";
import { WorkersSliceState } from "./ducks/workersSlice";
import { ServicesSliceState } from "./ducks/servicesSlice";
import { AuthSliceState } from "./ducks/authSlice";
import { HoursSliceState } from "./ducks/hoursSlice";
import { SchedulesSliceState } from "./ducks/schedulesSlice";

interface Reducers {
  companiesReducers: CompaniesSliceState;
  schedulesReducers: SchedulesSliceState;
  clientsReducers: ClientsSliceState;
  workersReducers: WorkersSliceState;
  servicesReducers: ServicesSliceState;
  authReducers: AuthSliceState;
  hoursReducers: HoursSliceState;
}

export default (reducers: Reducer<Reducers>) => {
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
