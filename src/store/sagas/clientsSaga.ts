import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { setClients } from "../ducks/clientsSlice";
import { ResponseGenerator } from "../types/common";

export function* handleGetClients() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/client");
    yield put(setClients({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
