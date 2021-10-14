import { useEffect } from "react";
import { Hour } from "../../store/ducks/hoursSlice";
import { weekDaysOptions } from "../../utils";
import { OptionType } from "../../utils/types";

type Props = {
  hour: Hour | Record<string, never>;
  setDisponibleDays: React.Dispatch<React.SetStateAction<OptionType[]>>;
};

const useSetDefaultDays = ({ hour, setDisponibleDays }: Props) => {
  useEffect(() => {
    if (hour?.days?.length > 0) {
      const defaultValue = weekDaysOptions.filter((item) =>
        hour?.days?.includes(item.value)
      ) as unknown as OptionType[];
      setDisponibleDays(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);
};

export default useSetDefaultDays;
