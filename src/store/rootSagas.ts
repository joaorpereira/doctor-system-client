import { all } from "redux-saga/effects";

import watchClients from "./sagas/clientsSaga";
import watchCompanies from "./sagas/companiesSaga";
import watchSchedules from "./sagas/schedulesSaga";
import watchWorkers from "./sagas/workersSaga";
import watchServices from "./sagas/servicesSaga";
import watchAuth from "./sagas/authSaga";

export function* rootSagas() {
  yield all([
    watchClients,
    watchCompanies,
    watchSchedules,
    watchWorkers,
    watchServices,
    watchAuth,
  ]);
}
