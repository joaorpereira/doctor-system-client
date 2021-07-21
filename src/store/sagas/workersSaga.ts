import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Worker,
  getWorkers,
  getWorkersByCompany,
  updateWorker,
  createWorker,
  removeWorker,
  setWorkersSuccess,
  updateWorkerSuccess,
  createWorkerSuccess,
  removeWorkerSuccess,
} from "../ducks/workersSlice";
import { ResponseGenerator } from "../types";
import { requestLoginSuccess } from "../ducks/authSlice";

type WorkerPayloadProps = {
  payload: {
    id?: string;
    worker?: Worker;
    company_id?: string;
    isSignUp?: boolean;
  };
  type: string;
};

function* handleGetWorkers() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/worker");
    yield put(setWorkersSuccess({ workers: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleGetWorkersByCompany({ payload }: WorkerPayloadProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.get,
      `/worker/${payload.id}`
    );
    yield put(setWorkersSuccess({ workers: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateWorker({ payload }: WorkerPayloadProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/worker/${payload.id}`,
      { ...payload.worker }
    );
    yield put(updateWorkerSuccess({ worker: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleRemoveWorker({ payload }: WorkerPayloadProps) {
  try {
    yield call(api.delete, `/worker/${payload.id}`);
    yield put(removeWorkerSuccess({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateWorker({ payload }: WorkerPayloadProps) {
  try {
    const { data } = yield call(api.post, `/worker`, {
      worker_data: { ...payload.worker },
      company_id: payload.company_id,
    });
    yield put(createWorkerSuccess({ worker: data.data }));
    if (payload.isSignUp) {
      yield put(requestLoginSuccess({ user: data.data, token: data.token }));
    }
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(getWorkers.type, handleGetWorkers),
  takeLatest(getWorkersByCompany.type, handleGetWorkersByCompany),
  takeLatest(updateWorker.type, handleUpdateWorker),
  takeLatest(removeWorker.type, handleRemoveWorker),
  takeLatest(createWorker.type, handleCreateWorker),
]);
