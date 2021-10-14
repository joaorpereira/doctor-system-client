import { useEffect } from "react";
import { OptionsType } from "react-select";
import { Worker } from "../../store/ducks/workersSlice";
import { OptionType } from "../../utils/types";

type Props = {
  setSelectedServices: React.Dispatch<
    React.SetStateAction<OptionsType<OptionType>>
  >;
  worker: Worker | Record<string, never>;
  servicesOptions: OptionType[];
};

const useHandleSelectedServicesValues = ({
  servicesOptions,
  worker,
  setSelectedServices,
}: Props) => {
  useEffect(() => {
    if (worker && servicesOptions) {
      const filteredServices = servicesOptions.filter((service) =>
        worker?.services?.includes(service.value)
      );
      setSelectedServices(filteredServices);
    }
  }, [servicesOptions, worker, setSelectedServices]);
};

export default useHandleSelectedServicesValues;
