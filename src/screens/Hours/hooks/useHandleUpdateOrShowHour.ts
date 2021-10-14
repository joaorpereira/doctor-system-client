import { useAppDispatch } from "../../../hooks";
import { Hour, setHour } from "../../../store/ducks/hoursSlice";
import { actionsTypes } from "../../../utils";

type UpdateShowHourProps = {
  hour?: Hour;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  resetForm: () => void;
};

const useHandleUpdateOrShowHour = ({
  handleCloseModal,
  resetForm,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();

  const handleUpdateOrShowHour = ({ hour, type }: UpdateShowHourProps) => {
    if ([actionsTypes.CREATE].includes(type)) resetForm();
    handleCloseModal();
    if ([actionsTypes.UPDATE, actionsTypes.SHOW].includes(type)) {
      dispatch(setHour({ hour, type }));
    } else if (type === "SLOT") {
      dispatch(setHour({ hour, type: actionsTypes.CREATE }));
    } else {
      dispatch(setHour({ hour: {}, type }));
    }
  };

  return [handleUpdateOrShowHour];
};

export default useHandleUpdateOrShowHour;
