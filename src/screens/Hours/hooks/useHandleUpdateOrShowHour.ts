import { useAppDispatch } from "../../../hooks";
import { Hour, setHour } from "../../../store/ducks/hoursSlice";
import { actionsTypes } from "../../../utils";

type UpdateShowHourProps = {
  hour?: Hour;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  resetForm: any;
};

const useHandleUpdateOrShowHour = ({
  handleCloseModal,
  resetForm,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateOrShowHour = ({ hour, type }: UpdateShowHourProps) => {
    resetForm();
    handleCloseModal();
    if ([actionsTypes.UPDATE].includes(type)) {
      dispatch(setHour({ hour, type }));
    } else {
      dispatch(setHour({ hour: {}, type }));
    }
  };

  return [handleUpdateOrShowHour];
};

export default useHandleUpdateOrShowHour;
