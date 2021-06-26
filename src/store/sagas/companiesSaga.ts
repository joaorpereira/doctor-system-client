import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { setCompanies } from "../ducks/companiesSlice";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export function* handleGetCompanies() {
  try {
    const response: ResponseGenerator = yield call(api.get, "/company");
    const { data } = response;
    yield put(setCompanies({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
