import api from "../../services/api";
import { call, put } from "redux-saga/effects";

import { setSchedules } from "../ducks/schedulesSlice";
import { ResponseGenerator } from "../types/common";
import { IScheduleProps } from "../../screens/Home";

type IGetScheduleProps = {
  type: string;
  payload: IScheduleProps;
};

export function* handleGetSchedules({ payload }: IGetScheduleProps) {
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
