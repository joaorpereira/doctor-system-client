import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { setClientInfo, setClients } from "../ducks/clientsSlice";
import { ResponseGenerator } from "../types/common";
import { ClientProps } from "../../screens/Clients";

type UpdateClient = {
  payload: {
    id?: string;
    clientData?: ClientProps;
    company_id?: string;
  };
  type: string;
};

export function* handleGetClients() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/client");
    yield put(setClients({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateClient({ payload }: UpdateClient) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/client/${payload.id}`,
      { ...payload.clientData }
    );

    yield put(setClientInfo({ client: data.client }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleRemoveClient({ payload }: UpdateClient) {
  try {
    yield call(api.delete, `/client/${payload.id}`);
    // yield put(setClients({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateClient({ payload }: UpdateClient) {
  try {
    yield call(api.post, `/client`, {
      client_data: { ...payload.clientData },
      company_id: payload.company_id,
    });
    // yield put(setClients({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}
