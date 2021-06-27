import { combineReducers } from "@reduxjs/toolkit";

import companiesReducers from "./ducks/companiesSlice";
import schedulesReducers from "./ducks/schedulesSlice";
import clientsReducers from "./ducks/clientsSlice";

export const reducers = combineReducers({
  companiesReducers,
  schedulesReducers,
  clientsReducers,
});
