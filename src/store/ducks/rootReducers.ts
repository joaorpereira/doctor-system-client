import { combineReducers } from "@reduxjs/toolkit";

import companiesReducers from "./companiesSlice";

export const reducers = combineReducers({ companiesReducers });
