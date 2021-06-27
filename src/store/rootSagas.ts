import { all, takeLatest } from "redux-saga/effects";
import { getCompanies } from "./ducks/companiesSlice";
import { getSchedules } from "./ducks/schedulesSlice";
import { handleGetCompanies } from "./sagas/companiesSaga";
import { handleGetSchedules } from "./sagas/schedulesSaga";

export function* rootSagas() {
  yield all([
    takeLatest(getCompanies.type, handleGetCompanies),
    takeLatest(getSchedules.type, handleGetSchedules),
  ]);
}
