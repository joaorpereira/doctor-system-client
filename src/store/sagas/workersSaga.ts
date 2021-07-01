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
import { ResponseGenerator } from "../common/types";

type WorkerProps = {
  payload: {
    id?: string;
    worker?: Worker;
    company_id?: string;
  };
  type: string;
};

export function* handleGetWorkers() {
  try {
    const { data }: ResponseGenerator = yield call(api.get, "/worker");
    yield put(setWorkersSuccess({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleGetWorkersByCompany({ payload }: WorkerProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.get,
      `/worker/${payload.id}`
    );
    yield put(setWorkersSuccess({ workers: data.lifOfWorkers }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleUpdateWorker({ payload }: WorkerProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/worker/${payload.id}`,
      { ...payload.worker }
    );
    yield put(updateWorkerSuccess({ worker: data.worker }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleRemoveWorker({ payload }: WorkerProps) {
  try {
    yield call(api.delete, `/worker/${payload.id}`);
    yield put(removeWorkerSuccess({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateWorker({ payload }: WorkerProps) {
  try {
    const { data } = yield call(api.post, `/worker`, {
      worker_data: { ...payload.worker },
      company_id: payload.company_id,
    });
    yield put(createWorkerSuccess({ worker: data.worker }));
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
