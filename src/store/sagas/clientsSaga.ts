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
import { ResponseGenerator } from "../../utils/types";
import { requestLoginSuccess } from "../ducks/authSlice";

type ClientPayloadProps = {
  payload: {
    id?: string;
    client?: Client;
    company_id?: string;
    isSignUp?: boolean;
  };
  type: string;
};

function* handleGetClients() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/client");
    yield put(setClientsSuccess({ clients: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateClient({ payload }: ClientPayloadProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/client/${payload.id}`,
      { ...payload.client }
    );
    yield put(updateClientSuccess({ client: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleRemoveClient({ payload }: ClientPayloadProps) {
  try {
    yield call(api.delete, `/client/${payload.id}`);
    yield put(removeClientSuccess({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateClient({ payload }: ClientPayloadProps) {
  try {
    const { data } = yield call(api.post, "/client", {
      client_data: { ...payload.client },
      company_id: payload.company_id,
    });
    yield put(createClientSuccess({ client: data.data }));
    if (payload.isSignUp) {
      yield put(requestLoginSuccess({ user: data.data, token: data.token }));
    }
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
