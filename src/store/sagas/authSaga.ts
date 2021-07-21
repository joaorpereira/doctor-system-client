import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  requestLogin,
  requestLogout,
  requestLoginSuccess,
  requestLogoutSuccess,
} from "../ducks/authSlice";
import { key } from "../../utils";
import { ResponseGenerator } from "../../utils/types";

type PropsPayload = {
  type: string;
  payload: {
    email: string;
    password: string;
    typeUser: "client" | "worker" | "company";
  };
};

function* handleLogin({ payload }: PropsPayload) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.post,
      `/${payload.typeUser}/login`,
      { email: payload.email, password: payload.password }
    );
    yield put(requestLoginSuccess({ user: data.user, token: data.token }));
  } catch (error) {
    localStorage.removeItem(key);
    console.log(error);
  }
}

function* handleLogout() {
  try {
    localStorage.removeItem(key);
    yield put(requestLogoutSuccess({}));
  } catch (error) {
    localStorage.removeItem(key);
    console.log(error);
  }
}

export default all([
  takeLatest(requestLogin.type, handleLogin),
  takeLatest(requestLogout.type, handleLogout),
]);
