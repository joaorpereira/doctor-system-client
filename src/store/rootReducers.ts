import { combineReducers } from "@reduxjs/toolkit";

import companiesReducers from "./ducks/companiesSlice";
import schedulesReducers from "./ducks/schedulesSlice";

export const reducers = combineReducers({
  companiesReducers,
  schedulesReducers,
});
