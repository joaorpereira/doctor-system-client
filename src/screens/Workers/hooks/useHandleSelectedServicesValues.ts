import { useEffect } from "react";
import { OptionsType } from "react-select";
import { ServiceEntry } from "../../../store/ducks/servicesSlice";
import { Worker } from "../../../store/ducks/workersSlice";
import { OptionType } from "../../../utils/globalTypes";

type Props = {
  setSelectedServices: React.Dispatch<
    React.SetStateAction<OptionsType<OptionType>>
  >;
  worker: Worker;
  services: ServiceEntry[];
};

const useHandleSelectedServicesValues = ({
  services,
  worker,
  setSelectedServices,
}: Props) => {
  useEffect(() => {
    if (worker && services) {
      const filteredServices = services
        .filter(({ service }: any) => worker?.services?.includes(service._id))
        .map(({ service }: any) => ({
          value: service._id,
          label: service.title,
        }));
      setSelectedServices(filteredServices);
    }
  }, [services, worker, setSelectedServices]);
};

export default useHandleSelectedServicesValues;
