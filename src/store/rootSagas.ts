import { all, takeLatest } from "redux-saga/effects";

import { getCompanies } from "./ducks/companiesSlice";
import { getSchedules } from "./ducks/schedulesSlice";
import watchClientsEnvironments from "./sagas/clientsSaga";
import { handleGetCompanies } from "./sagas/companiesSaga";
import { handleGetSchedules } from "./sagas/schedulesSaga";

export function* rootSagas() {
  yield all([
    watchClientsEnvironments,
    takeLatest(getCompanies.type, handleGetCompanies),
    takeLatest(getSchedules.type, handleGetSchedules),
  ]);
}
