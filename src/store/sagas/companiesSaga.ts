import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCompanies, setCompanies } from "../ducks/companiesSlice";
import { ResponseGenerator } from "../common/types";

function* handleGetCompanies() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/company");
    yield put(setCompanies({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export default all([takeLatest(getCompanies.type, handleGetCompanies)]);
