import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { timeDayOptions } from "../../../utils";
import { formatDateToString } from "../../../utils/helpers/date";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour | Record<string, never>;
  setEndDay: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

const useSetDefaultEndTime = ({ hour, setEndDay }: Props) => {
  useEffect(() => {
    if (hour?.end_time) {
      const endDefaultTime = formatDateToString(hour.end_time);
      const defaultEndTimeValue = timeDayOptions.find((item) => {
        const dateValue = formatDateToString(item.value);
        return dateValue === endDefaultTime;
      }) as unknown as OptionType;

      setEndDay(defaultEndTimeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);
};

export default useSetDefaultEndTime;
