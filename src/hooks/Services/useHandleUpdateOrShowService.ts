import { FieldValues, UseFormReset } from "react-hook-form";
import { useAppDispatch } from "..";
import { Service, setService } from "../../store/ducks/servicesSlice";
import { actionsTypes } from "../../utils";

type UpdateShowServiceProps = {
  service?: Service;
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
    if ([actionsTypes.SHOW, actionsTypes.UPDATE].includes(type)) {
      dispatch(setService({ service, type }));
    } else {
      dispatch(setService({ service: {}, type }));
    }
  };

  return [handleUpdateOrShowService];
};

export default useHandleUpdateOrShowService;
