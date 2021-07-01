import { combineReducers } from "@reduxjs/toolkit";

import companiesReducers from "../ducks/companiesSlice";
import schedulesReducers from "../ducks/schedulesSlice";
import clientsReducers from "../ducks/clientsSlice";
import workersReducers from "../ducks/workersSlice";

export const reducers = combineReducers({
  companiesReducers,
  schedulesReducers,
  clientsReducers,
  workersReducers,
});
