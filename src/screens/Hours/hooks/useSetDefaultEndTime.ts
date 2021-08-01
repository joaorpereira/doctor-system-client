import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { timeDayOptions } from "../../../utils";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour;
  setEndDay: React.Dispatch<React.SetStateAction<OptionType | null>>;
};

const useSetDefaultEndTime = ({ hour, setEndDay }: Props) => {
  useEffect(() => {
    if (hour?.end_time) {
      const endDefaultTime = `0${new Date(
        hour?.end_time
      ).getHours()}:${new Date(hour?.end_time).getMinutes()}`;

      const defaultEndTimeValue = timeDayOptions.find((item) => {
        const dateValue = `0${new Date(item.value).getHours()}:${new Date(
          item.value
        ).getMinutes()}`;

        return dateValue === endDefaultTime;
      }) as unknown as OptionType;
      setEndDay(defaultEndTimeValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);
};

export default useSetDefaultEndTime;
