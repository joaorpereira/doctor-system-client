import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour;
  workersOptionsList: OptionType[];
  setDisponibleWorkers: React.Dispatch<React.SetStateAction<OptionType[]>>;
};

const useSetDefaultWorkersOptions = ({
  hour,
  workersOptionsList,
  setDisponibleWorkers,
}: Props) => {
  useEffect(() => {
    if (hour?.workers?.length > 0) {
      const list = workersOptionsList.map(({ label, value }) => ({
        label,
        value,
      }));
      const defaultValue = list.filter((item) =>
        hour?.workers.includes(item.value)
      ) as unknown as OptionType[];
      setDisponibleWorkers(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, workersOptionsList]);
};

export default useSetDefaultWorkersOptions;
