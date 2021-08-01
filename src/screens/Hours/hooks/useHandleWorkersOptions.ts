import { useCallback } from "react";
import { OptionType } from "../../../utils/types";

type Props = {
  setWorkersOptionsList: React.Dispatch<React.SetStateAction<OptionType[]>>;
  workersOptions: any;
};

const useHandleWorkersOptions = ({
  setWorkersOptionsList,
  workersOptions,
}: Props) => {
  const handleWorkersOptions = useCallback(
    <T extends OptionType[]>(services: T) => {
      const servicesIdArray = services?.map((item: OptionType) => item.value);
      const list = workersOptions
        .filter((worker: any) =>
          worker.services.map((service: string) =>
            servicesIdArray?.includes(service)
          )
        )
        ?.map(({ label, value }: OptionType) => ({ label, value }));
      setWorkersOptionsList(list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [handleWorkersOptions];
};

export default useHandleWorkersOptions;
