import { useEffect } from "react";
import { ServiceEntry } from "../../../store/ducks/servicesSlice";
import { OptionType } from "../../../utils/globalTypes";

type Props = {
  setServicesOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
  services: ServiceEntry[];
};

const useHandleFormatServicesEntry = ({
  services,
  setServicesOptions,
}: Props) => {
  useEffect(() => {
    if (services) {
      const newServices = services.map(({ service }: any) => ({
        value: service._id,
        label: service.title,
      }));
      setServicesOptions(newServices);
    }
  }, [services, setServicesOptions]);
};

export default useHandleFormatServicesEntry;
