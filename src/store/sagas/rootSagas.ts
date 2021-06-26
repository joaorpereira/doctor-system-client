import { takeLatest } from "redux-saga/effects";
import { getCompanies } from "../ducks/companiesSlice";
import { handleGetCompanies } from "./companiesSaga";

export function* rootSagas() {
  yield takeLatest(getCompanies.type, handleGetCompanies);
}
