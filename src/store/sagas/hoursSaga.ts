import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getHoursByCompany,
  getHoursByService,
  setHoursByCompany,
  setHoursByService,
  updateHour,
  createHour,
  removeHour,
  updateHourSuccess,
  createHourSuccess,
  removeHourSuccess,
} from "../ducks/hoursSlice";
import { ResponseGenerator } from "../../utils/types";

function* handleGetHoursByCompany({ payload }: any) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.get,
      `/work-hours/${payload.id}`
    );
    yield put(setHoursByCompany({ hours: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleWorkHoursByService({ payload }: any) {
  try {
    yield call(api.post, "/work-hours/service", { services: payload.services });
    yield put(setHoursByService({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateHour({ payload }: any) {
  try {
    const { data } = yield call(api.post, "/work-hours", { ...payload });
    yield put(createHourSuccess({ hour: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateHour({ payload }: any) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/work-hours/${payload.id}`,
      { ...payload.data }
    );
    yield put(updateHourSuccess({ hour: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* handleRemoveHour({ payload }: any) {
  try {
    yield call(api.delete, `/work-hours/${payload.id}`);
    yield put(removeHourSuccess({ id: payload.id }));
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(getHoursByCompany.type, handleGetHoursByCompany),
  takeLatest(getHoursByService.type, handleWorkHoursByService),
  takeLatest(createHour.type, handleCreateHour),
  takeLatest(updateHour.type, handleUpdateHour),
  takeLatest(removeHour.type, handleRemoveHour),
]);
