import api from "../../services/api";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { getSchedules, setSchedules } from "../ducks/schedulesSlice";
import { ResponseGenerator } from "../common/types";
import { IScheduleProps } from "../../screens/Home";

type IGetScheduleProps = {
  type: string;
  payload: IScheduleProps;
};

function* handleGetSchedules({ payload }: IGetScheduleProps) {
  try {
    const { company_id, range } = payload;

    const { data }: ResponseGenerator = yield call(
      api.post,
      "/schedule/filter",
      {
        company_id,
        range,
      }
    );
    yield put(setSchedules({ ...data }));
  } catch (error) {
    console.log(error);
  }
}

export default all([takeLatest(getSchedules.type, handleGetSchedules)]);
