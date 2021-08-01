import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { timeDayOptions } from "../../../utils";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour | Record<string, never>;
  setStartDay: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

const useSetDefaultStartTime = ({ hour, setStartDay }: Props) => {
  useEffect(() => {
    if (hour?.start_time) {
      const startDefaultTime = `0${new Date(
        hour?.start_time
      ).getHours()}:${new Date(hour?.start_time).getMinutes()}`;

      const defaultStartTimeValue = timeDayOptions.find((item) => {
        const dateValue = `0${new Date(item.value).getHours()}:${new Date(
          item.value
        ).getMinutes()}`;

        return dateValue === startDefaultTime;
      }) as unknown as OptionType;
      setStartDay(defaultStartTimeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);
};

export default useSetDefaultStartTime;
