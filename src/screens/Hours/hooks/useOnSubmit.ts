import { OptionTypeBase } from "react-select";
import { useAppDispatch } from "../../../hooks";
import { createHour, updateHour } from "../../../store/ducks/hoursSlice";
import { actionsTypes } from "../../../utils";
import { OptionType } from "../../../utils/types";

type OnSubmitProps = {
  disponibleDays: OptionTypeBase | readonly OptionTypeBase[] | null | undefined;
  company_id?: string;
  disponibleWorkers: OptionType[];
  disponibleServices: OptionType[];
  startTime: OptionType | null;
  endTime: OptionType | null;
  type?: string;
  id?: string;
};

const useOnSubmit = ({
  disponibleDays,
  company_id,
  disponibleWorkers,
  disponibleServices,
  startTime,
  endTime,
  id,
  type,
}: OnSubmitProps) => {
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    const data = {
      company_id,
      services: disponibleServices?.map((item: OptionType) => item.value),
      workers: disponibleWorkers?.map((item: OptionType) => item.value),
      days: disponibleDays?.map((item: OptionType) => item.value),
      start_time: startTime?.value,
      end_time: endTime?.value,
    };

    if (type === actionsTypes.UPDATE) {
      dispatch(createHour({ data }));
    } else if (type === actionsTypes.CREATE) {
      dispatch(updateHour({ id, data }));
    }
  };

  return [onSubmit];
};

export default useOnSubmit;
