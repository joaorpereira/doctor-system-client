import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Service,
  getServices,
  setServicesSuccess,
  setFilteredServicesSuccess,
  getFilteredServices,
  updateServiceSuccess,
  removeServiceSuccess,
  createServicesSuccess,
  removeService,
  updateService,
  createService,
} from "../ducks/servicesSlice";
import { ResponseGenerator } from "../types";

type ServicesProps = {
  payload: {
    id?: string;
    service?: Service;
    status?: string;
    files?: [];
  };
  type: string;
};

function* handleGetServices({ payload }: ServicesProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.get,
      `/service/${payload.id}`
    );
    yield put(setServicesSuccess({ services: data.services }));
  } catch (error) {
    console.log(error);
  }
}

function* handleFilterServices({ payload }: ServicesProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.get,
      `/service/filter/${payload.id}`
    );
    yield put(setFilteredServicesSuccess({ servicesOptions: data.services }));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateServices({ payload }: ServicesProps) {
  try {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("service", JSON.stringify(payload.service));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?.files?.map((image: any, index: number) =>
      formData.append(`file_${index}`, image.file)
    );

    const { data }: ResponseGenerator = yield call(
      api.post,
      "/service",
      formData,
      config
    );

    yield put(createServicesSuccess({ service: data.service }));
  } catch (error) {
    console.log(error);
  }
}

function* handleUpdateServices({ payload }: ServicesProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.put,
      `/service/${payload.id}`
    );
    yield put(updateServiceSuccess({ services: data.services }));
  } catch (error) {
    console.log(error);
  }
}

function* handleRemoveServices({ payload }: ServicesProps) {
  try {
    const { data }: ResponseGenerator = yield call(
      api.delete,
      `/service/${payload.id}/${payload.status}`
    );
    yield put(removeServiceSuccess({ service: data.service }));
  } catch (error) {
    console.log(error);
  }
}

export default all([
  takeLatest(getServices.type, handleGetServices),
  takeLatest(getFilteredServices.type, handleFilterServices),
  takeLatest(createService.type, handleCreateServices),
  takeLatest(updateService.type, handleUpdateServices),
  takeLatest(removeService.type, handleRemoveServices),
]);
