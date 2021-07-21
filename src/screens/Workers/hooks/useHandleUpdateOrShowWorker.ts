import { FieldValues, UseFormReset } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { setWorker, Worker } from "../../../store/ducks/workersSlice";
import { actionsTypes } from "../../../utils";

type UpdateShowWorkerProps = {
  worker?: Worker;
  type: string;
};

type UpdateOrShowProps = {
  handleCloseModal: () => void;
  reset: UseFormReset<FieldValues>;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  setGenderValue: React.Dispatch<React.SetStateAction<string>>;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
};

const useHandleUpdateOrShowWorker = ({
  handleCloseModal,
  reset,
  setDocumentType,
  setGenderValue,
  setAccountType,
}: UpdateOrShowProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateOrShowWorker = ({
    worker,
    type,
  }: UpdateShowWorkerProps) => {
    reset();
    handleCloseModal();
    if ([actionsTypes.SHOW, actionsTypes.UPDATE].includes(type)) {
      dispatch(setWorker({ worker, type }));
    } else {
      setDocumentType("");
      setGenderValue("");
      setAccountType("");
      dispatch(setWorker({ worker: {}, type }));
    }
  };

  return [handleUpdateOrShowWorker];
};

export default useHandleUpdateOrShowWorker;
