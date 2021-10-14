import { useEffect } from "react";
import { Hour } from "../../store/ducks/hoursSlice";
import { timeDayOptions } from "../../utils";
import { formatDateToString } from "../../utils/helpers/date";
import { OptionType } from "../../utils/types";

type Props = {
  hour: Hour | Record<string, never>;
  setStartDay: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

const useSetDefaultStartTime = ({ hour, setStartDay }: Props) => {
  useEffect(() => {
    if (hour?.start_time) {
      const startDefaultTime = formatDateToString(hour.start_time);
      const defaultStartTimeValue = timeDayOptions.find((item) => {
        const dateValue = formatDateToString(item.value);
        return dateValue === startDefaultTime;
      }) as unknown as OptionType;

      setStartDay(defaultStartTimeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);
};

export default useSetDefaultStartTime;
