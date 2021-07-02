import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  Service,
  getServices,
  setServicesSuccess,
} from "../ducks/servicesSlice";
import { ResponseGenerator } from "../common/types";

type ServicesProps = {
  payload: {
    id?: string;
    service?: Service;
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

export default all([takeLatest(getServices.type, handleGetServices)]);
