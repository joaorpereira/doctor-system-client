import { all, takeLatest } from "redux-saga/effects";
import {
  createClient,
  getClients,
  removeClient,
  updateClient,
} from "./ducks/clientsSlice";
import { getCompanies } from "./ducks/companiesSlice";
import { getSchedules } from "./ducks/schedulesSlice";
import {
  handleCreateClient,
  handleGetClients,
  handleRemoveClient,
  handleUpdateClient,
} from "./sagas/clientsSaga";
import { handleGetCompanies } from "./sagas/companiesSaga";
import { handleGetSchedules } from "./sagas/schedulesSaga";

export function* rootSagas() {
  yield all([
    takeLatest(getCompanies.type, handleGetCompanies),
    takeLatest(getSchedules.type, handleGetSchedules),
    takeLatest(getClients.type, handleGetClients),
    takeLatest(updateClient.type, handleUpdateClient),
    takeLatest(removeClient.type, handleRemoveClient),
    takeLatest(createClient.type, handleCreateClient),
  ]);
}
