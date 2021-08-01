import { useEffect } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";
import { OptionType } from "../../../utils/types";

type Props = {
  hour: Hour;
  servicesOptions: OptionType[];
  setDisponibleServices: React.Dispatch<React.SetStateAction<OptionType[]>>;
};

const useSetDefaultServicesOptions = ({
  hour,
  servicesOptions,
  setDisponibleServices,
}: Props) => {
  useEffect(() => {
    if (hour?.services?.length > 0) {
      const defaultValue = servicesOptions.filter((item) =>
        hour?.services.includes(item.value)
      ) as unknown as OptionType[];
      setDisponibleServices(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, servicesOptions]);
};

export default useSetDefaultServicesOptions;
