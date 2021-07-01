import { all } from "redux-saga/effects";

import watchClients from "../sagas/clientsSaga";
import watchCompanies from "../sagas/companiesSaga";
import watchSchedules from "../sagas/schedulesSaga";
import watchWorkers from "../sagas/workersSaga";

export function* rootSagas() {
  yield all([watchClients, watchCompanies, watchSchedules, watchWorkers]);
}
