import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour | Record<string, never>;
  workersOptions: OptionType[];
  setDisponibleWorkers: React.Dispatch<React.SetStateAction<OptionType[]>>;
};

const useSetDefaultWorkersOptions = ({
  hour,
  workersOptions,
  setDisponibleWorkers,
}: Props) => {
  useEffect(() => {
    if (hour?.workers?.length > 0) {
      const defaultValue = workersOptions.filter((item) =>
        hour?.workers.includes(item.value)
      ) as unknown as OptionType[];

      setDisponibleWorkers(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, workersOptions]);
};

export default useSetDefaultWorkersOptions;
