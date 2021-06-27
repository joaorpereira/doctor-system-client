import api from "../../services/api";
import { call, put } from "redux-saga/effects";
import { setCompanies } from "../ducks/companiesSlice";
import { ResponseGenerator } from "../types/common";

export function* handleGetCompanies() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/company");
    yield put(setCompanies({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
