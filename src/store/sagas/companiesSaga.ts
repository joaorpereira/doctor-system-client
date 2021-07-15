import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getCompanies,
  setCompanies,
  createCompany,
  getFilteredCompanies,
  setFilteredCompaniesSuccess,
  createCompanySuccess,
  Company,
} from "../ducks/companiesSlice";
import { ResponseGenerator } from "../common/types";
import { requestLoginSuccess } from "../ducks/authSlice";

type CompanyPayloadProps = {
  payload: {
    id?: string;
    company?: Company;
    isSignUp?: boolean;
  };
  type: string;
};

function* handleGetCompanies() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/company");
    yield put(setCompanies({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleFilterCompanies() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, `/company/filter`);
    yield put(
      setFilteredCompaniesSuccess({ companiesOptions: data.companies })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateCompany({ payload }: CompanyPayloadProps) {
  try {
    const company = payload.company;
    const { data } = yield call(api.post, "/company", { ...company });
    yield put(createCompanySuccess({ company: data.company as Company }));
    if (payload.isSignUp) {
      yield put(requestLoginSuccess({ user: data.company, token: data.token }));
    }
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(getCompanies.type, handleGetCompanies),
  takeLatest(getFilteredCompanies.type, handleFilterCompanies),
  takeLatest(createCompany.type, handleCreateCompany),
]);
