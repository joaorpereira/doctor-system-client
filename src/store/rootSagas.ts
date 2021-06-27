import { all, takeLatest } from "redux-saga/effects";
import { getClients } from "./ducks/clientsSlice";
import { getCompanies } from "./ducks/companiesSlice";
import { getSchedules } from "./ducks/schedulesSlice";
import { handleGetClients } from "./sagas/clientsSaga";
import { handleGetCompanies } from "./sagas/companiesSaga";
import { handleGetSchedules } from "./sagas/schedulesSaga";

export function* rootSagas() {
  yield all([
    takeLatest(getCompanies.type, handleGetCompanies),
    takeLatest(getSchedules.type, handleGetSchedules),
    takeLatest(getClients.type, handleGetClients),
  ]);
}
