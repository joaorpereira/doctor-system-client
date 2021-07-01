import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Client,
  getClients,
  updateClient,
  createClient,
  removeClient,
  setClientsSuccess,
  updateClientSuccess,
  createClientSuccess,
  removeClientSuccess,
} from "../ducks/clientsSlice";
import { ResponseGenerator } from "../common/types";

type ClientPayloadProps = {
  payload: {
    id?: string;
    client?: Client;
    company_id?: string;
  };
  type: string;
};

export function* handleGetClients() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/client");
    yield put(setClientsSuccess({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateClient({ payload }: ClientPayloadProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/client/${payload.id}`,
      { ...payload.client }
    );
    yield put(updateClientSuccess({ client: data.client }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleRemoveClient({ payload }: ClientPayloadProps) {
  try {
    yield call(api.delete, `/client/${payload.id}`);
    yield put(removeClientSuccess({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateClient({ payload }: ClientPayloadProps) {
  try {
    const { data } = yield call(api.post, "/client", {
      client_data: { ...payload.client },
      company_id: payload.company_id,
    });
    yield put(createClientSuccess({ client: data.client }));
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(getClients.type, handleGetClients),
  takeLatest(updateClient.type, handleUpdateClient),
  takeLatest(removeClient.type, handleRemoveClient),
  takeLatest(createClient.type, handleCreateClient),
]);
