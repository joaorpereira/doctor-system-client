import { FieldValues, UseFormReset } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { ServicePayload, setService } from "../../../store/ducks/servicesSlice";

type UpdateShowServiceProps = {
  service?: ServicePayload;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  reset: UseFormReset<FieldValues>;
};

const useHandleUpdateOrShowService = ({
  handleCloseModal,
  reset,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateOrShowService = ({
    service,
    type,
  }: UpdateShowServiceProps) => {
    reset();
    handleCloseModal();
    if (type === "show") {
      dispatch(setService({ service, type }));
    } else if (type === "update") {
      dispatch(setService({ service, type }));
    } else {
      dispatch(setService({ service: {}, type }));
    }
  };

  return [handleUpdateOrShowService];
};

export default useHandleUpdateOrShowService;
